/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Attraction, CategoryType, attractionsData } from './attractions-data';

export function AttractionsSection() {
  const [activeTab, setActiveTab] = useState<CategoryType>('food');
  const [attractions, setAttractions] = useState<Attraction[]>(attractionsData[activeTab]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAttractions(attractionsData[activeTab]);
    setCurrentIndex(0);
    setOffsetX(0);
  }, [activeTab]);

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

  const tabs: { id: CategoryType; label: string }[] = [
    { id: 'food', label: 'Food' },
    { id: 'sights', label: 'Sights & Attractions' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'experiences', label: 'Experiences' },
  ];

  return (
    <section className=" pb-6">
      <h2 className="text-xl pl-4 font-semibold mb-4">Popular Attractions</h2>
      <div className="mb-6 pl-4 flex space-x-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto flex space-x-4 p-4">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="w-64 bg-white rounded-lg shadow-md">
              <img src={attraction.imageUrl} alt={attraction.title} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{attraction.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden">
      <div 
        ref={containerRef}
        className="relative h-[400px] w-full max-w-[300px] mx-auto touch-none perspective-1000"
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
      </div>
    </section>
  );
}
