import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IsUniqueConstraint } from './common/validation/UniqueConstraint/is-unique-constraint';
import { BookModule } from './modules/book/book.module';

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
    CategoryModule,
    BookModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
