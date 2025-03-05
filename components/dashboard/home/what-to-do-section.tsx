"use client";

import { useRouter } from 'next/navigation';

interface ActivityCard {
  id: string;
  title: string;
  image: string;
  link: string;
}

const activities: ActivityCard[] = [
  {
    id: '1',
    title: 'Activities',
    image: '/activities/scuba-diving.jpg',
    link: '/dashboard/activities'
  },
  {
    id: '2',
    title: 'Day out',
    image: '/activities/day-out.jpg',
    link: '/dashboard/activities'
  },
  {
    id: '3',
    title: 'Tours',
    image: '/activities/tours.jpg',
    link: '/dashboard/activities'
  },
  {
    id: '4',
    title: 'Featured Events',
    image: '/activities/events.jpg',
    link: '/dashboard/activities'
  }
];

export function WhatToDoSection() {
  const router = useRouter();

  return (
    <section className="px-4 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">What to Do</h2>
        <button
          onClick={() => router.push('/dashboard/activities')}
          className="text-orange-500 text-sm font-medium hover:text-orange-600"
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => router.push(activity.link)}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-lg font-semibold">{activity.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}