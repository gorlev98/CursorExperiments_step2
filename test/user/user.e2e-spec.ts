import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  let createdUserId: number;
  let createdAddressId: number;
  let createdCompanyId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = jwtService.sign({ sub: 1 }); // Mock user ID
    await app.init();

    // Create address and company first
    const addressResponse = await request(app.getHttpServer())
      .post('/address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001'
      });
    createdAddressId = addressResponse.body.id;

    const companyResponse = await request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tech Corp',
        catchPhrase: 'Innovating the future',
        bs: 'Technology Solutions',
        description: 'A leading technology company'
      });
    createdCompanyId = companyResponse.body.id;
  });

  afterAll(async () => {
    // Clean up created resources
    await request(app.getHttpServer())
      .delete(`/address/${createdAddressId}`)
      .set('Authorization', `Bearer ${token}`);
    await request(app.getHttpServer())
      .delete(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`);
    await app.close();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123-456-7890',
        website: 'johndoe.com',
        addressId: createdAddressId,
        companyId: createdCompanyId
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
      });
  });

  it('should get list of users', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdUserId)).toBe(true);
      });
  });

  it('should get user by id', () => {
    return request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('John Doe');
        expect(res.body.username).toBe('johndoe');
        expect(res.body.email).toBe('john@example.com');
        expect(res.body.phone).toBe('123-456-7890');
        expect(res.body.website).toBe('johndoe.com');
        expect(res.body.addressId).toBe(createdAddressId);
        expect(res.body.companyId).toBe(createdCompanyId);
      });
  });

  it('should update user', () => {
    return request(app.getHttpServer())
      .put(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '098-765-4321',
        website: 'janedoe.com',
        addressId: createdAddressId,
        companyId: createdCompanyId
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('Jane Doe');
        expect(res.body.username).toBe('janedoe');
        expect(res.body.email).toBe('jane@example.com');
        expect(res.body.phone).toBe('098-765-4321');
        expect(res.body.website).toBe('janedoe.com');
      });
  });

  it('should get updated user by id', () => {
    return request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('Jane Doe');
        expect(res.body.username).toBe('janedoe');
        expect(res.body.email).toBe('jane@example.com');
        expect(res.body.phone).toBe('098-765-4321');
        expect(res.body.website).toBe('janedoe.com');
      });
  });

  it('should delete user by id', () => {
    return request(app.getHttpServer())
      .delete(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdUserId)).toBe(false);
      });
  });
}); 