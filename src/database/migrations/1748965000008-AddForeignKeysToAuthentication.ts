import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeysToAuthentication1748965000008 implements MigrationInterface {
    name = 'AddForeignKeysToAuthentication1748965000008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`authentication\`
            ADD CONSTRAINT \`FK_2ce04c38ee386596885c903d9ad\`
            FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_2ce04c38ee386596885c903d9ad\``);
    }
} 