import { Args, Query, Resolver } from '@nestjs/graphql';
import { PricingPlan } from './models/pricing-plan.model';
import { AggregatedVehicle } from './models/aggregated-vehicle.model';
import { TierService } from '../tier/tier.service';
import { AggregationService } from '../aggregation/aggregation.service';
import { lastValueFrom } from 'rxjs';
import { BoundingBox } from '../aggregation/types/bounding-box.type';
import { GetAggregatedVehiclesArgs } from './dto/get-aggregated-vehicles.args';

@Resolver((of) => PricingPlan)
export class AggregatedVehiclesResolver {
  constructor(
    private readonly tierService: TierService,
    private readonly aggregationService: AggregationService,
  ) {}

  @Query((returns) => PricingPlan)
  pricingPlans() {
    return new PricingPlan({ currency: 'USD' });
  }

  @Query((returns) => [AggregatedVehicle])
  async aggregatedVehicles(
    @Args() args: GetAggregatedVehiclesArgs,
  ): Promise<AggregatedVehicle[]> {
    const vehicles = await lastValueFrom(this.tierService.docklessVehicles());
    const points = this.aggregationService.aggregateDocklessVehicles(
      vehicles,
      args.zoom,
      args.boundingBox,
    );
    return points.map((point) => new AggregatedVehicle(point));
  }
}
