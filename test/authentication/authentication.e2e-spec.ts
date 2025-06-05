import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

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

  describe('Registration', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: uniqueEmail,
          password: 'password123'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test User');
          expect(res.body.email).toBe(uniqueEmail);
          expect(res.body).not.toHaveProperty('passwordHash');
        });
    });

    it('should not register a user with existing email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Another User',
          email: uniqueEmail,
          password: 'password456'
        })
        .expect(409); // Conflict
    });
  });

  describe('Login', () => {
    it('should login with correct credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: uniqueEmail,
          password: 'password123'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          accessToken = res.body.access_token;
        });
    });

    it('should not login with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: uniqueEmail,
          password: 'wrongpassword'
        })
        .expect(401); // Unauthorized
    });

    it('should not login with non-existent email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401); // Unauthorized
    });
  });

  describe('Protected Routes', () => {
    it('should access protected route with valid token', () => {
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should not access protected route without token', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(401);
    });

    it('should not access protected route with invalid token', () => {
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
}); 