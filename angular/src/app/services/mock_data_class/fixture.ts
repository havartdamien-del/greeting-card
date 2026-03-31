import { Card, Image, Tag } from '../../models/card.model';

export class Fixture {
  private tags: Tag[] = [];
  private cards: Card[] = [];
  private images: Image[] = [];
  private nextCardId = 13; // Next available ID after initial 12 cards

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialize Tags
    this.tags = [
      { id: 1, name: 'ville' },
      { id: 2, name: 'plage' },
      { id: 3, name: 'lac' },
      { id: 4, name: 'montagne' },
    ];

    // Initialize Images
    const imageData = [
      { id: 1, type: 'fichier', value: 'plage5.jpg' },
      { id: 2, type: 'fichier', value: 'plage6.jpg' },
      { id: 3, type: 'fichier', value: 'plage7.jpg' },
      { id: 4, type: 'fichier', value: 'lac2.jpeg' },
      { id: 5, type: 'fichier', value: 'lac3.jpeg' },
      { id: 6, type: 'fichier', value: 'lac4.jpeg' },
      { id: 7, type: 'fichier', value: 'montagne1.jpg' },
      { id: 8, type: 'fichier', value: 'montagne2.jpg' },
      { id: 9, type: 'fichier', value: 'montagne3.jpg' },
      { id: 10, type: 'fichier', value: 'ville6.jpeg' },
      { id: 11, type: 'fichier', value: 'ville7.jpeg' },
      { id: 12, type: 'fichier', value: 'ville8.jpeg' },
    ];
    this.images = [...imageData];

    // Initialize Cards (matching AppFixtures.php structure)
    const cardsData = [
      // Plage cards (IDs 1-3)
      {
        id: 1,
        title: 'Petite plage tranquille',
        description: 'Un endroit sympathique dans lequel on aime se perdre, loin du bruit et des touristes.',
        picture: imageData[0],
        tags: [this.tags[1]], // plage
      },
      {
        id: 2,
        title: 'Une superbe baie côtière',
        description: 'Un lieu célèbre qui donne envie de visiter, avec ses eaux cristallines et son sable blanc.',
        picture: imageData[1],
        tags: [this.tags[1]], // plage
      },
      {
        id: 3,
        title: 'Sable blanc et palmiers',
        description: 'Un paradis tropical où le temps s\'arrête, parfait pour se détendre et oublier ses soucis.',
        picture: imageData[2],
        tags: [this.tags[1]], // plage
      },

      // Lac cards (IDs 4-6)
      {
        id: 4,
        title: 'Lac calme et serein',
        description: 'Un endroit sympathique dans lequel on aime se perdre, entouré de verdure et de tranquillité.',
        picture: imageData[3],
        tags: [this.tags[2]], // lac
      },
      {
        id: 5,
        title: 'Les eaux cristallines du lac',
        description: 'Un lieu célèbre qui donne envie de visiter, avec des paysages à couper le souffle.',
        picture: imageData[4],
        tags: [this.tags[2]], // lac
      },
      {
        id: 6,
        title: 'Reflet du soleil sur le lac',
        description: 'Un spectacle naturel magnifique, un moment de paix et de sérénité au cœur de la nature.',
        picture: imageData[5],
        tags: [this.tags[2]], // lac
      },

      // Montagne cards (IDs 7-9)
      {
        id: 7,
        title: 'Une grande chaîne de montagne',
        description: 'Un endroit sympathique dans lequel on aime se perdre, au sommet du monde avec une vue impériale.',
        picture: imageData[6],
        tags: [this.tags[3]], // montagne
      },
      {
        id: 8,
        title: 'Sommets enneigés majestueux',
        description: 'Un lieu célèbre qui donne envie de visiter, un paysage grandiose et inspirant.',
        picture: imageData[7],
        tags: [this.tags[3]], // montagne
      },
      {
        id: 9,
        title: 'Randonnée entre les pics',
        description: 'Un endroit sympathique dans lequel on aime se perdre, la montagne dans toute sa splendeur.',
        picture: imageData[8],
        tags: [this.tags[3]], // montagne
      },

      // Ville cards (IDs 10-12)
      {
        id: 10,
        title: 'Une ville typique avec son charme',
        description: 'Un endroit sympathique dans lequel on aime se perdre, riche en histoire et en culture.',
        picture: imageData[9],
        tags: [this.tags[0]], // ville
      },
      {
        id: 11,
        title: 'Rues pavées d\'une vieille ville',
        description: 'Un lieu célèbre qui donne envie de visiter, chaque coin raconte une histoire.',
        picture: imageData[10],
        tags: [this.tags[0]], // ville
      },
      {
        id: 12,
        title: 'Architecture ancienne remarquable',
        description: 'Un endroit sympathique dans lequel on aime se perdre, admirant les façades historiques.',
        picture: imageData[11],
        tags: [this.tags[0]], // ville
      },
    ];

