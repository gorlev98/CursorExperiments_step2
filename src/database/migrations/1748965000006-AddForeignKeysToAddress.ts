import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeysToAddress1748965000006 implements MigrationInterface {
    name = 'AddForeignKeysToAddress1748965000006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD CONSTRAINT \`FK_7c1b6204d568dc520a623682db\`
            FOREIGN KEY (\`geoId\`) REFERENCES \`geo\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_7c1b6204d568dc520a623682db\``);
    }
} 