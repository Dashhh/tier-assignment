import { Test, TestingModule } from '@nestjs/testing';
import { AggregatedVehiclesResolver } from './aggregated-vehicles.resolver';
import { TierModule } from '../tier/tier.module';
import { AggregationModule } from '../aggregation/aggregation.module';
import { TierService } from '../tier/tier.service';
import { CacheModule } from '@nestjs/common';

describe('AggregatedVehiclesResolver', () => {
  let resolver: AggregatedVehiclesResolver;
  let tierService: TierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggregatedVehiclesResolver],
      imports: [CacheModule.register(), TierModule, AggregationModule],
    }).compile();

    resolver = module.get<AggregatedVehiclesResolver>(
      AggregatedVehiclesResolver,
    );
    tierService = module.get<TierService>(TierService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('aggregated vehicles', () => {
    const vehicles = [
      {
        bike_id:
          'b3d20b4017900852b8a49aeb26a525393f5ad3454c72d34072260958f4719bea',
        lat: 48.88,
        lon: 2.351,
        is_reserved: false,
        is_disabled: false,
        vehicle_type_id: 'escooter_paris',
        current_range_meters: 24000,
        pricing_plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        rental_uris: {
          android: 'https://tier.page.link/Vbaff',
          ios: 'https://tier.page.link/Vbaff',
        },
      },
      {
        bike_id:
          '0b813bd940eae06685126cb4b1de5851778eaa970ecafca72c9f7e0e28b1a684',
        lat: 48.882,
        lon: 2.355,
        is_reserved: false,
        is_disabled: false,
        vehicle_type_id: 'escooter_paris',
        current_range_meters: 28000,
        pricing_plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        rental_uris: {
          android: 'https://tier.page.link/Vbaff',
          ios: 'https://tier.page.link/Vbaff',
        },
      },
      {
        bike_id:
          '7da7a8e662cc19157167e533044d2580bf38e0dc1f150b003248cdcec805b2b3',
        lat: 48.75,
        lon: 2.34,
        is_reserved: false,
        is_disabled: false,
        vehicle_type_id: 'escooter_paris',
        current_range_meters: 13000,
        pricing_plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        rental_uris: {
          android: 'https://tier.page.link/Vbaff',
          ios: 'https://tier.page.link/Vbaff',
        },
      },
    ];

    it('return AggregatedVehicle', async () => {
      jest
        .spyOn(tierService, 'docklessVehicles')
        .mockImplementation(() => new Promise((r) => r(vehicles)));

      const result = await resolver.aggregatedVehicles({
        zoom: 13,
        boundingBox: [48.75, 2.34, 48.883, 2.356],
      });

      expect(result).toHaveLength(2);
    });

    it('filters by range', async () => {
      const spy = jest
        .spyOn(tierService, 'docklessVehicles')
        .mockImplementation(() => new Promise((r) => r(vehicles)));

      await resolver.aggregatedVehicles({
        zoom: 13,
        boundingBox: [48.75, 2.34, 48.883, 2.356],
        minRange: 20000,
      });
      expect(spy).toBeCalledWith(20000);
    });
  });
});
