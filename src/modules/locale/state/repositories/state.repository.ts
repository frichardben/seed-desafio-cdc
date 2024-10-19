import { CreateStateDto } from '@/modules/locale/state/dto/create-state.dto';
import { State } from '@/modules/locale/state/entities/state.entity';

export abstract class StateRepository {
  abstract store(data: CreateStateDto): Promise<State>;
  abstract findById(id: number): Promise<State | null>;
  abstract findAll(): Promise<any | null>;
}
