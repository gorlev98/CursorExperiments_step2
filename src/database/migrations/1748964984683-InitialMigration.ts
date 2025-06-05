import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1748964984685 implements MigrationInterface {
    name = 'InitialMigration1748964984685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`authentication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_abc878c952c2769f239103b2d5\` (\`email\`), UNIQUE INDEX \`REL_2ce04c38ee386596885c903d9a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`authentication\` ADD CONSTRAINT \`FK_2ce04c38ee386596885c903d9ad\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_2ce04c38ee386596885c903d9ad\``);
        await queryRunner.query(`DROP INDEX \`REL_2ce04c38ee386596885c903d9a\` ON \`authentication\``);
        await queryRunner.query(`DROP INDEX \`IDX_abc878c952c2769f239103b2d5\` ON \`authentication\``);
        await queryRunner.query(`DROP TABLE \`authentication\``);
    }

}
