import { Test, TestingModule } from '@nestjs/testing';
import { AggregationService } from './aggregation.service';
import { Point } from './types/point.type';
import { DocklessVehicle } from '../tier/interfaces/dockless-vehicle.interface';

describe('AggregationService', () => {
  let service: AggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggregationService],
    }).compile();

    service = module.get<AggregationService>(AggregationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('aggregate', () => {
    it('should cluster 2 points', () => {
      const points: Point[] = [
        {
          type: 'Feature',
          properties: { id: 'id' },
          geometry: { coordinates: [1.111, 5.111], type: 'Point' },
        },
        {
          type: 'Feature',
          properties: { id: 'id' },
          geometry: { coordinates: [1.112, 5.112], type: 'Point' },
        },
        {
          type: 'Feature',
          properties: { id: 'id' },
          geometry: { coordinates: [2.111, 5.111], type: 'Point' },
        },
      ];
      const result = service.aggregate(points, 14, [1.11, 5.11, 1.12, 5.113]);
      expect(result).toHaveLength(1);
    });
  });
  describe('aggregateDocklessVehicles', () => {
    it('should cluster 2 vehicles', () => {
      const vehicles: DocklessVehicle[] = [
        {
          bike_id:
            'b3d20b4017900852b8a49aeb26a525393f5ad3454c72d34072260958f4719bea',
          lat: 48.879,
          lon: 2.395,
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
          lat: 48.879,
          lon: 2.393,
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
          lat: 48.85,
          lon: 2.35,
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
      const result = service.aggregateDocklessVehicles(
        vehicles,
        12,
        [48.84, 2.34, 48.88, 2.396],
      );
      expect(result).toHaveLength(2);
    });
  });
});
