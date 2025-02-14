import { Search } from 'lucide-react';
import { TrendingSection } from '@/components/trending-section';
import { AttractionsSection } from '@/components/attractions-section';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full bg-[#fafaf9]">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-xs text-gray-500">Logo</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-6 h-6" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <TrendingSection />
        <AttractionsSection />
      </main>
    </div>
  );
}