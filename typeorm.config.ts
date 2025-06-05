import { DataSource } from 'typeorm';
import { Geo } from './src/database/entities/geo.entity';
import { Address } from './src/database/entities/address.entity';
import { Company } from './src/database/entities/company.entity';
import { User } from './src/database/entities/user.entity';
import { Authentication } from './src/database/entities/authentication.entity';

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'CursorExperiments_step2',
  entities: [Geo, Address, Company, User, Authentication],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
}); 