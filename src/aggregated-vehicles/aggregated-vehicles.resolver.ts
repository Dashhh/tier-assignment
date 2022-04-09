import { Query, Resolver } from '@nestjs/graphql';
import { PricingPlan } from './models/pricing-plan.model';

@Resolver((of) => PricingPlan)
export class AggregatedVehiclesResolver {
  @Query((returns) => PricingPlan)
  aggregatedVehicles() {
    return new PricingPlan({ currency: 'USD' });
  }
}
