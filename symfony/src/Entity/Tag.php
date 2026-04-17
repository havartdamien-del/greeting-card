<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: TagRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour créer un tag',
        ),
        new Put(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour modifier un tag',
        ),
        new Patch(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour modifier un tag',
        ),
        new Delete(
            security: self::SECURITY_AUTHENTICATED,
            securityMessage: 'Vous devez être authentifié pour supprimer un tag',
        ),
    ]
)]
class Tag
{
    private const SECURITY_AUTHENTICATED = 'is_authenticated()';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['card:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['card:read', 'card:write'])]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
