export interface Attraction {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  isFavorite?: boolean;
}

export type CategoryType = 'food' | 'sights' | 'shopping' | 'experiences';

export const attractionsData: Record<CategoryType, Attraction[]> = {
  food: [
    {
      id: 'f1',
      title: 'Café des Arts',
      imageUrl: '/images/popular/cafe-des-arts.jpg',
      description: 'Charming French café with authentic pastries and coffee',
      isFavorite: false,
    },
    {
      id: 'f2',
      title: 'La Villa',
      imageUrl: '/images/popular/la-villa.jpg',
      description: 'Fine dining restaurant with Mediterranean cuisine',
      isFavorite: false,
    },
    {
      id: 'f3',
      title: 'Satsanga',
      imageUrl: '/images/popular/satsanga.jpg',
      description: 'European restaurant with colonial ambiance',
      isFavorite: false,
    },
  ],
  sights: [
    {
      id: 's1',
      title: 'Paradise Beach',
      imageUrl: '/images/popular/paradise-beach.jpg',
      description: 'Pristine beach with golden sands and clear waters',
      isFavorite: false,
    },
    {
      id: 's2',
      title: 'Auroville',
      imageUrl: '/images/popular/auroville.jpg',
      description: 'Experimental township dedicated to human unity',
      isFavorite: false,
    },
    {
      id: 's3',
      title: 'French Quarter',
      imageUrl: '/images/popular/french-quarter.jpg',
      description: 'Historic district with French colonial architecture',
      isFavorite: false,
    },
  ],
  experiences: [
    {
        id: 'e3',
        title: 'Pottery Workshop',
        imageUrl: '/images/popular/pottery.jpg',
        description: 'Create your own pottery with local artisans',
        isFavorite: false,
      },
    {
      id: 'e1',
      title: 'Surfing School',
      imageUrl: '/images/popular/surfing.jpg',
      description: 'Learn surfing with experienced instructors',
      isFavorite: false,
    },
    {
      id: 'e2',
      title: 'Yoga Retreat',
      imageUrl: '/images/popular/yoga.jpg',
      description: 'Traditional yoga sessions in peaceful settings',
      isFavorite: false,
    },
  ],
  shopping: [
    {
      id: 'sh1',
      title: 'Sunday Market',
      imageUrl: '/images/popular/sunday-market.jpg',
      description: 'Weekly market with local products and handicrafts',
      isFavorite: false,
    },
    {
      id: 'sh2',
      title: 'Goubert Market',
      imageUrl: '/images/popular/goubert-market.jpg',
      description: 'Traditional market with textiles and spices',
      isFavorite: false,
    },
    {
      id: 'sh3',
      title: 'Craft Bazaar',
      imageUrl: '/images/popular/craft-bazaar.jpg',
      description: 'Handmade crafts and traditional artifacts',
      isFavorite: false,
    },
  ],
};
