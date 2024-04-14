import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCategoryToBooks1712278131338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books', 'FK_books_category_id');
    await queryRunner.dropColumn('books', 'category_id');
  }
}
