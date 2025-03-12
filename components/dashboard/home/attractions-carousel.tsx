"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CategoryType, attractionsData } from './attractions-data';
import { FavoriteButton } from './favorite-button';

export const AttractionsCarousel = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('food');
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = attractionsData[activeCategory];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [items.length, activeCategory]);

  return (
    <div className="w-full overflow-hidden bg-gray-50 mb-4">
      {/* Category Selector remains the same */}
      <div className="flex gap-4 mb-4 overflow-x-auto pb-1 pl-4 no-scrollbar">
        {Object.keys(attractionsData).map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category as CategoryType);
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden px-4">
        <div className="flex justify-center">
          <motion.div 
            className="flex gap-2"
            animate={{
              x: `calc(50% - ${currentIndex * (300 + 16)}px - 150px)`
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {items.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                animate={{
                  scale: currentIndex === index ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="min-w-[300px] h-[250px] rounded-xl relative"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-xl"
                  style={{ backgroundImage: `url(${attraction.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
                <FavoriteButton
                  isFavorite={attraction.isFavorite || false}
                  onToggle={() => {}}
                  className="absolute top-2 right-2 text-white backdrop-blur-md"
                />
                <div className="absolute bottom-0 m-2 px-2 py-1 backdrop-blur-md rounded-lg">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {attraction.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full ${
                currentIndex === index ? 'w-6 bg-primary' : 'w-2 bg-gray-300'
              }`}
              animate={{
                width: currentIndex === index ? 24 : 8,
              }}
              transition={{
                duration: 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};