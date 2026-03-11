<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HealthController extends AbstractController
{
    #[Route('/health', name: 'health_check', methods: ['GET'])]
    public function check(): Response
    {
        return $this->json([
            'status' => 'healthy',
            'timestamp' => (new \DateTime())->format('Y-m-d H:i:s'),
            'environment' => $this->getParameter('kernel.environment'),
        ]);
    }
}
