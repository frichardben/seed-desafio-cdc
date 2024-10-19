import {
  StateRepository,
} from '@/modules/locale/state/repositories/state.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from '@/modules/locale/state/entities/state.entity';
import { Repository } from 'typeorm';
import { CreateStateDto } from '@/modules/locale/state/dto/create-state.dto';
import { instanceToPlain } from 'class-transformer';

export class TypeOrmStateRepository implements StateRepository {
  constructor(
    @InjectRepository(State)
    private readonly stateRepo: Repository<State>,
  ) {}

  async store(data: CreateStateDto) {
    return await this.stateRepo.save(data);
  }

  async findById(id: number) {
    return await this.stateRepo.findOne({ where: { id } });
  }

  async findAll() {
    const states = instanceToPlain(await this.stateRepo.find());
    return { states };
  }
}
