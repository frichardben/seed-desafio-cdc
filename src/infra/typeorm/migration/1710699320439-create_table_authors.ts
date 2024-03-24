import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAuthors1710699320439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'vachar',
          },
          {
            name: 'email',
            type: 'vachar',
          },
          {
            name: 'description',
            type: 'vachar',
          },
          {
            name: 'register',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('authors');
  }
}
