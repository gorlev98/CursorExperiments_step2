import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeysToUser1748965000007 implements MigrationInterface {
    name = 'AddForeignKeysToUser1748965000007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_29a05908a0fa256852f9d31a11\`
            FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_86586021a776d876a3070a29d\`
            FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_86586021a776d876a3070a29d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_29a05908a0fa256852f9d31a11\``);
    }
} 