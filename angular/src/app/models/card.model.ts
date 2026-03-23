export interface Picture {
  id?: number;
  type: string;
  value: string;
}

export interface Tag {
  id?: number;
  name: string;
}

export interface Image {
  id?: number;
  type: string;
  value: string;
}

export interface Card {
  id?: number;
  title: string;
  description?: string;
  //picture: Picture;
  picture: Image;
  tags: Tag[];
}

export interface ApiResponse {
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
  'member'?: Card[];
}
