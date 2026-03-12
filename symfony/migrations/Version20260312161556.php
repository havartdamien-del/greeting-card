<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260312161556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE card (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, no VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE card_picture (card_id INT NOT NULL, picture_id INT NOT NULL, INDEX IDX_41C1C5FF4ACC9A20 (card_id), INDEX IDX_41C1C5FFEE45BDBF (picture_id), PRIMARY KEY (card_id, picture_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE picture (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) DEFAULT NULL, value VARCHAR(500) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE card_picture ADD CONSTRAINT FK_41C1C5FF4ACC9A20 FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE card_picture ADD CONSTRAINT FK_41C1C5FFEE45BDBF FOREIGN KEY (picture_id) REFERENCES picture (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card_picture DROP FOREIGN KEY FK_41C1C5FF4ACC9A20');
        $this->addSql('ALTER TABLE card_picture DROP FOREIGN KEY FK_41C1C5FFEE45BDBF');
        $this->addSql('DROP TABLE card');
        $this->addSql('DROP TABLE card_picture');
        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE tag');
    }
}
