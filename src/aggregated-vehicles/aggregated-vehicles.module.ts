import { Module } from '@nestjs/common';
import { AggregatedVehiclesResolver } from './aggregated-vehicles.resolver';
import { TierModule } from '../tier/tier.module';
import { AggregationModule } from '../aggregation/aggregation.module';

@Module({
  imports: [TierModule, AggregationModule],
  providers: [AggregatedVehiclesResolver],
})
export class AggregatedVehiclesModule {}
