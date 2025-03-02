import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IsUniqueConstraint } from './common/validation/UniqueConstraint/is-unique-constraint';
import { BookModule } from './modules/book/book.module';
import { CountryModule } from '@/modules/locale/country/country.module';
import { StateModule } from '@/modules/locale/state/state.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from '@/infra/config/postgres.config.service';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
