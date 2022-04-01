import dotenv from 'dotenv';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

// dotenv 설정
dotenv.config();

export default {
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./build/src/domain/entities/*'],
  // entitiesTS가 없으면 cannot import가 뜬다.. 도대체 왜 why... 이해할 수 없네
  entitiesTs: ['./src/domain/entities/*'],
  // https://github.com/mikro-orm/mikro-orm/discussions/1214
  type: 'mysql',
  dbName: process.env.MYSQL_DATABASE,
  clientUrl: `mysql://root@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`,
  password: process.env.MYSQL_ROOT_PASSWORD,
};
