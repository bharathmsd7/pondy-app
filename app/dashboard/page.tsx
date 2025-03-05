/* eslint-disable @next/next/no-img-element */
import { Search } from 'lucide-react';
import { TrendingSection } from '@/components/dashboard/home/trending-section';
import { AttractionsSection } from '@/components/dashboard/home/attractions-section';
import { RestaurantsSection } from '@/components/dashboard/home/restaurants-section';
export default function HomePage() {
  return (
    <div className="flex flex-col h-full bg-[#fafaf9]">
      {/* Header */}
      <header className="flex justify-between items-center px-4 pt-4">
        <div className="w-36 h-8 bg-gray-200 rounded flex items-center justify-center">
          <img src="/logo/visit-puducherry.png" alt="Logo" />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-6 h-6" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto mb-20">
        <TrendingSection />
        <AttractionsSection />
        <RestaurantsSection />
      </main>
    </div>
  );
}