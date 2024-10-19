import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '@/modules/locale/state/entities/state.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => State, (state) => state)
  states: State[];
}
