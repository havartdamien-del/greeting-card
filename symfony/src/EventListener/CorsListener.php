<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernel;

class CorsListener
{
    private string $allowedOrigins;

    public function __construct(string $allowedOrigins = '^https?://localhost(:[0-9]+)?$')
    {
        $this->allowedOrigins = $allowedOrigins;
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        // Do not respond to sub requests
        if (HttpKernel::MAIN_REQUEST !== $event->getRequestType()) {
            return;
        }

        $request = $event->getRequest();
        $response = $event->getResponse();

        // Allow requests from allowed origins
        if ($request->headers->has('Origin')) {
            $origin = $request->headers->get('Origin');
            
            // Check if origin matches the allowed pattern
            if (preg_match('/' . str_replace('/', '\/', $this->allowedOrigins) . '/i', $origin)) {
                $response->headers->set('Access-Control-Allow-Origin', $origin);
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
                $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
                $response->headers->set('Access-Control-Max-Age', '86400');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
                $response->headers->set('Vary', 'Origin');
            }
        }
    }
}
