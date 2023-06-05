import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: 'db-postgresql-fra1-23515-do-user-13296757-0.b.db.ondigitalocean.com',
  port: 5432,
  username: 'doadmin',
  password: 'AVNS_cazWzMhL8fUb9RsQV5M',
  database: 'defaultdb',
  entities: [],
});
