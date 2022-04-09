import { Query, Resolver } from '@nestjs/graphql';
import { PricingPlan } from './models/pricing-plan.model';
import { AggregatedVehicle } from './models/aggregated-vehicle.model';

@Resolver((of) => PricingPlan)
export class AggregatedVehiclesResolver {
  @Query((returns) => PricingPlan)
  pricingPlans() {
    return new PricingPlan({ currency: 'USD' });
  }

  @Query((returns) => [AggregatedVehicle])
  aggregatedVehicles() {
    return [
      new AggregatedVehicle({
        geometry: { type: 'Point', coordinates: [0, 1] },
      }),
    ];
  }
}
