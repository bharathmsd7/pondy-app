"use client";
import { useState } from 'react';
import Image from 'next/image';
import { CalendarIcon, CarFront, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

type TabType = 'rent' | 'taxi';

export function RentalPage() {
  const [activeTab, setActiveTab] = useState<TabType>('rent');
  const [showResults, setShowResults] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>();

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] mb-12">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[200px]">
        <Image
          src={`/images/rentals/${activeTab === 'rent' ? 'rent-a-car' : 'taxi-service'}.jpg`}
          alt="Transport"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        
        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Transport
          </h1>
        </div>

        {/* Tabs */}
        <div className="absolute bottom-0 left-0 right-0 px-4">
          <div className="flex gap-2 max-w-md mx-auto -mb-12">
            <button
              onClick={() => setActiveTab('rent')}
              className={cn(
                'flex-1 py-4 px-6 rounded-t-lg font-medium text-sm',
                activeTab === 'rent'
                  ? 'bg-white text-black'
                  : 'bg-black/80 text-white'
              )}
            >
              <CarFront className="w-5 h-5 mx-auto mb-1" />
              Rent a Car
            </button>
            <button
              onClick={() => setActiveTab('taxi')}
              className={cn(
                'flex-1 py-4 px-6 rounded-t-lg font-medium text-sm',
                activeTab === 'taxi'
                  ? 'bg-white text-black'
                  : 'bg-black/80 text-white'
              )}
            >
              <CarFront className="w-5 h-5 mx-auto mb-1" />
              Taxi Service
            </button>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="flex-1 px-4 pt-12 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
          {activeTab === 'rent' ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Pick-up & drop-off location</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-1">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Railway Station"
                    className="border-0 shadow-none focus-visible:ring-0 p-0 font-normal"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-1 justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-1 justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full text-white"
              >
                Search
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Pick Me From</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-1">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Airport"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Drop Me To</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-1">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="White Town"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Pick-up Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-1 justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Pick-up Time</label>
                  <Input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full text-white"
              >
                Search
              </Button>
            </div>
          )}
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mt-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              {activeTab === 'rent' ? 'Select the vehicle of your choice' : 'Taxis available for your route'}
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="relative w-32 h-24 rounded-lg">
                  <Image
                    src={activeTab === 'rent' ? '/images/rentals/i10.png' : '/images/rentals/swift-dzire.png'}
                    alt="Car"
                    height={120}
                    width={130}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium">{activeTab === 'rent' ? 'Grand i10' : 'Swift Dzire'}</h3>
                  {activeTab === 'rent' ? (
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">5 Seater</span>
                      <span>AC</span>
                      <span>Petrol</span>
                      <span>Manual</span>
                    </div>
                  ) : (
                    <div className="flex gap-6 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                          <CarFront className="w-4 h-4 text-gray-700" />
                        </span>
                        <span className="text-sm">4</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                          <CarFront className="w-4 h-4 text-gray-700" />
                        </span>
                        <span className="text-sm">4</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Prices from</span>
                  <div className="font-semibold">₹ {activeTab === 'rent' ? '1000/day' : '1540'}</div>
                </div>
                <Button className="text-white">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}