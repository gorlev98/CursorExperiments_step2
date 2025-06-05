import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1748965000003 implements MigrationInterface {
    name = 'CreateAddressTable1748965000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`address\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`street\` varchar(255) NOT NULL,
                \`suite\` varchar(255) NOT NULL,
                \`city\` varchar(255) NOT NULL,
                \`zipcode\` varchar(255) NOT NULL,
                \`geoId\` int NULL,
                UNIQUE INDEX \`REL_7c1b6204d568dc520a623682db\` (\`geoId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`address\``);
    }
} 