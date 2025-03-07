import { getHotelById } from "@/app/lib/data/hotels";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Heart, Share, ChevronLeft, Wifi, Coffee, UtensilsCrossed, Flower2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function HotelDetailPage({ params }: Props) {
  // Make the function async and await the params
  const { id } = await params;
  const hotel = getHotelById(Number(id));

  if (!hotel) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Main Image Section */}
      <div className="relative w-full">
        <Image 
          src={hotel.image}
          alt={hotel.name}
          width={400}
          height={320}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Link href="/dashboard/hotels">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/90 shadow-sm">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/90 shadow-sm">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/90 shadow-sm">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Rest of your component remains unchanged */}
      {/* Hotel Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl font-semibold">{hotel.name}</h1>
          <div className="text-right">
            <span className="font-bold">${hotel.price || 900}</span>
            <span className="text-sm text-gray-500">/night</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{hotel.rating}</span>
            <span className="text-sm text-gray-500">(1,092 Reviews)</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-500">{hotel.location}</span>
        </div>

        {/* Amenities Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Amenities</h2>
            <Button variant="link" size="sm" className="text-sm font-medium text-gray-500 p-0">
              View All
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-16">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Coffee className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Caffe</span>
            </div>
            <div className="flex flex-col items-center min-w-16">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <UtensilsCrossed className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Restaurant</span>
            </div>
            <div className="flex flex-col items-center min-w-16">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Flower2 className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Garden</span>
            </div>
            <div className="flex flex-col items-center min-w-16">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Flower2 className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Flower2 Course</span>
            </div>
            <div className="flex flex-col items-center min-w-16">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Wifi className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Free Wifi</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <h2 className="text-md font-semibold mb-2">Descriptions</h2>
          <p className="text-sm text-gray-600">
            Escape To Sao Pulo Hotel, A Tranquil Oasis Inspired By The Lush Landscapes And Culture Of Ubud, Bali. Experience Serenity In The Heart Of Vibrant Brazil.
          </p>
        </div>

        {/* Gallery Section */}
        <div>
          <h2 className="text-md font-semibold mb-2">Gallery</h2>
          <div className="grid grid-cols-4 gap-2">
            <img src="/api/placeholder/100/80" alt="Hotel interior" className="rounded-md object-cover h-16 w-full" />
            <img src="/api/placeholder/100/80" alt="Hotel interior" className="rounded-md object-cover h-16 w-full" />
            <img src="/api/placeholder/100/80" alt="Hotel interior" className="rounded-md object-cover h-16 w-full" />
            <img src="/api/placeholder/100/80" alt="Hotel interior" className="rounded-md object-cover h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}