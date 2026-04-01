<?php

namespace App\DataFixtures;

use App\Entity\Card;
use App\Entity\Tag;
use App\Entity\Picture;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        // Create tags
        $tagVille = new Tag();
        $tagVille->setName('ville');
        $manager->persist($tagVille);

        $tagPlage = new Tag();
        $tagPlage->setName('plage');
        $manager->persist($tagPlage);

        $tagLac = new Tag();
        $tagLac->setName('lac');
        $manager->persist($tagLac);

        $tagMontagne = new Tag();
        $tagMontagne->setName('montagne');
        $manager->persist($tagMontagne);

        // Cards data
        $cardsData = [
            // Plage cards
            [
                'title' => 'Petite plage tranquille',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, loin du bruit et des touristes.',
                'image' => 'plage5.jpg',
                'tags' => [$tagPlage],
            ],
            [
                'title' => 'Une superbe baie côtière',
                'description' => 'Un lieu célèbre qui donne envie de visiter, avec ses eaux cristallines et son sable blanc.',
                'image' => 'plage6.jpg',
                'tags' => [$tagPlage],
            ],
            [
                'title' => 'Sable blanc et palmiers',
                'description' => 'Un paradis tropical où le temps s\'arrête, parfait pour se détendre et oublier ses soucis.',
                'image' => 'plage7.jpg',
                'tags' => [$tagPlage],
            ],

            // Lac cards
            [
                'title' => 'Lac calme et serein',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, entouré de verdure et de tranquillité.',
                'image' => 'lac2.jpeg',
                'tags' => [$tagLac],
            ],
            [
                'title' => 'Les eaux cristallines du lac',
                'description' => 'Un lieu célèbre qui donne envie de visiter, avec des paysages à couper le souffle.',
                'image' => 'lac3.jpeg',
                'tags' => [$tagLac],
            ],
            [
                'title' => 'Reflet du soleil sur le lac',
                'description' => 'Un spectacle naturel magnifique, un moment de paix et de sérénité au cœur de la nature.',
                'image' => 'lac4.jpeg',
                'tags' => [$tagLac],
            ],

            // Montagne cards
            [
                'title' => 'Une grande chaîne de montagne',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, au sommet du monde avec une vue impériale.',
                'image' => 'montagne1.jpg',
                'tags' => [$tagMontagne],
            ],
            [
                'title' => 'Sommets enneigés majestueux',
                'description' => 'Un lieu célèbre qui donne envie de visiter, un paysage grandiose et inspirant.',
                'image' => 'montagne2.jpg',
                'tags' => [$tagMontagne],
            ],
            [
                'title' => 'Randonnée entre les pics',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, la montagne dans toute sa splendeur.',
                'image' => 'montagne3.jpg',
                'tags' => [$tagMontagne],
            ],

            // Ville cards
            [
                'title' => 'Une ville typique avec son charme',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, riche en histoire et en culture.',
                'image' => 'ville6.jpeg',
                'tags' => [$tagVille],
            ],
            [
                'title' => 'Rues pavées d\'une vieille ville',
                'description' => 'Un lieu célèbre qui donne envie de visiter, chaque coin raconte une histoire.',
                'image' => 'ville7.jpeg',
                'tags' => [$tagVille],
            ],
            [
                'title' => 'Architecture ancienne remarquable',
                'description' => 'Un endroit sympathique dans lequel on aime se perdre, admirant les façades historiques.',
                'image' => 'ville8.jpeg',
                'tags' => [$tagVille],
            ],
        ];

        // Create cards with pictures
        foreach ($cardsData as $cardData) {
            $card = new Card();
            $card->setTitle($cardData['title']);
            $card->setDescription($cardData['description']);
            $card->setIsActif(true);

            // Create picture
            $picture = new Picture();
            $picture->setType('fichier');
            $picture->setValue($cardData['image']);
            $manager->persist($picture);

            $card->setPicture($picture);

            // Add tags
            foreach ($cardData['tags'] as $tag) {
                $card->addTag($tag);
            }

            $manager->persist($card);
        }

        // Create default admin user
        $user = new User();
        $user->setEmail('admin@test.com');
        $user->setRoles(['ROLE_ADMIN']);
        
        $hashedPassword = $this->passwordHasher->hashPassword($user, 'password');
        $user->setPassword($hashedPassword);
        
        $manager->persist($user);

        $manager->flush();
    }
}
