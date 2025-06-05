import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test User');
        expect(res.body.email).toBe('test@example.com');
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('should not register a user with existing email', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(400);
  });

  it('should login with valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe('test@example.com');
        expect(res.body.user).not.toHaveProperty('password');
      });
  });

  it('should not login with invalid password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
  });

  it('should not login with non-existent email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      })
      .expect(401);
  });

  it('should validate token', async () => {
    // First login to get a token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.access_token;

    // Then validate the token
    return request(app.getHttpServer())
      .get('/auth/validate')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe('test@example.com');
      });
  });

  it('should not validate invalid token', () => {
    return request(app.getHttpServer())
      .get('/auth/validate')
      .set('Authorization', 'Bearer invalid.token.here')
      .expect(401);
  });
}); 