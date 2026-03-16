<?php

namespace App\State;

use App\Entity\Card;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Doctrine\ORM\EntityManagerInterface;

/**
 * State Provider pour retourner uniquement les cards actives
 */
class CardActiveProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function provide(
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): object|array|null {
        $repository = $this->entityManager->getRepository(Card::class);

        // Récupère uniquement les cards actives (isActif = true)
        $cards = $repository->findBy(['isActif' => true]);

        return $cards;
    }
}
