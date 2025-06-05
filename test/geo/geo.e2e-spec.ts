import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('GeoController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = jwtService.sign({ sub: 1 }); // Mock user ID
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdGeoId: number;

  it('should create a geo item', () => {
    return request(app.getHttpServer())
      .post('/geo')
      .set('Authorization', `Bearer ${token}`)
      .send({ lat: '40.7128', lng: '-74.0060' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdGeoId = res.body.id;
      });
  });

  it('should get list of geo items', () => {
    return request(app.getHttpServer())
      .get('/geo')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdGeoId)).toBe(true);
      });
  });

  it('should get geo item by id', () => {
    return request(app.getHttpServer())
      .get(`/geo/${createdGeoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdGeoId);
        expect(res.body.lat).toBe('40.7128');
        expect(res.body.lng).toBe('-74.0060');
      });
  });

  it('should update geo item', () => {
    return request(app.getHttpServer())
      .put(`/geo/${createdGeoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ lat: '41.8781', lng: '-87.6298' })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdGeoId);
        expect(res.body.lat).toBe('41.8781');
        expect(res.body.lng).toBe('-87.6298');
      });
  });

  it('should get updated geo item by id', () => {
    return request(app.getHttpServer())
      .get(`/geo/${createdGeoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdGeoId);
        expect(res.body.lat).toBe('41.8781');
        expect(res.body.lng).toBe('-87.6298');
      });
  });

  it('should delete geo item by id', () => {
    return request(app.getHttpServer())
      .delete(`/geo/${createdGeoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/geo')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdGeoId)).toBe(false);
      });
  });
}); 