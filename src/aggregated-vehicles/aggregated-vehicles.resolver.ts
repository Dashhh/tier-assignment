import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AggregatedVehicle } from './models/aggregated-vehicle.model';
import { TierService } from '../tier/tier.service';
import { AggregationService } from '../aggregation/aggregation.service';
import { GetAggregatedVehiclesArgs } from './dto/get-aggregated-vehicles.args';

@Resolver(() => AggregatedVehicle)
export class AggregatedVehiclesResolver {
  constructor(
    private readonly tierService: TierService,
    private readonly aggregationService: AggregationService,
  ) {}

  @Query(() => [AggregatedVehicle])
  async aggregatedVehicles(
    @Args() args: GetAggregatedVehiclesArgs,
  ): Promise<AggregatedVehicle[]> {
    const vehicles = await this.tierService.docklessVehicles(args.minRange);
    const points = this.aggregationService.aggregateDocklessVehicles(
      vehicles,
      args.zoom,
      args.boundingBox,
    );

    return points.map((point) => new AggregatedVehicle(point));
  }

  @ResolveField()
  pricingPlan(@Parent() aggregatedVehicle: AggregatedVehicle) {
    if (aggregatedVehicle.pricingPlanId) {
      return this.tierService.pricingPlan(aggregatedVehicle.pricingPlanId);
    }
  }
}
