import { DataSource } from 'typeorm';

import { RepositoryEnum } from 'src/constants/repository.enum';
import { Post } from './entities/post.entity';

export const postProvider = [
  {
    provide: RepositoryEnum.post,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATA_SOURCE'],
  },
];
