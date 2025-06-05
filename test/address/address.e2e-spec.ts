import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AddressController (e2e)', () => {
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

  let createdAddressId: number;

  it('should create an address item', () => {
    return request(app.getHttpServer())
      .post('/address')
      .set('Authorization', `Bearer ${token}`)
      .send({ street: '123 Test St', suite: 'Suite 1', city: 'Test City', zipcode: '12345' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdAddressId = res.body.id;
      });
  });

  it('should get list of address items', () => {
    return request(app.getHttpServer())
      .get('/address')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdAddressId)).toBe(true);
      });
  });

  it('should get address item by id', () => {
    return request(app.getHttpServer())
      .get(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('123 Test St');
        expect(res.body.suite).toBe('Suite 1');
        expect(res.body.city).toBe('Test City');
        expect(res.body.zipcode).toBe('12345');
      });
  });

  it('should update address item', () => {
    return request(app.getHttpServer())
      .put(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ street: '456 Updated St', suite: 'Suite 2', city: 'Updated City', zipcode: '67890' })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('456 Updated St');
        expect(res.body.suite).toBe('Suite 2');
        expect(res.body.city).toBe('Updated City');
        expect(res.body.zipcode).toBe('67890');
      });
  });

  it('should get updated address item by id', () => {
    return request(app.getHttpServer())
      .get(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdAddressId);
        expect(res.body.street).toBe('456 Updated St');
        expect(res.body.suite).toBe('Suite 2');
        expect(res.body.city).toBe('Updated City');
        expect(res.body.zipcode).toBe('67890');
      });
  });

  it('should delete address item by id', () => {
    return request(app.getHttpServer())
      .delete(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/address')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdAddressId)).toBe(false);
      });
  });
}); 