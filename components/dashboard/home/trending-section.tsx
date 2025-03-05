"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import React, { useState } from 'react';

interface TrendingEvent {
  id: number;
  name: string;
  image: string;
}

const trendingEvents: TrendingEvent[] = [
  {
    id: 1,
    name: "Flower Show",
    image: "/images/botanical-garden.jpg"
  },
  {
    id: 2,
    name: "New year",
    image: "/images/french-quarter.jpg"
  },
  {
    id: 3,
    name: "Car Show",
    image: "/images/auroville.jpg"
  },
  {
    id: 4,
    name: "Mike Chen",
    image: "/images/paradise-beach.jpg"
  },
  {
    id: 5,
    name: "Lisa Kumar",
    image: "/images/french-quarter.jpg"
  },
  {
    id: 6,
    name: "Lisa Kumar",
    image: "/images/auroville.jpg"
  },
  {
    id: 7,
    name: "Lisa Kumar",
    image: "/images/rock-beach.jpg"
  }
];

export function TrendingSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };


  return (
    <div className="py-3">
      {/* <h2 className="text-lg font-semibold mb-4 px-4">This weeks trending</h2> */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex">
          {trendingEvents.map((event, index) => (
            <div 
              key={event.id} 
              onClick={() => openModal(event.image)} 
              className={`flex flex-col items-center cursor-pointer ${index === 0 ? 'pl-4' : 'pl-3'} ${index !== trendingEvents.length - 1 ? 'pr-3' : 'pr-4'}`}
            >
              <div className="relative p-[3px] mb-2 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                <div className="w-16 h-16 rounded-full bg-white p-[2px]">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={event.image} alt="Trending Event" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                </div>
              </div>
              <span className="text-sm text-center">{event.name}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogOverlay className="fixed inset-0" />
        <DialogTitle></DialogTitle>
        <DialogContent className="w-full h-full overflow-hidden p-0">
          <img src={selectedImage} alt="Full Screen" className="w-full h-full object-cover" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
