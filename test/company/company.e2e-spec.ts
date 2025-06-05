import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('CompanyController (e2e)', () => {
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

  let createdCompanyId: number;

  it('should create a company item', () => {
    return request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Company', description: 'A test company', catchPhrase: 'Catchy Phrase', bs: 'Business Strategy' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdCompanyId = res.body.id;
      });
  });

  it('should get list of company items', () => {
    return request(app.getHttpServer())
      .get('/company')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdCompanyId)).toBe(true);
      });
  });

  it('should get company item by id', () => {
    return request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Test Company');
        expect(res.body.description).toBe('A test company');
      });
  });

  it('should update company item', () => {
    return request(app.getHttpServer())
      .put(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Company', description: 'An updated test company', catchPhrase: 'Updated Catchy Phrase', bs: 'Updated Business Strategy' })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Updated Company');
        expect(res.body.description).toBe('An updated test company');
      });
  });

  it('should get updated company item by id', () => {
    return request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Updated Company');
        expect(res.body.description).toBe('An updated test company');
      });
  });

  it('should delete company item by id', () => {
    return request(app.getHttpServer())
      .delete(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/company')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdCompanyId)).toBe(false);
      });
  });
}); 