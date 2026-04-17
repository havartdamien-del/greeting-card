<?php

namespace App\Controller;

use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Psr\Log\LoggerInterface;

/**
 * Contrôleur pour gérer l'upload des images
 * L'image est sauvegardée sur le disque et enregistrée dans la table picture
 */
#[Route('/api')]
class PictureUploadController extends AbstractController
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    #[Route('/pictures/upload', name: 'picture_upload', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED')]
    public function upload(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $this->logger->info('=== DEBUT UPLOAD IMAGE ===');
            
            $uploadedFile = $request->files->get('file');

            // Valider le fichier
            $validationError = $this->validateUploadedFile($uploadedFile);
            if ($validationError !== null) {
                return $validationError;
            }

            // Sauvegarder le fichier et créer l'enregistrement en base
            $newFilename = $this->saveUploadedFile($uploadedFile);
            $picture = $this->createPictureEntity($entityManager, $newFilename);

            return new JsonResponse([
                'success' => true,
                'message' => 'Fichier uploadé avec succès',
                'picture' => [
                    'id' => $picture->getId(),
                    'type' => $picture->getType(),
                    'value' => $picture->getValue(),
                    'url' => $this->getParameter('app.upload_base_url') . $picture->getValue()
                ]
            ], JsonResponse::HTTP_CREATED);

        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => 'Erreur serveur: ' . $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Valide le fichier uploadé (type MIME et taille)
     * Retourne JsonResponse si erreur, null si valide
     */
    private function validateUploadedFile($uploadedFile): ?JsonResponse
    {
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        $fileMimeType = $uploadedFile->getMimeType();
        
        if (!in_array($fileMimeType, $allowedMimeTypes)) {
            return new JsonResponse(
                ['error' => 'Type de fichier non autorisé. Types acceptés: JPEG, PNG, GIF, WebP, SVG'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $maxSize = 5 * 1024 * 1024; // 5MB
        if ($uploadedFile->getSize() > $maxSize) {
            return new JsonResponse(
                ['error' => 'Fichier trop volumineux. Taille maximale: 5MB'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        return null;
    }

    /**
     * Sauvegarde le fichier uploadé sur le disque
     * Retourne le nom du fichier généré
     */
    private function saveUploadedFile($uploadedFile): string
    {
        $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalFilename);
        $newFilename = $safeFilename . '_' . uniqid() . '.' . $uploadedFile->guessExtension();

        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        try {
            $uploadedFile->move($uploadDir, $newFilename);
        } catch (FileException $e) {
            throw new \Exception('Erreur lors du téléchargement du fichier: ' . $e->getMessage());
        }

        return $newFilename;
    }

    /**
     * Crée et persiste l'entité Picture en base de données
     */
    private function createPictureEntity(EntityManagerInterface $entityManager, string $filename): Picture
    {
        $picture = new Picture();
        $picture->setType('fichier');
        $picture->setValue($filename);

        $entityManager->persist($picture);
        $entityManager->flush();

        return $picture;
    }
}
