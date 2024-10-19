import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryRepository } from '@/modules/locale/country/repositories/country.repository';
import { TypeOrmCountryRepository } from '@/modules/locale/country/repositories/typeorm/typeorm.country.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '@/modules/locale/country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CountryService,
    { provide: CountryRepository, useClass: TypeOrmCountryRepository },
  ],
  exports: [CountryService],
})
export class CountryModule {}
