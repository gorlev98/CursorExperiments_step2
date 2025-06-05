import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGeoTable1748965000001 implements MigrationInterface {
    name = 'CreateGeoTable1748965000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`geo\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`lat\` varchar(255) NOT NULL,
                \`lng\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`geo\``);
    }
} 