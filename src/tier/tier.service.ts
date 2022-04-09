import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { DocklessVehicle } from './interfaces/dockless-vehicle.interface';
import { Response } from './interfaces/response.interface';
import { PricingPlan } from './interfaces/pricing-plan.interface';

@Injectable()
export class TierService {
  constructor(private readonly httpService: HttpService) {}

  docklessVehicles(): Observable<DocklessVehicle[]> {
    return this.httpService
      .get<Response<'bikes', DocklessVehicle[]>>(
        'https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/free-bike-status',
      )
      .pipe(
        map((response) => {
          if (response.status != 200) {
            return [];
          }
          return response.data.data.bikes;
        }),
      );
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
