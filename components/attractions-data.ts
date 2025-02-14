export interface Attraction {
  id: string;
  title: string;
  imageUrl: string;
  isFavorite?: boolean;
}

export const attractionsData: Attraction[] = [
  {
    id: '1',
    title: 'Paradise Beach',
    imageUrl: '/images/paradise-beach.jpg',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Auroville',
    imageUrl: '/images/auroville.jpg',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'French Quarter',
    imageUrl: '/images/french-quarter.jpg',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Rock Beach',
    imageUrl: '/images/rock-beach.jpg',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Botanical Garden',
    imageUrl: '/images/botanical-garden.jpg',
    isFavorite: false,
  },
];
