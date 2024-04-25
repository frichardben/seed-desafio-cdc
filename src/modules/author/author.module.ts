import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';
import { TypeOrmAuthorRepository } from './repositories/typeorm/typeorm.author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    { provide: AuthorRepository, useClass: TypeOrmAuthorRepository },
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
