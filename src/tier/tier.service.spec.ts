import { Test, TestingModule } from '@nestjs/testing';
import { TierService } from './tier.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CacheModule } from '@nestjs/common';

describe('TierService', () => {
  let service: TierService;
  let httpService: HttpService;
  let response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TierService],
      imports: [HttpModule, CacheModule.register()],
    }).compile();

    service = module.get<TierService>(TierService);
    httpService = module.get<HttpService>(HttpService);
    response = {
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('pricingPlans', () => {
    const plans = [
      {
        plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        name: 'scooter-standard-pricing-paris',
        currency: 'EUR',
        price: 1,
        is_taxable: false,
        description:
          'Standard pricing for scooters, 1.00 EUR to unlock, 0.22 EUR per minute to rent',
        per_min_pricing: [
          {
            start: 0,
            rate: 0.22,
            interval: 1,
          },
        ],
      },
    ];

    it('should return pricing plans', () => {
      response.data = {
        last_updated: 1649469444,
        ttl: 0,
        version: '2.2',
        data: { plans },
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

      service.pricingPlans().subscribe((value) => {
        expect(value).toBe(plans);
      });
    });

    it('should return empty array on error', () => {
      response = {
        ...response,
        status: 400,
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

      service.pricingPlans().subscribe((value) => {
        expect(value).toHaveLength(0);
      });
    });
  });

  describe('docklessVehicles', () => {
    const bikes = [
      {
        bike_id:
          'b3d20b4017900852b8a49aeb26a525393f5ad3454c72d34072260958f4719bea',
        lat: 48.88024048755891,
        lon: 2.3510320704790506,
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
        lat: 48.878861,
        lon: 2.395727,
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
        lat: 48.867870545986435,
        lon: 2.392465460968122,
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
      {
        bike_id:
          '43a473a0c6275ba8d300bf54375dfa08c78d47a90642f0e41f1c50b8dfce9be0',
        lat: 48.83342,
        lon: 2.356635,
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
          '2ccf2352c89c7a98e9c6d9846fa2061ec37081ea1426285285b1c9f402e8cf1f',
        lat: 48.861748088038375,
        lon: 2.361398764428203,
        is_reserved: false,
        is_disabled: false,
        vehicle_type_id: 'escooter_paris',
        current_range_meters: 15000,
        pricing_plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        rental_uris: {
          android: 'https://tier.page.link/Vbaff',
          ios: 'https://tier.page.link/Vbaff',
        },
      },
      {
        bike_id:
          '8109a4fcceb173b11b40bb0f29ff7a9b0a9127fddbd8856a850d45441052089a',
        lat: 48.864961,
        lon: 2.387956,
        is_reserved: false,
        is_disabled: false,
        vehicle_type_id: 'escooter_paris',
        current_range_meters: 7000,
        pricing_plan_id: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
        rental_uris: {
          android: 'https://tier.page.link/Vbaff',
          ios: 'https://tier.page.link/Vbaff',
        },
      },
    ];
    it('should return dockless vehicles', async () => {
      response.data = {
        last_updated: 1649469444,
        ttl: 0,
        version: '2.2',
        data: { bikes },
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

      const result = await service.docklessVehicles();
      expect(result).toBe(bikes);
    });

    it('should return empty array on error', async () => {
      response = {
        ...response,
        status: 400,
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

      const result = await service.docklessVehicles();
      expect(result).toHaveLength(0);
    });

    it('should filter by mileage', async () => {
      response.data = {
        last_updated: 1649469444,
        ttl: 0,
        version: '2.2',
        data: { bikes },
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

      const result = await service.docklessVehicles(20000);
      expect(result).toHaveLength(3);
    });
  });
});
