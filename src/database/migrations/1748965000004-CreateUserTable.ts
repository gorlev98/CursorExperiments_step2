import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1748965000004 implements MigrationInterface {
    name = 'CreateUserTable1748965000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`phone\` varchar(255) NOT NULL,
                \`website\` varchar(255) NOT NULL,
                \`addressId\` int NULL,
                \`companyId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
} 