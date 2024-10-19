import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { StateRepository } from '@/modules/locale/state/repositories/state.repository';

@Injectable()
export class StateService {
  constructor(private readonly stateRepo: StateRepository) {}

  async create(createStateDto: CreateStateDto) {
    return await this.stateRepo.store(createStateDto);
  }

  async findAll() {
    return await this.stateRepo.findAll();
  }

  async findOne(id: number) {
    return await this.stateRepo.findById(id);
  }
}
