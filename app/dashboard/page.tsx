/* eslint-disable @next/next/no-img-element */
// import { AttractionsSection } from '@/components/dashboard/home/attractions-section';
import { RestaurantsSection } from '@/components/dashboard/home/restaurants-section';
import { WhatToDoSection } from '@/components/dashboard/home/what-to-do-section';
import { ProfileDrawer } from '@/components/dashboard/profile/profile-drawer';
import { SearchBar } from '@/components/dashboard/search/search-bar';
import { AttractionsCarousel } from '@/components/dashboard/home/attractions-carousel';
import { QuickActions } from '@/components/dashboard/home/quick-actions';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full bg-[#fafaf9]">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="w-40 h-10 bg-gray-200 rounded flex items-center justify-center">
          <img src="/logo/visit-puducherry.png" alt="Logo" />
        </div>
        <ProfileDrawer>
          <button className="w-12 h-12 rounded-full overflow-hidden">
            <img src="/icons/avatar.png" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </ProfileDrawer>
      </header>

      {/* Rest of the content remains the same */}
      <main className="flex-1 overflow-auto mb-20">
        <SearchBar />
        <QuickActions />
        <AttractionsCarousel />
        <WhatToDoSection />
        <RestaurantsSection />
      </main>
    </div>
  );
}