<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class WelcomeController extends AbstractController
{
    #[Route('/', name: 'welcome', methods: ['GET'])]
    public function index(): Response
    {
        return $this->json([
            'status' => 'success',
            'message' => '💌 Bienvenue sur l\'API Greeting Card AI!',
            'version' => '1.0.0',
            'description' => 'Créez vos cartes de vœux avec l\'intelligence artificielle',
            'endpoints' => [
                'docs' => '/api/docs',
                'api' => '/api',
                'health' => '/health',
            ],
            'timestamp' => (new \DateTime())->format('Y-m-d H:i:s'),
        ]);
    }
}
