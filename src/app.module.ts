import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      migrations: [__dirname, '../../infra/typeorm/migration/{.ts,.js}'],
      synchronize: true,
    }),
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
