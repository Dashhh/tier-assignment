import { Test, TestingModule } from '@nestjs/testing';
import { AggregatedVehiclesResolver } from './aggregated-vehicles.resolver';

describe('AggregatedVehiclesResolver', () => {
  let resolver: AggregatedVehiclesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggregatedVehiclesResolver],
    }).compile();

    resolver = module.get<AggregatedVehiclesResolver>(
      AggregatedVehiclesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
