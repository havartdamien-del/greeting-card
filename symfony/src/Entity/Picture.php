<?php

namespace App\Entity;

use App\Repository\PictureRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: PictureRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour créer une image',
        ),
        new Put(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour modifier une image',
        ),
        new Patch(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour modifier une image',
        ),
        new Delete(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour supprimer une image',
        ),
    ]
)]
class Picture
{
    private const SECURITY_AUTHENTICATED = 'is_authenticated()';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['card:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['card:read', 'card:write'])]
    private ?string $type = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['card:read', 'card:write'])]
    private ?string $value = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }
}
