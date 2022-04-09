import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;
  let response;
  const vehicles = [
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    httpService = moduleFixture.get<HttpService>(HttpService);
    app = moduleFixture.createNestApplication();

    response = {
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };
    await app.init();
  });

  it('graphql 1', async () => {
    response.data = {
      last_updated: 1649469444,
      ttl: 0,
      version: '2.2',
      data: { bikes: vehicles },
    };
    const query = `query {
      aggregatedVehicles (zoom: 17, boundingBox: [48.856, 2.34, 48.868, 2.39]) {
        lat
        lon
        count
      }
    }`;
    jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

    const { body } = await request(app.getHttpServer()).post('/graphql').send({
      query,
    });
    expect(body.data.aggregatedVehicles).toHaveLength(2);
  });

  it('graphql mileage', async () => {
    response.data = {
      last_updated: 1649469444,
      ttl: 0,
      version: '2.2',
      data: { bikes: vehicles },
    };
    const query = `query {
      aggregatedVehicles (zoom: 17, boundingBox: [48.856, 2.34, 48.868, 2.39], minRange: 10000) {
        lat
        lon
        count
      }
    }`;
    jest.spyOn(httpService, 'get').mockImplementation(() => of(response));

    const { body } = await request(app.getHttpServer()).post('/graphql').send({
      query,
    });

    expect(body.data.aggregatedVehicles).toHaveLength(1);
    expect(body.data.aggregatedVehicles[0].count).toBe(1);
  });
});
