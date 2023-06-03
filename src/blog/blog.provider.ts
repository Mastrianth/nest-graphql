import { DataSource } from 'typeorm';

import { RepositoryEnum } from 'src/constants/repository.enum';
import { Blog } from './entities/blog.entity';

export const blogProvider = [
  {
    provide: RepositoryEnum.blog,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Blog),
    inject: ['DATA_SOURCE'],
  },
];
