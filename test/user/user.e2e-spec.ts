import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
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

  let createdUserId: number;

  it('should create a user item', () => {
    return request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test User', username: 'testuser', email: 'test@example.com', phone: '123-456-7890', website: 'www.test.com' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
      });
  });

  it('should get list of user items', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdUserId)).toBe(true);
      });
  });

  it('should get user item by id', () => {
    return request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('Test User');
        expect(res.body.email).toBe('test@example.com');
        expect(res.body.phone).toBe('123-456-7890');
      });
  });

  it('should update user item', () => {
    return request(app.getHttpServer())
      .put(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User', username: 'updateduser', email: 'updated@example.com', phone: '098-765-4321', website: 'www.updated.com' })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('Updated User');
        expect(res.body.email).toBe('updated@example.com');
        expect(res.body.phone).toBe('098-765-4321');
      });
  });

  it('should get updated user item by id', () => {
    return request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.name).toBe('Updated User');
        expect(res.body.email).toBe('updated@example.com');
        expect(res.body.phone).toBe('098-765-4321');
      });
  });

  it('should delete user item by id', () => {
    return request(app.getHttpServer())
      .delete(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdUserId)).toBe(false);
      });
  });
}); 