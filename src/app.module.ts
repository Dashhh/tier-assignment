import { Module } from '@nestjs/common';
import { TierModule } from './tier/tier.module';
import { AggregationModule } from './aggregation/aggregation.module';
import { AggregatedVehiclesModule } from './aggregated-vehicles/aggregated-vehicles.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TierModule,
    AggregationModule,
    AggregatedVehiclesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
