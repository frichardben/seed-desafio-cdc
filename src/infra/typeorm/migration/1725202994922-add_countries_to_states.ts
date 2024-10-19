import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCountriesToStates1725202994922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'states',
      new TableColumn({
        name: 'country_id',
        type: 'int',
        isPrimary: false,
      }),
    );

    await queryRunner.createForeignKey(
      'states',
      new TableForeignKey({
        columnNames: ['country_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'countries',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('states', 'FK_states_country_id');
    await queryRunner.dropColumn('states', 'country_id');
  }
}
