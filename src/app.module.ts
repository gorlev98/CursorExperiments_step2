import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoModule } from './modules/geo/geo.module';
import { AddressModule } from './modules/address/address.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { Geo } from './database/entities/geo.entity';
import { Address } from './database/entities/address.entity';
import { Company } from './database/entities/company.entity';
import { User } from './database/entities/user.entity';
import { Authentication } from './database/entities/authentication.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'CursorExperiments_step2',
      entities: [Geo, Address, Company, User, Authentication],
      synchronize: true, // Set to false in production
    }),
    GeoModule,
    AddressModule,
    CompanyModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
