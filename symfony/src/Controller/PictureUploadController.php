<?php

namespace App\Controller;

use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

/**
 * Contrôleur pour gérer l'upload des images
 * L'image est sauvegardée sur le disque et enregistrée dans la table picture
 */
#[Route('/api')]
class PictureUploadController extends AbstractController
{
    #[Route('/pictures/upload', name: 'picture_upload', methods: ['POST'])]
    public function upload(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            // Récupérer le fichier depuis la requête
            $uploadedFile = $request->files->get('file');
            
            if (!$uploadedFile) {
                return new JsonResponse(
                    ['error' => 'Aucun fichier trouvé. Veuillez envoyer un fichier avec la clé "file"'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            // Valider le type MIME
            $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            $fileMimeType = $uploadedFile->getMimeType();
            
            if (!in_array($fileMimeType, $allowedMimeTypes)) {
                return new JsonResponse(
                    ['error' => 'Type de fichier non autorisé. Types acceptés: JPEG, PNG, GIF, WebP, SVG'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            // Valider la taille du fichier (max 5MB)
            $maxSize = 5 * 1024 * 1024; // 5MB
            if ($uploadedFile->getSize() > $maxSize) {
                return new JsonResponse(
                    ['error' => 'Fichier trop volumineux. Taille maximale: 5MB'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            // Générer un nom unique pour le fichier
            $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalFilename);
            $newFilename = $safeFilename . '_' . uniqid() . '.' . $uploadedFile->guessExtension();

            // Créer le répertoire d'upload s'il n'existe pas
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            try {
                // Déplacer le fichier uploadé
                $uploadedFile->move($uploadDir, $newFilename);
            } catch (FileException $e) {
                return new JsonResponse(
                    ['error' => 'Erreur lors du téléchargement du fichier: ' . $e->getMessage()],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
            }

            // Créer un enregistrement Picture dans la base de données
            $picture = new Picture();
            $picture->setType('fichier');
            // Stocker le chemin relatif pour y accéder via HTTP
            $picture->setValue('/uploads/' . $newFilename);

            $entityManager->persist($picture);
            $entityManager->flush();

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
}
