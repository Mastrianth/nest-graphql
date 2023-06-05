import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'holy_user',
  password: 'holy_pass',
  database: 'holy_db',
  entities: [],
});
