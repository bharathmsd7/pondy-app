/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchItem {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'activity';
  image?: string;
}

// This is mock data - replace with your actual data or API call
const mockSearchData: SearchItem[] = [
  { id: '1', name: 'Paradise Beach', type: 'attraction', image: '/images/paradise-beach.jpg' },
  { id: '2', name: 'Le Cafe', type: 'restaurant', image: '/images/le-cafe.jpg' },
  { id: '3', name: 'Promenade Hotel', type: 'hotel', image: '/images/promenade.jpg' },
  // Add more items....
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length >= 3) {
      // Filter mock data - replace with actual API call
      const filtered = mockSearchData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: SearchItem) => {
    setIsOpen(false);
    // Navigate based on item type
    switch (item.type) {
      case 'hotel':
        router.push(`/hotels/${item.id}`);
        break;
      case 'restaurant':
        router.push(`/restaurants/${item.id}`);
        break;
      case 'attraction':
        router.push(`/attractions/${item.id}`);
        break;
      default:
        router.push(`/search?q=${item.name}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative m-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search places, hotels, restaurants..."
          className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-md object-cover mr-3"
                />
              )}
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500 capitalize">{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}