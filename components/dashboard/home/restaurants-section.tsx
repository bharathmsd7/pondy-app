import React from 'react';
import { Card } from '@/components/ui/card';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
}

const restaurants: Restaurant[] = [
  { id: 1, name: 'Restaurant A', image: '/images/food/food-1.jpg', rating: 4 },
  { id: 2, name: 'Restaurant B', image: '/images/food/food-2.jpg', rating: 5 },
  { id: 3, name: 'Restaurant C', image: '/images/food/food-3.jpg', rating: 3 },
  { id: 4, name: 'Restaurant A', image: '/images/food/food-4.jpg', rating: 4 },
  { id: 5, name: 'Restaurant B', image: '/images/food/food-2.jpg', rating: 5 },
  { id: 6, name: 'Restaurant C', image: '/images/food/food-3.jpg', rating: 3 },
  { id: 7, name: 'Restaurant A', image: '/images/food/food-1.jpg', rating: 4 },
  { id: 8, name: 'Restaurant B', image: '/images/food/food-2.jpg', rating: 5 },
  { id: 9, name: 'Restaurant C', image: '/images/food/food-3.jpg', rating: 3 },
];

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card className="w-64 h-64 flex-shrink-0 relative shadow-lg">
      <div className="relative">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent rounded-lg"> 
          <h3 className="font-semibold text-lg text-white">{restaurant.name}</h3>
          <div className="flex justify-start mt-1">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={`text-yellow-500 ${index < restaurant.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const RestaurantsSection = () => {
  return (
    <>
        <h2 className="text-xl font-semibold mb-1 ml-4">Explore Puducherry&apos;s Restaurants</h2>
        <div className="overflow-x-auto flex space-x-4 p-4">
        {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
        </div>
    </>
    
  );
};
