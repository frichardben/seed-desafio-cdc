import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateRepository } from '@/modules/locale/state/repositories/state.repository';
import { TypeOrmStateRepository } from '@/modules/locale/state/repositories/typeorm/typeorm.state.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '@/modules/locale/state/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StateController],
  providers: [
    StateService,
    { provide: StateRepository, useClass: TypeOrmStateRepository },
  ],
})
export class StateModule {}
