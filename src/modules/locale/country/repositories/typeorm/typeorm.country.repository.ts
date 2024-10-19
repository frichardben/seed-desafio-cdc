import { CountryRepository } from '@/modules/locale/country/repositories/country.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../entities/country.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { CreateCountryDto } from '@/modules/locale/country/dto/create-country.dto';

export class TypeOrmCountryRepository implements CountryRepository {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async store(data: CreateCountryDto) {
    return await this.countryRepo.save(data);
  }

  async findById(id: number) {
    return await this.countryRepo.findOne({ where: { id: id } });
  }

  async findAll() {
    const countries = instanceToPlain(await this.countryRepo.find());
    return { countries };
  }
}
