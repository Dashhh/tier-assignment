import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { DocklessVehicle } from './interfaces/dockless-vehicle.interface';
import { Response } from './interfaces/response.interface';
import { PricingPlan } from './interfaces/pricing-plan.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class TierService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async docklessVehicles(minRange?: number): Promise<DocklessVehicle[]> {
    const cachedVehicles = await this.cacheManager.get<DocklessVehicle[]>(
      `vehicles`,
    );
    if (!cachedVehicles) {
      return lastValueFrom(
        this.httpService
          .get<Response<'bikes', DocklessVehicle[]>>(
            'https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/free-bike-status',
          )
          .pipe(
            map((response) => {
              if (response.status != 200) {
                return [];
              }
              const vehicles = response.data.data.bikes;
              this.cacheManager.set<DocklessVehicle[]>(`vehicles`, vehicles);
              return this.filterByRange(vehicles, minRange);
            }),
          ),
      );
    }
    return this.filterByRange(cachedVehicles, minRange);
  }

  private filterByRange(
    vehicles: DocklessVehicle[],
    minRange?: number,
  ): DocklessVehicle[] {
    return minRange
      ? vehicles.filter((vehicle) => vehicle.current_range_meters >= minRange)
      : vehicles;
  }

  pricingPlans(): Observable<PricingPlan[]> {
    return this.httpService
      .get<Response<'plans', PricingPlan[]>>(
        'https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/system-pricing-plans',
      )
      .pipe(
        map((response) => {
          if (response.status != 200) {
            return [];
          }
          return response.data.data.plans;
        }),
      );
  }

  pricingPlan(id: string): Observable<PricingPlan | undefined> {
    return this.pricingPlans().pipe(
      map((plans) => plans.find((plan) => plan.plan_id === id)),
    );
  }
}
