"use client";

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Bird Watching',
    description: 'Odisha is home to more than 400 species of birds, one of the best bird watching destinations in India.',
    image: '/images/places/bird-watching.jpg',
    category: 'Activities'
  },
  {
    id: '2',
    title: 'Temple Walk',
    description: 'With temples almost at every bend, each concealing an anecdote of history.',
    image: '/images/places/temple-walk.jpg',
    category: 'Discover'
  }
];

const tabs = [
  'Activities',
  'Discover',
  'Day out',
  'Foods',
  'Tours',
  'Sightseeing',
  'Featured Events',
  'Explore Puducherry'
];

export default function ActivitiesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Activities');

  const filteredActivities = activities.filter(activity => activity.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <img
          src="/images/places/activities-hero.jpg"
          alt="Activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold text-white">What to do</h1>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-4 relative whitespace-nowrap ${activeTab === tab ? 'text-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => router.push(`/dashboard/places/${activity.id}`)}
            >
              <div className="relative aspect-video">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}