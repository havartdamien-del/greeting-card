<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260312161741 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE card_tag (card_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_537933424ACC9A20 (card_id), INDEX IDX_53793342BAD26311 (tag_id), PRIMARY KEY (card_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE card_tag ADD CONSTRAINT FK_537933424ACC9A20 FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE card_tag ADD CONSTRAINT FK_53793342BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE card_picture DROP FOREIGN KEY `FK_41C1C5FF4ACC9A20`');
        $this->addSql('ALTER TABLE card_picture DROP FOREIGN KEY `FK_41C1C5FFEE45BDBF`');
        $this->addSql('DROP TABLE card_picture');
        $this->addSql('ALTER TABLE card ADD picture_id INT DEFAULT NULL, DROP no');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3EE45BDBF FOREIGN KEY (picture_id) REFERENCES picture (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_161498D3EE45BDBF ON card (picture_id)');
        $this->addSql('ALTER TABLE picture CHANGE type type VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE card_picture (card_id INT NOT NULL, picture_id INT NOT NULL, INDEX IDX_41C1C5FF4ACC9A20 (card_id), INDEX IDX_41C1C5FFEE45BDBF (picture_id), PRIMARY KEY (card_id, picture_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE card_picture ADD CONSTRAINT `FK_41C1C5FF4ACC9A20` FOREIGN KEY (card_id) REFERENCES card (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE card_picture ADD CONSTRAINT `FK_41C1C5FFEE45BDBF` FOREIGN KEY (picture_id) REFERENCES picture (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE card_tag DROP FOREIGN KEY FK_537933424ACC9A20');
        $this->addSql('ALTER TABLE card_tag DROP FOREIGN KEY FK_53793342BAD26311');
        $this->addSql('DROP TABLE card_tag');
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3EE45BDBF');
        $this->addSql('DROP INDEX UNIQ_161498D3EE45BDBF ON card');
        $this->addSql('ALTER TABLE card ADD no VARCHAR(255) NOT NULL, DROP picture_id');
        $this->addSql('ALTER TABLE picture CHANGE type type VARCHAR(255) DEFAULT NULL');
    }
}
