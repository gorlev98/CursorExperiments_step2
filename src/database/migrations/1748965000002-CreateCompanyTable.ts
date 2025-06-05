import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyTable1748965000002 implements MigrationInterface {
    name = 'CreateCompanyTable1748965000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`company\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`catchPhrase\` varchar(255) NOT NULL,
                \`bs\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`company\``);
    }
} 