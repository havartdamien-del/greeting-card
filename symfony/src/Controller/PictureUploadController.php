<?php

namespace App\Controller;

use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    public function upload(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $this->logger->info('=== DEBUT UPLOAD IMAGE ===');
            
            $uploadedFile = $request->files->get('file');

            /*
            // Log les informations de la requête
            $this->logger->info('Requête reçue', [
                'method' => $request->getMethod(),
                //'content_type' => $request->getContentType(),
                'headers' => $request->headers->all()
            ]);

            // Log tous les fichiers disponibles
            $this->logger->info('Fichiers disponibles dans la requête:', [
                'files_keys' => array_keys($request->files->all()),
                'files_count' => count($request->files->all()),
                'all_files' => $request->files->all()
            ]);

            // Récupérer le fichier depuis la requête
            $uploadedFile = $request->files->get('file');
            
            $this->logger->info('Tentative de récupération du fichier "file"', [
                'file_exists' => $uploadedFile !== null,
                'file_type' => $uploadedFile ? get_class($uploadedFile) : 'NULL'
            ]);
            
            if (!$uploadedFile) {
                $this->logger->warning('ERREUR: Aucun fichier trouvé avec la clé "file"');
                return new JsonResponse(
                    ['error' => 'Aucun fichier trouvé. Veuillez envoyer un fichier avec la clé "file"'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $this->logger->info('Fichier trouvé', [
                'name' => $uploadedFile->getClientOriginalName(),
                'size' => $uploadedFile->getSize(),
                'mime_type' => $uploadedFile->getMimeType(),
                'error' => $uploadedFile->getError()
            ]);

            // Valider le type MIME
            $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            $fileMimeType = $uploadedFile->getMimeType();
            
            if (!in_array($fileMimeType, $allowedMimeTypes)) {
                $this->logger->warning('Type MIME non autorisé', [
                    'mime_type' => $fileMimeType,
                    'allowed' => $allowedMimeTypes
                ]);
                return new JsonResponse(
                    ['error' => 'Type de fichier non autorisé. Types acceptés: JPEG, PNG, GIF, WebP, SVG'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            // Valider la taille du fichier (max 5MB)
            $maxSize = 5 * 1024 * 1024; // 5MB
            if ($uploadedFile->getSize() > $maxSize) {
                $this->logger->warning('Fichier trop volumineux', [
                    'size' => $uploadedFile->getSize(),
                    'max_size' => $maxSize
                ]);
                return new JsonResponse(
                    ['error' => 'Fichier trop volumineux. Taille maximale: 5MB'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            // Générer un nom unique pour le fichier
            $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalFilename);
            $newFilename = $safeFilename . '_' . uniqid() . '.' . $uploadedFile->guessExtension();

            $this->logger->info('Nouveau nom de fichier généré', [
                'original' => $uploadedFile->getClientOriginalName(),
                'new_filename' => $newFilename
            ]);

            // Créer le répertoire d'upload s'il n'existe pas
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
                $this->logger->info('Répertoire d\'upload créé', ['path' => $uploadDir]);
            }

            try {
                // Déplacer le fichier uploadé
                $uploadedFile->move($uploadDir, $newFilename);
                $this->logger->info('Fichier déplacé avec succès', [
                    'upload_dir' => $uploadDir,
                    'filename' => $newFilename
                ]);
            } catch (FileException $e) {
                $this->logger->error('Erreur lors du déplacement du fichier', [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);
                return new JsonResponse(
                    ['error' => 'Erreur lors du téléchargement du fichier: ' . $e->getMessage()],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
            }

            // Créer un enregistrement Picture dans la base de données
            $picture = new Picture();
            $picture->setType('fichier');
            // Stocker le chemin relatif pour y accéder via HTTP
            // $picture->setValue('/uploads/' . $newFilename);
            $picture->setValue($newFilename);

            $entityManager->persist($picture);
            $entityManager->flush();

            $this->logger->info('Image enregistrée en base de données', [
                'picture_id' => $picture->getId(),
                'picture_type' => $picture->getType(),
                'picture_value' => $picture->getValue()
            ]);

            $this->logger->info('=== UPLOAD IMAGE REUSSI ===');

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

        // } catch (\Exception $e) {
        //     $this->logger->error('Exception lors de l\'upload', [
        //         'message' => $e->getMessage(),
        //         'code' => $e->getCode(),
        //         'file' => $e->getFile(),
        //         'line' => $e->getLine(),
        //         'trace' => $e->getTraceAsString()
        //     ]);
        //     return new JsonResponse(
        //         ['error' => 'Erreur serveur: ' . $e->getMessage()],
        //         JsonResponse::HTTP_INTERNAL_SERVER_ERROR
        //     );
        // }
//     }
// }
*/

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
            // $picture->setValue('/uploads/' . $newFilename);
            $picture->setValue($newFilename);

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
