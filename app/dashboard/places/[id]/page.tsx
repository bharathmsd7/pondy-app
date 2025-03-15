/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

interface PlaceDetails {
  id: number;
  name: string;
  mainImage: string;
  description: string;
  images: string[];
  cheatSheet: {
    whereToEat: string;
    travellingEssentials: string;
    etiquette: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

const placeDetails: Record<string, PlaceDetails> = {
  '1': {
    id: 1,
    name: 'Paradise Beach',
    mainImage: '/images/Attractions/Paradise Beach/p1.jpg',
    description: '"Escape to Paradise Beach in Pondicherry, a pristine stretch of golden sands surrounded by lush greenery and gentle waves. Accessible by a scenic boat ride, this secluded beach offers a peaceful retreat for relaxation, sunbathing, and enjoying nature\'s beauty. It\'s perfect for those seeking tranquility away from the city\'s hustle.',
    images: [
      '/images/Attractions/Paradise Beach/pp.jpg',
      '/images/Attractions/Paradise Beach/p2.jpg',
      '/images/Attractions/Paradise Beach/p3.jpeg',
      '/images/Attractions/Paradise Beach/p4.jpg'
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 11.873681042420559,
      longitude: 79.82127090678313
    }
  },
  '2': {
    id: 2,
    name: 'Rock Beach',
    mainImage: '/images/Attractions/Rock Beach/rockbeach.jpg',
    description: 'Experience the serene beauty of Pondicherry\'s Rock Beach, where the rhythmic waves meet the rugged charm of rocky shores. Perfect for leisurely strolls, mesmerizing sunrises, and enjoying the cool sea breeze, this spot is a haven for nature lovers and peace seekers alike.',
    images: [
      '/images/Attractions/Rock Beach/rockbeach1.png',
      '/images/Attractions/Rock Beach/rockbeach2.jpg',
      '/images/Attractions/Rock Beach/rockbeach3.jpg',
      '/images/Attractions/Rock Beach/rb4.jpg'
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 11.934365665465208,
      longitude: 79.8362278862501
    }
  },
  '3': {
    id: 3,
    name: 'White Town',
    mainImage: '/images/Attractions/White Town/wt1.jpg',
    description: 'Step into the picturesque White Town of Pondicherry, where French colonial charm meets vibrant Indian culture. Known for its cobblestone streets, pastel-hued buildings, and cozy cafés, this heritage area offers a perfect blend of history, art, and tranquility. Explore its charming alleys, boutique shops, and serene promenade for an unforgettable experience.',
    images: [
      '/images/Attractions/White Town/wt2.jpg',
      '/images/Attractions/White Town/wt3.jpg',
      '/images/Attractions/White Town/wt4.jpeg',
      '/images/Attractions/White Town/wt5.png'
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 11.936958204479657,
      longitude: 79.83480099301926
    }
  },
  '4': {
    id: 4,
    name: 'Auroville',
    mainImage: '/images/Attractions/Auroville/aa.jpg',
    description: 'Discover the unique charm of Auroville, an experimental township near Pondicherry dedicated to human unity and sustainable living. Renowned for its tranquil atmosphere and the iconic Matrimandir, Auroville invites visitors to explore its serene pathways, lush greenery, and vibrant community projects. It\'s a place where spirituality, nature, and innovation come together.',
    images: [
      '/images/Attractions/Auroville/a1.jpg',
      '/images/Attractions/Auroville/a2.jpg',
      '/images/Attractions/Auroville/a3.jpg',
      '/images/Attractions/Auroville/a4.jpeg'
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 12.007293476170522, 
      longitude: 79.81061073897064
    }
  },
  
  
  '5': {
    id: 5,
    name: 'Bharathi Park',
    mainImage: '/images/Attractions/Bharati Park/bp.jpg',
    description: 'Nestled in the heart of Pondicherry, Bharathi Park is a oasis of greenery and tranquility. Surrounded by historic landmarks, this well-maintained park features shady pathways, vibrant gardens, and the iconic Aayi Mandapam at its center. Perfect for leisurely strolls, picnics, or simply unwinding amidst nature, it\'s a favorite spot for both locals and visitors.',
    images: [
      '/images/Attractions/Bharati Park/b1.jpg',
      '/images/Attractions/Bharati Park/b2.jpg',
      '/images/Attractions/Bharati Park/b3.jpg',
      '/images/Attractions/Bharati Park/b4.jpg'
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 11.933208033920929,
      longitude: 79.83416161013429
    }
  }
  // Add more places here
};

export default function PlaceDetails() {
  const params = useParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const placeId = params.id as string;
  const place = placeDetails[placeId];

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div className="min-h-screen bg-background mb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={place.mainImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{place.name}</h1>
        <p className="text-muted-foreground mb-8">{place.description}</p>

        {/* Image Carousel */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <Carousel 
            className="w-full" 
            opts={{ loop: true }} 
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
          >
            <CarouselContent>
              {place.images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${place.name} ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Cheat Sheet */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cheat Sheet</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-orange-500">Where to Eat</h3>
              <p className="mt-2 text-muted-foreground">{place.cheatSheet.whereToEat}</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Travelling Essentials</h3>
              <p className="mt-2 text-muted-foreground">{place.cheatSheet.travellingEssentials}</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Etiquette</h3>
              <p className="mt-2 text-muted-foreground">{place.cheatSheet.etiquette}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN}&q=${place.location.latitude},${place.location.longitude}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}