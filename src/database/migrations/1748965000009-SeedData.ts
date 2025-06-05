import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedData1748965000009 implements MigrationInterface {
    name = 'SeedData1748965000009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed Geo data
        await queryRunner.query(`
            INSERT INTO \`geo\` (\`lat\`, \`lng\`) VALUES
            ('-37.3159', '81.1496'),
            ('-43.9509', '-34.4618')
        `);

        // Seed Company data
        await queryRunner.query(`
            INSERT INTO \`company\` (\`name\`, \`catchPhrase\`, \`bs\`) VALUES
            ('Romaguera-Crona', 'Multi-layered client-server neural-net', 'harness real-time e-markets'),
            ('Deckow-Crist', 'Proactive didactic contingency', 'synergize scalable supply-chains')
        `);

        // Seed Address data
        await queryRunner.query(`
            INSERT INTO \`address\` (\`street\`, \`suite\`, \`city\`, \`zipcode\`, \`geoId\`) VALUES
            ('Kulas Light', 'Apt. 556', 'Gwenborough', '92998-3874', 1),
            ('Victor Plains', 'Suite 879', 'Wisokyburgh', '90566-7771', 2)
        `);

        // Seed User data
        await queryRunner.query(`
            INSERT INTO \`user\` (\`name\`, \`username\`, \`email\`, \`phone\`, \`website\`, \`addressId\`, \`companyId\`) VALUES
            ('Leanne Graham', 'Bret', 'Sincere@april.biz', '1-770-736-8031 x56442', 'hildegard.org', 1, 1),
            ('Ervin Howell', 'Antonette', 'Shanna@melissa.tv', '010-692-6593 x09125', 'anastasia.net', 2, 2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove seeded data in reverse order
        await queryRunner.query(`DELETE FROM \`user\``);
        await queryRunner.query(`DELETE FROM \`address\``);
        await queryRunner.query(`DELETE FROM \`company\``);
        await queryRunner.query(`DELETE FROM \`geo\``);
    }
} 