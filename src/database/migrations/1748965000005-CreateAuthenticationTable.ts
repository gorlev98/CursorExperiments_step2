import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthenticationTable1748965000005 implements MigrationInterface {
    name = 'CreateAuthenticationTable1748965000005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`authentication\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`passwordHash\` varchar(255) NOT NULL,
                \`userId\` int NULL,
                UNIQUE INDEX \`IDX_abc878c952c2769f239103b2d5\` (\`email\`),
                UNIQUE INDEX \`REL_2ce04c38ee386596885c903d9a\` (\`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`authentication\``);
    }
} 