    this.cards = cardsData;
  }

  /**
   * Get all tags (returns a copy)
   */
  getTags(): Tag[] {
    return JSON.parse(JSON.stringify(this.tags));
  }

  /**
   * Get all cards (returns a copy)
   */
  getCards(): Card[] {
    return JSON.parse(JSON.stringify(this.cards));
  }

  /**
   * Get all images (returns a copy)
   */
  getImages(): Image[] {
    return JSON.parse(JSON.stringify(this.images));
  }

  /**
   * Get tag by ID
   */
  getTagById(id: number): Tag | undefined {
    const tag = this.tags.find(t => t.id === id);
    return tag ? JSON.parse(JSON.stringify(tag)) : undefined;
  }

  /**
   * Get card by ID
   */
  getCardById(id: number): Card | undefined {
    const card = this.cards.find(c => c.id === id);
    return card ? JSON.parse(JSON.stringify(card)) : undefined;
  }

  /**
   * Get image by ID
   */
  getImageById(id: number): Image | undefined {
    const image = this.images.find(i => i.id === id);
    return image ? JSON.parse(JSON.stringify(image)) : undefined;
  }

  /**
   * Add a new card
   */
  addCard(card: Card): Card {
    const newCard = { ...card, id: card.id || this.nextCardId++ };
    this.cards.push(newCard);
    return JSON.parse(JSON.stringify(newCard));
  }

  /**
   * Update a card
   */
  updateCard(id: number, card: Card): void {
    const index = this.cards.findIndex(c => c.id === id);
    if (index > -1) {
      this.cards[index] = { ...card, id };
    }
  }

  /**
   * Delete a card
   */
  deleteCard(id: number): void {
    const index = this.cards.findIndex(c => c.id === id);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }

  /**
   * Add a new tag
   */
  addTag(tag: Tag): Tag {
    const newTag = { ...tag, id: tag.id || Math.max(...this.tags.map(t => t.id || 0)) + 1 };
    this.tags.push(newTag);
    return JSON.parse(JSON.stringify(newTag));
  }

  /**
   * Update a tag
   */
  updateTag(id: number, tag: Tag): void {
    const index = this.tags.findIndex(t => t.id === id);
    if (index > -1) {
      this.tags[index] = { ...tag, id };
    }
  }

  /**
   * Delete a tag
   */
  deleteTag(id: number): void {
    const index = this.tags.findIndex(t => t.id === id);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  /**
   * Add a new image
   */
  addImage(image: Image): Image {
    const newImage = { ...image, id: image.id || Math.max(...this.images.map(i => i.id || 0)) + 1 };
    this.images.push(newImage);
    return JSON.parse(JSON.stringify(newImage));
  }

  /**
   * Update an image
   */
  updateImage(id: number, image: Image): void {
    const index = this.images.findIndex(i => i.id === id);
    if (index > -1) {
      this.images[index] = { ...image, id };
    }
  }

  /**
   * Delete an image
   */
  deleteImage(id: number): void {
    const index = this.images.findIndex(i => i.id === id);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this.tags = [];
    this.cards = [];
    this.images = [];
    this.nextCardId = 13;
    this.initializeData();
  }
}
