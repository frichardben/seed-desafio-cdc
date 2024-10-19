import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '@/modules/locale/country/entities/country.entity';

@Entity({ name: 'states' })
export class State {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.states)
  @JoinTable({ name: 'countryId' })
  country: Country;
}
