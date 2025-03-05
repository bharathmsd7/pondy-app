"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';
import React from 'react';

interface TrendingEvent {
  id: number;
  name: string;
  image: string;
}

const trendingEvents: TrendingEvent[] = [
  {
    id: 1,
    name: "Botanical Garden",
    image: "/images/botanical-garden.jpg"
  },
  {
    id: 2,
    name: "French Quarter",
    image: "/images/french-quarter.jpg"
  },
  {
    id: 3,
    name: "Auroville",
    image: "/images/auroville.jpg"
  },
  {
    id: 4,
    name: "Paradise Beach",
    image: "/images/paradise-beach.jpg"
  },
  {
    id: 5,
    name: "Rock Beach",
    image: "/images/rock-beach.jpg"
  }
];

export function TrendingSection() {
  const router = useRouter();

  const navigateToPlace = (id: number) => {
    router.push(`/dashboard/places/${id}`);
  };


  return (
    <div className="py-3">
      {/* <h2 className="text-lg font-semibold mb-4 px-4">This weeks trending</h2> */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex">
          {trendingEvents.map((event, index) => (
            <div 
              key={event.id} 
              onClick={() => navigateToPlace(event.id)} 
              className={`flex flex-col items-center cursor-pointer ${index === 0 ? 'pl-4' : 'pl-3'} ${index !== trendingEvents.length - 1 ? 'pr-3' : 'pr-4'}`}
            >
              <div className="relative p-[3px] mb-2 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                <div className="w-16 h-16 rounded-full bg-white p-[2px]">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={event.image} alt="Trending Event" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                </div>
              </div>
              <span className="text-xs text-center">{event.name}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>

    </div>
  );
}
