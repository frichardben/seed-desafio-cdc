import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { TypeOrmCategoryRepository } from './repositories/typeorm/typeorm.author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: CategoryRepository, useClass: TypeOrmCategoryRepository },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
