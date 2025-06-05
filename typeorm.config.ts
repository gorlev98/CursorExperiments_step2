import { DataSource } from 'typeorm';
import { Geo } from './src/database/entities/geo.entity';
import { Address } from './src/database/entities/address.entity';
import { Company } from './src/database/entities/company.entity';
import { User } from './src/database/entities/user.entity';
import { Authentication } from './src/database/entities/authentication.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'CursorExperiments_step2',
  entities: [Geo, Address, Company, User, Authentication],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
}); 