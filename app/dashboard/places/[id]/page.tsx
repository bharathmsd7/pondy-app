/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, Heart, Clock, Car, Zap, Dog, Coffee, Wifi, Camera, Baby, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

interface PlaceDetails {
  id: number;
  name: string;
  mainImage: string;
  description: string;
  images: string[];
  timings: {
    weekdays: string;
    weekends: string;
    holidays?: string;
  };
  facilities: {
    name: string;
    icon: string;
    available: boolean;
  }[];
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
    
    timings: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 7:00 PM',
      holidays: '10:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'EV Charging', icon: 'Zap', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: true },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
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
    timings: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 7:00 PM',
      holidays: '10:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'EV Charging', icon: 'Zap', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: true },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
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
    timings: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 7:00 PM',
      holidays: '10:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'EV Charging', icon: 'Zap', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: true },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
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
    timings: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 7:00 PM',
      holidays: '10:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'EV Charging', icon: 'Zap', available: false },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
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
    timings: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 7:00 PM',
      holidays: '10:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'EV Charging', icon: 'Zap', available: false },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.933208033920929,
      longitude: 79.83416161013429
    }
  },

  
  '6': {
    id: 6,
    name: 'Arulmigu Manakula Vinayagar Temple',
    mainImage: '/images/places/manakula-vinayagar-temple.jpg',
    description: 'A historic temple dedicated to Lord Ganesha, the Manakula Vinayagar Temple is known for its spiritual significance and intricate architecture. The temple walls feature 40 different forms of Ganesha, and visitors can receive blessings from the temple elephant. The golden spire and detailed sculptures make it a must-visit spiritual destination.',
    images: [
      '/images/places/manakula-vinayagar-temple.jpg',
      '/images/places/manakula-vinayagar-temple.jpg',
      '/images/places/manakula-vinayagar-temple.jpg',
      '/images/places/manakula-vinayagar-temple.jpg'
    ],
    timings: {
      weekdays: '5:30 AM - 12:30 PM, 4:00 PM - 9:00 PM',
      weekends: '5:30 AM - 12:30 PM, 4:00 PM - 9:00 PM',
      holidays: '5:30 AM - 12:30 PM, 4:00 PM - 9:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: false },
    ],
    location: {
      latitude: 11.933893858183889,
      longitude: 79.83333893897064
    }
  },

  '7': {
    id: 7,
    name: 'The Basilica Sacred Heart of Jesus Church',
    mainImage: '/images/places/basilica-church.jpg',
    description: 'The Basilica of the Sacred Heart of Jesus is a stunning example of Gothic architecture, featuring beautiful stained glass windows depicting events from Jesus Christ\'s life. Built in 1907, this Roman Catholic church is known for its peaceful atmosphere and magnificent architectural details.',
    images: [
      '/images/places/basilica-church.jpg',
      '/images/places/basilica-church.jpg',
      '/images/places/basilica-church.jpg',
      '/images/places/basilica-church.jpg'
    ],
    timings: {
      weekdays: '7:00 AM - 6:30 PM',
      weekends: '7:00 AM - 6:30 PM',
      holidays: '7:00 AM - 6:30 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.930465866533465,
      longitude: 79.83577893897064
    }
  },

  '8': {
    id: 8,
    name: 'Ousteri Lake',
    mainImage: '/images/places/ousteri_lake.jpg',
    description: 'Ousteri Lake, also known as Ossudu Lake, is the largest freshwater lake in Pondicherry. This bird sanctuary is home to over 40 species of migratory birds. Perfect for nature lovers and bird watchers, the lake offers serene views and peaceful surroundings, especially during sunrise and sunset.',
    images: [
      '/images/places/ousteri_lake.jpg',
      '/images/places/ousteri_lake.jpg',
      '/images/places/ousteri_lake.jpg',
      '/images/places/ousteri_lake.jpg'
    ],
    timings: {
      weekdays: '6:00 AM - 5:00 PM',
      weekends: '6:00 AM - 5:00 PM',
      holidays: '6:00 AM - 5:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.946958204479657,
      longitude: 79.73480099301926
    }
  },

  '9': {
    id: 9,
    name: 'Sandunes',
    mainImage: '/images/places/sandunes.jpg',
    description: 'The Sandunes of Pudukuppam offer a unique desert-like experience near the coast. This natural formation provides an excellent spot for adventure activities and photography. Visitors can enjoy activities like ATV rides and sandboarding while taking in the distinctive landscape.',
    images: [
      '/images/places/sandunes.jpg',
      '/images/places/sandunes.jpg',
      '/images/places/sandunes.jpg',
      '/images/places/sandunes.jpg'
    ],
    timings: {
      weekdays: '6:00 AM - 6:00 PM',
      weekends: '6:00 AM - 6:00 PM',
      holidays: '6:00 AM - 6:00 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.873681042420559,
      longitude: 79.82127090678313
    }
  },

  '10': {
    id: 10,
    name: 'Pondicherry Museum',
    mainImage: '/images/places/museum.jpg',
    description: 'The Pondicherry Museum houses a fascinating collection of artifacts from the French colonial period and ancient South Indian culture. Visitors can explore archaeological findings, French furniture, sculptures, and rare artifacts that showcase the rich historical heritage of Pondicherry.',
    images: [
      '/images/places/museum.jpg',
      '/images/places/museum.jpg',
      '/images/places/museum.jpg',
      '/images/places/museum.jpg'
    ],
    timings: {
      weekdays: '10:00 AM - 5:00 PM',
      weekends: '10:00 AM - 5:00 PM',
      holidays: 'Closed'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.932611749389332,
      longitude: 79.83480099301926
    }
  },

  '11': {
    id: 11,
    name: 'Auro Beach',
    mainImage: '/images/places/auro-beach.jpg',
    description: 'Auro Beach offers a peaceful escape from the city bustle. Known for its clean shores and calm waters, it\'s perfect for swimming and sunbathing. The beach is less crowded compared to other beaches in Pondicherry, making it ideal for those seeking a quiet beach experience.',
    images: [
     '/images/places/auro-beach.jpg',
     '/images/places/auro-beach.jpg',
     '/images/places/auro-beach.jpg',
     '/images/places/auro-beach.jpg'
    ],
    timings: {
      weekdays: '24 Hours',
      weekends: '24 Hours',
      holidays: '24 Hours'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: true },
      { name: 'Restaurant', icon: 'Utensils', available: true },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.946958204479657,
      longitude: 79.83480099301926
    }
  },

  '12': {
    id: 12,
    name: 'Notre Dame Church',
    mainImage: '/images/places/notre-dame.jpg',
    description: 'Notre Dame des Anges (Our Lady of Angels Church) is one of the oldest and most beautiful churches in Pondicherry. Built in the 1855, this pristine white church showcases a blend of French and Catholic architecture. Its serene atmosphere and stunning interior make it a popular destination for both worshippers and tourists.',
    images: [
      '/images/places/notre-dame.jpg',
      '/images/places/notre-dame.jpg',
      '/images/places/notre-dame.jpg',
      '/images/places/notre-dame.jpg'
    ],
    timings: {
      weekdays: '7:00 AM - 6:30 PM',
      weekends: '7:00 AM - 6:30 PM',
      holidays: '7:00 AM - 6:30 PM'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: false },
      { name: 'Photography Allowed', icon: 'Camera', available: true },
    ],
    location: {
      latitude: 11.930465866533465,
      longitude: 79.83577893897064
    }
  },

  '13': {
    id: 13,
    name: 'Romain Rolland Library',
    mainImage: '/images/places/romain-rolland-library.jpg',
    description: 'The Romain Rolland Library, established in 1827, is one of the oldest public libraries in India. This historic building houses a vast collection of French and Tamil literature, along with rare books and documents from the colonial period. The architecture reflects the French colonial style, making it a significant cultural landmark.',
    images: [
      '/images/places/romain-rolland-library.jpg',
      '/images/places/romain-rolland-library.jpg',
      '/images/places/romain-rolland-library.jpg',
      '/images/places/romain-rolland-library.jpg'
    ],
    timings: {
      weekdays: '10:00 AM - 7:00 PM',
      weekends: '10:00 AM - 5:00 PM',
      holidays: 'Closed'
    },
    facilities: [
      { name: 'Parking Available', icon: 'Car', available: true },
      { name: 'Pet Friendly', icon: 'Dog', available: false },
      { name: 'Restaurant', icon: 'Utensils', available: false },
      { name: 'Free Wifi', icon: 'Wifi', available: true },
      { name: 'Photography Allowed', icon: 'Camera', available: false },
    ],
    location: {
      latitude: 11.933893858183889,
      longitude: 79.83333893897064
    }
  }
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

        {/* Timings & Facilities */}
        <div className="mb-8 space-y-8">
          {/* Timings */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-500" />
              Timings
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center gap-10">
                <span className="text-gray-600 w-24">Weekdays</span>
                <span className="font-medium">{place.timings.weekdays}</span>
              </div>
              <div className="flex justify-between items-center gap-10">
                <span className="text-gray-600 w-24">Weekends</span>
                <span className="font-medium">{place.timings.weekends}</span>
              </div>
              {place.timings.holidays && (
                <div className="flex justify-between items-center gap-10">
                  <span className="text-gray-600 w-24">Holidays</span>
                  <span className="font-medium">{place.timings.holidays}</span>
                </div>
              )}

            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {place.facilities.map((facility, index) => {
                let IconComponent;
                switch (facility.icon) {
                  case 'Car': IconComponent = Car; break;
                  case 'Zap': IconComponent = Zap; break;
                  case 'Dog': IconComponent = Dog; break;
                  case 'Coffee': IconComponent = Coffee; break;
                  case 'Wifi': IconComponent = Wifi; break;
                  case 'Camera': IconComponent = Camera; break;
                  case 'Baby': IconComponent = Baby; break;
                  case 'Utensils': IconComponent = Utensils; break;
                  default: IconComponent = Coffee;
                }
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      facility.available 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{facility.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map */}
        {/* <div className="mb-8">
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
        </div> */}
      </div>
    </div>
  );
}