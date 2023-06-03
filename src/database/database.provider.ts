import strictEnv from 'src/helpers/strictEnv';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: strictEnv('DATABASE_HOST'),
        port: +strictEnv('DATABASE_PORT'),
        username: strictEnv('DATABASE_USERNAME'),
        password: strictEnv('DATABASE_PASSWORD'),
        database: strictEnv('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
