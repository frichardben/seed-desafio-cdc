import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryRepository } from '@/modules/locale/country/repositories/country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepo: CountryRepository) {}

  async create(createCountryDto: CreateCountryDto) {
    return await this.countryRepo.store(createCountryDto);
  }

  async findAll() {
    return await this.countryRepo.findAll();
  }

  async findOne(id: number) {
    const country = await this.countryRepo.findById(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }
}
