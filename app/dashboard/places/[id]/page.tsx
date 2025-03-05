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
    name: 'Botanical Garden',
    mainImage: '/images/botanical-garden.jpg',
    description: 'The Botanical Garden, established in 1826, is a peaceful oasis in the heart of Puducherry. The garden features beautiful fountains, flower beds, and rare plant species. It\'s a perfect place for nature lovers and those seeking tranquility.',
    images: [
      '/images/botanical-garden.jpg',
      '/images/french-quarter.jpg',
      '/images/paradise-beach.jpg',
    ],
    cheatSheet: {
      whereToEat: 'Several cafes and restaurants are located within walking distance. Try the local South Indian cuisine at nearby establishments.',
      travellingEssentials: 'Best visited during morning hours. Carry water and wear comfortable walking shoes. Photography is allowed.',
      etiquette: 'Maintain cleanliness and follow garden rules. Respect the plant life and maintain silence in meditation areas.',
    },
    location: {
      latitude: 11.9316,
      longitude: 79.8336
    }
  },
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