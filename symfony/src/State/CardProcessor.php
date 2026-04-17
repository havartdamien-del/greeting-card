<?php

namespace App\State;

use App\Entity\Card;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Processor pour les opérations sur Card (POST, PUT, PATCH, DELETE)
 * Ajoute du logging pour tracer les requêtes
 */
class CardProcessor implements ProcessorInterface
{
    private const DATETIME_FORMAT = 'Y-m-d H:i:s';

    public function __construct(
        // private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,

        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,

        #[Autowire(service: 'monolog.logger.api-log')]
        private LoggerInterface $logger
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {

        // Log les requêtes POST avec les données reçues
        if ($operation->getMethod() === 'POST') {
            $this->logger->info('Nouvelle création de Card via requête POST', [
                'title' => $data->getTitle() ?? 'N/A',
                'isActif' => $data->isActif() ?? 'N/A',
                'tags' => count($data->getTags() ?? []) . ' tag(s)',
                'timestamp' => (new \DateTime())->format(self::DATETIME_FORMAT),
            ]);
        }

        // Log les requêtes PUT/PATCH pour les modifications
        if (in_array($operation->getMethod(), ['PUT', 'PATCH'])) {
            $this->logger->info('Modification de Card', [
                'id' => $data->getId() ?? 'N/A',
                'title' => $data->getTitle() ?? 'N/A',
                'isActif' => $data->isActif() ?? 'N/A',
                'method' => $operation->getMethod(),
                'timestamp' => (new \DateTime())->format(self::DATETIME_FORMAT),
            ]);
        }

        // Log les requêtes DELETE
        if ($operation->getMethod() === 'DELETE') {
            $cardId = $uriVariables['id'] ?? ($data?->getId() ?? 'N/A');
            $title = $data?->getTitle() ?? 'N/A';
            
            $this->logger->info('Suppression de Card', [
                'id' => $cardId,
                'title' => $title,
                'timestamp' => (new \DateTime())->format(self::DATETIME_FORMAT),
            ]);
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        // Traite la requête avec le processor par défaut
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
