<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Migration pour augmenter le champ 'value' de la table 'picture'
 * pour supporter les uploads de fichiers
 */
final class Version20260317150000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Augmente le champ value de Picture pour supporter les chemins de fichiers longs';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE picture CHANGE value value LONGTEXT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE picture CHANGE value value VARCHAR(500) NOT NULL');
    }
}
