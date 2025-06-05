import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  let createdCompanyId: number;

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

  it('should create a company', () => {
    return request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tech Corp',
        catchPhrase: 'Innovating the future',
        bs: 'Technology Solutions',
        description: 'A leading technology company'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        createdCompanyId = res.body.id;
      });
  });

  it('should get list of companies', () => {
    return request(app.getHttpServer())
      .get('/company')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdCompanyId)).toBe(true);
      });
  });

  it('should get company by id', () => {
    return request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Tech Corp');
        expect(res.body.catchPhrase).toBe('Innovating the future');
        expect(res.body.bs).toBe('Technology Solutions');
        expect(res.body.description).toBe('A leading technology company');
      });
  });

  it('should update company', () => {
    return request(app.getHttpServer())
      .put(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tech Solutions Inc',
        catchPhrase: 'Building tomorrow today',
        bs: 'Enterprise Solutions',
        description: 'A global technology leader'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Tech Solutions Inc');
        expect(res.body.catchPhrase).toBe('Building tomorrow today');
        expect(res.body.bs).toBe('Enterprise Solutions');
        expect(res.body.description).toBe('A global technology leader');
      });
  });

  it('should get updated company by id', () => {
    return request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCompanyId);
        expect(res.body.name).toBe('Tech Solutions Inc');
        expect(res.body.catchPhrase).toBe('Building tomorrow today');
        expect(res.body.bs).toBe('Enterprise Solutions');
        expect(res.body.description).toBe('A global technology leader');
      });
  });

  it('should delete company by id', () => {
    return request(app.getHttpServer())
      .delete(`/company/${createdCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should get list to verify deletion', () => {
    return request(app.getHttpServer())
      .get('/company')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item.id === createdCompanyId)).toBe(false);
      });
  });
}); 