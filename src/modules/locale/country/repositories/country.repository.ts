import { Country } from '../entities/country.entity';
import { CreateCountryDto } from '../dto/create-country.dto';

export abstract class CountryRepository {
  abstract store(data: CreateCountryDto): Promise<Country>;
  abstract findAll(): Promise<any | null>;
  abstract findById(id: number): Promise<Country | null>;
}
