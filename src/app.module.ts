import { Module } from '@nestjs/common';
import { TierModule } from './tier/tier.module';
import { AggregationModule } from './aggregation/aggregation.module';

@Module({
  imports: [TierModule, AggregationModule],
})
export class AppModule {}
