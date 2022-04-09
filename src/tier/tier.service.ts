import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { DocklessVehicle } from './interfaces/dockless-vehicle.interface';
import { Response } from './interfaces/response.interface';

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
}
