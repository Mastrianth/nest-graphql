import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { RepositoryEnum } from 'src/constants/repository.enum';

export const userProvider = [
  {
    provide: RepositoryEnum.user,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
