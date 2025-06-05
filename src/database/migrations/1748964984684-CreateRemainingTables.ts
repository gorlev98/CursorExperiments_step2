import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRemainingTables1748964984684 implements MigrationInterface {
    name = 'CreateRemainingTables1748964984684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Geo table
        await queryRunner.query(`
            CREATE TABLE \`geo\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`lat\` varchar(255) NOT NULL,
                \`lng\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // Create Company table
        await queryRunner.query(`
            CREATE TABLE \`company\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`catchPhrase\` varchar(255) NOT NULL,
                \`bs\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // Create Address table
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

        // Create User table
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

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE \`address\` 
            ADD CONSTRAINT \`FK_7c1b6204d568dc520a623682db\` 
            FOREIGN KEY (\`geoId\`) REFERENCES \`geo\`(\`id\`) 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

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
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_86586021a776d876a3070a29d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_29a05908a0fa256852f9d31a11\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_7c1b6204d568dc520a623682db\``);

        // Drop tables in reverse order
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`geo\``);
    }
} 