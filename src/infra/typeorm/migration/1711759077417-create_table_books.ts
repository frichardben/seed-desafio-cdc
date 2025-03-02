import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBooks1711759077417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'abstract',
            type: 'varchar',
          },
          {
            name: 'summary',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'pageNumber',
            type: 'int',
          },
          {
            name: 'isbn',
            type: 'varchar',
          },
          {
            name: 'releaseDate',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
