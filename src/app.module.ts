import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IsUniqueConstraint } from './common/validation/UniqueConstraint/is-unique-constraint';
import { BookModule } from './modules/book/book.module';
import { CountryModule } from '@/modules/locale/country/country.module';
import { StateModule } from '@/modules/locale/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':inmemory:',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      migrations: [__dirname, '../../infra/typeorm/migration/{.ts,.js}'],
      synchronize: true,
    }),
    AuthorModule,
    CategoryModule,
    BookModule,
    CountryModule,
    StateModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
