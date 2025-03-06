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
    name: "Rock Beach",
    image: "/images/rock-beach.jpg"
  },
  {
    id: 2,
    name: "White Town",
    image: "/images/wt1.jpg"
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
    name: "Bharathi Park",
    image: "/images/b1.jpg"
  }
];

export function TrendingSection() {
  const router = useRouter();

  const navigateToPlace = (id: number) => {
    router.push(`/dashboard/places/${id}`);
  };


  return (
    <div className="py-3">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex">
          {trendingEvents.map((event, index) => (
            <div 
              key={event.id} 
              onClick={() => navigateToPlace(event.id)} 
              className={`flex flex-col items-center cursor-pointer ${index === 0 ? 'pl-4' : 'pl-3'} ${index !== trendingEvents.length - 1 ? 'pr-3' : 'pr-4'}`}
            >
              <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
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
