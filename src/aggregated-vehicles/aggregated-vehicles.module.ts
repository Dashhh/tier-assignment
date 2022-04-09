import { Module } from '@nestjs/common';
import { AggregatedVehiclesResolver } from './aggregated-vehicles.resolver';

@Module({
  providers: [AggregatedVehiclesResolver],
})
export class AggregatedVehiclesModule {}
