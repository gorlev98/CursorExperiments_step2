import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AddressController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  let createdGeoId: number;
  let createdAddressId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = jwtService.sign({ sub: 1 }); // Mock user ID
    await app.init();

    // Create a geo entry first
    const geoResponse = await request(app.getHttpServer())
      .post('/geo')
      .set('Authorization', `Bearer ${token}`)
      .send({ lat: '40.7128', lng: '-74.0060' });
    createdGeoId = geoResponse.body.id;
  });

  afterAll(async () => {
    // Clean up geo entry
    await request(app.getHttpServer())
      .delete(`/geo/${createdGeoId}`)
      .set('Authorization', `Bearer ${token}`);
    await app.close();
  });

  it('should create an address', () => {
    return request(app.getHttpServer())
      .post('/address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001',
        geoId: createdGeoId
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdAddressId = res.body.id;
      });
  });

  it('should get list of addresses', () => {
    return request(app.getHttpServer())
      .get('/address')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdAddressId)).toBe(true);
      });
  });

  it('should get address by id', () => {
    return request(app.getHttpServer())
      .get(`/address/${createdAddressId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('123 Main St');
        expect(res.body.suite).toBe('Apt 4B');
        expect(res.body.city).toBe('New York');
        expect(res.body.zipcode).toBe('10001');
        expect(res.body.geoId).toBe(createdGeoId);
      });
  });

  it('should update address', () => {
    return request(app.getHttpServer())
      .put(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        street: '456 Oak Ave',
        suite: 'Suite 7C',
        city: 'Chicago',
        zipcode: '60601',
        geoId: createdGeoId
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('456 Oak Ave');
        expect(res.body.suite).toBe('Suite 7C');
        expect(res.body.city).toBe('Chicago');
        expect(res.body.zipcode).toBe('60601');
      });
  });

  it('should get updated address by id', () => {
    return request(app.getHttpServer())
      .get(`/address/${createdAddressId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('456 Oak Ave');
        expect(res.body.suite).toBe('Suite 7C');
        expect(res.body.city).toBe('Chicago');
        expect(res.body.zipcode).toBe('60601');
      });
  });

  it('should delete address by id', () => {
    return request(app.getHttpServer())
      .delete(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/address')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdAddressId)).toBe(false);
      });
  });
}); 