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

// Update the TabType and add VehicleType
type TabType = 'rent' | 'taxi';
type VehicleType = 'car' | 'bike';

interface RentalPageProps {
  defaultTab?: 'rent' | 'taxi';
}

// Add this interface near the top with other types
interface VehicleInfo {
  name: string;
  image: string;
  specs: string[];
  price: string;
}

export function RentalPage({ defaultTab = 'rent' }: RentalPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [showResults, setShowResults] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>();

  const carOptions: VehicleInfo[] = [
    {
      name: 'Creta',
      image: '/images/rentals/Creta.png',
      specs: ['5 Seater', 'AC', 'Petrol', 'Manual'],
      price: '2500/day'
    },
    {
      name: 'Grandi10',
      image: '/images/rentals/Grandi10.png',
      specs: ['5 Seater', 'AC', 'Petrol', 'Manual'],
      price: '1200/day'
    },
    {
      name: 'i10',
      image: '/images/rentals/i10.png',
      specs: ['5 Seater', 'AC', 'Petrol', 'Manual'],
      price: '1000/day'
    },
    {
      name: 'Innova Crysta',
      image: '/images/rentals/InnovaCrysta.png',
      specs: ['7 Seater', 'AC', 'Diesel', 'Automatic'],
      price: '3000/day'
    }
  ];

  const bikeOptions: VehicleInfo[] = [
    {
      name: 'Vespa',
      image: '/images/rentals/vespa.png',
      specs: ['Petrol', 'Automatic'],
      price: '500/day'
    },
    {
      name: 'Classic 500',
      image: '/images/rentals/royal-enfield-classic-500.png',
      specs: ['Petrol', 'Manual'],
      price: '800/day'
    },
    {
      name: 'Access',
      image: '/images/rentals/access.png',
      specs: ['Petrol', 'Automatic'],
      price: '300/day'
    },
    {
      name: 'Activa',
      image: '/images/rentals/activa.png',
      specs: ['Petrol', 'Automatic'],
      price: '300/day'
    },
    {
      name: 'Jawa',
      image: '/images/rentals/jawa.png',
      specs: ['Petrol', 'Manual'],
      price: '700/day'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] mb-12">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[200px] rounded-lg">
        {/* <Image
          src={`/images/rentals/${activeTab === 'rent' ? 'rent-a-car' : 'taxi-service'}.jpg`}
          alt="Transport"
          fill
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 rounded-lg" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Transport
          </h1>
        </div> */}
        <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
                src="/transport/rent-a-car.jpg"
                alt="Bus"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
            <div className="absolute top-4 left-4 text-white">
                <h1 className="text-2xl font-bold">Rent a vehicle</h1>
                <p className="text-sm mt-1">Rent or book taxi</p>
            </div>
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
              Rent
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
          {/* Vehicle Type Selector */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-2 block">Vehicle Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setVehicleType('car')}
                className={cn(
                  'py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  vehicleType === 'car'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Car
              </button>
              <button
                onClick={() => setVehicleType('bike')}
                className={cn(
                  'py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  vehicleType === 'bike'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Bike
              </button>
            </div>
          </div>

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
                        {startDate ? format(startDate, "MMM d") : "Pick a date"}
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
                        {endDate ? format(endDate, "MMM d") : "Pick a date"}
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
            <div className="space-y-4">
              {activeTab === 'rent' && (vehicleType === 'car' ? carOptions : bikeOptions).map((vehicle, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="relative w-32 h-24 rounded-lg">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        height={120}
                        width={130}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium">{vehicle.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                        {vehicle.specs.map((spec, idx) => (
                          <span key={idx}>{spec}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Prices from</span>
                      <div className="font-semibold">₹ {vehicle.price}</div>
                    </div>
                    <Button className="text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
              {activeTab === 'taxi' && (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <CarFront className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}