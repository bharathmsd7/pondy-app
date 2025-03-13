"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Bus, Train, CarFront, MapPin, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { RentalPage } from '../rentals/rental-page';

type TabType = 'bus' | 'train' | 'rental' | 'taxi';

export function TransportBooking() {
  const [activeTab, setActiveTab] = useState<TabType>('bus');
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] md:mt-20">
      {/* Tabs */}
      <div className="flex gap-2 pt-4 bg-white border-b">
        <button
          onClick={() => setActiveTab('bus')}
          className={cn(
            'flex-1 py-3 px-4 font-medium text-sm flex flex-col items-center gap-1 relative',
            activeTab === 'bus'
              ? 'text-[#fbc101]'
              : 'text-gray-600'
          )}
        >
          <Bus className="w-7 h-7" />
          Bus
          {activeTab === 'bus' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-lg bg-[#fbc101]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('train')}
          className={cn(
            'flex-1 py-3 px-4 font-medium text-sm flex flex-col items-center gap-1 relative',
            activeTab === 'train'
              ? 'text-[#fbc101]'
              : 'text-gray-600'
          )}
        >
          <Train className="w-7 h-7" />
          Train
          {activeTab === 'train' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-lg bg-[#fbc101]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('rental')}
          className={cn(
            'flex-1 py-3 px-4 font-medium text-sm flex flex-col items-center gap-1 relative',
            activeTab === 'rental'
              ? 'text-[#fbc101]'
              : 'text-gray-600'
          )}
        >
          <CarFront className="w-7 h-7" />
          Rentals
          {activeTab === 'rental' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-lg bg-[#fbc101]" />
          )}
        </button>
        {/* <button
          onClick={() => setActiveTab('taxi')}
          className={cn(
            'flex-1 py-3 px-4 font-medium text-sm flex flex-col items-center gap-1 relative',
            activeTab === 'taxi'
              ? 'text-red-600'
              : 'text-gray-600'
          )}
        >
          <Train className="w-7 h-7" />
          Taxi
          {activeTab === 'taxi' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-lg bg-red-600" />
          )}
        </button> */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === 'bus' && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/transport/bus.png"
                alt="Bus"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
              <div className="absolute top-4 left-4 text-white">
                <h1 className="text-2xl font-bold">Bus Tickets</h1>
                <p className="text-sm mt-1">24x7 customer service (call/chat)</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-4">
              <div>
                <label className="text-sm text-gray-500">From</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Enter city or town"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">To</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Enter city or town"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Date of Journey</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full bg-[#fbc101] text-white hover:bg-[#e5b001]">
                Search buses
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'train' && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/transport/train.png"
                alt="Train"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
              <div className="absolute top-4 left-4 text-white">
                <h1 className="text-2xl font-bold">Train Tickets</h1>
                <p className="text-sm mt-1">Book train tickets easily</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-4">
              {/* Same form structure as bus tickets */}
              <div>
                <label className="text-sm text-gray-500">From</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Enter station"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">To</label>
                <div className="mt-1 flex items-center border rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Enter station"
                    className="border-0 shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Date of Journey</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full bg-[#fbc101] text-white hover:bg-[#e5b001]">
                Search trains
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'rental' && <RentalPage />}
        
      </div>
    </div>
  );
}