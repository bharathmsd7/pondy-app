/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Attraction, attractionsData } from './attractions-data';

export function AttractionsSection() {
  const [attractions, setAttractions] = useState<Attraction[]>(attractionsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - offsetX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newOffsetX = clientX - startX;
    setOffsetX(newOffsetX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(offsetX) > 100) { // Threshold for swipe
      if (offsetX > 0) {
        // Swipe right - go to previous or wrap to end
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : attractions.length - 1);
      } else {
        // Swipe left - go to next or wrap to beginning
        setCurrentIndex(currentIndex < attractions.length - 1 ? currentIndex + 1 : 0);
      }
    }
    setOffsetX(0);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttractions(attractions.map(attraction => 
      attraction.id === id 
        ? { ...attraction, isFavorite: !attraction.isFavorite }
        : attraction
    ));
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Popular Attractions</h2>
      <div 
        ref={containerRef}
        className="relative  h-[400px] w-full max-w-[300px] mx-auto touch-none perspective-1000"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {attractions.map((attraction, index) => {
          // Calculate the shortest distance to the current index considering wrap-around
          const distance = Math.min(
            Math.abs(index - currentIndex),
            Math.abs(index - currentIndex - attractions.length),
            Math.abs(index - currentIndex + attractions.length)
          );

          const isCurrentCard = index === currentIndex;
          
          // Show all cards in the stack
          const maxVisibleCards = 5;
          if (distance >= maxVisibleCards) return null;

          const offset = 20; // pixels to offset each card horizontally
          
          const cardStyle = {
            transform: `
              translateX(${isCurrentCard ? offsetX : distance * offset}px)
              scale(${isCurrentCard ? 1 : 0.98})
            `,
            zIndex: attractions.length - distance,
          };

          return (
            <div
              key={attraction.id}
              className="absolute inset-0 w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-out"
              style={cardStyle}
            >
              <div className="relative h-full">
                <img
                  src={attraction.imageUrl}
                  alt={attraction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={(e) => toggleFavorite(attraction.id, e)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      attraction.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 inset-x-4 flex justify-between items-center">
                  <h3 className="text-white text-xl font-semibold">{attraction.title}</h3>
                  <button
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <ArrowRight className="text-white w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
