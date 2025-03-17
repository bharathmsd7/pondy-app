"use client";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import Image from "next/image";

interface BusListingsProps {
  fromCity: string;
  toCity: string;
  date: Date | undefined;
  onBack: () => void; 
}

const busOperators = [
    {
      name: 'PRTC',
      totalBuses: '20 Buses',
      price: '₹180',
      logo: '/transport/prtc-logo.png'
    }
];

const buses = [
    {
      operator: "TNSTC",
      type: "A/C Sleeper",
      name: 'Tamil Nadu Express',
      startTime: "21:00",
      endTime: "05:30",
      duration: "8h 30m",
      seats: "36 Seats",
      rating: 4.5,
      reviews: 850,
      price: 650,
      originalPrice: 750,
    },
    {
      operator: "TNSTC",
      type: "Non A/C Seater",
      name: 'TN State Transport',
      startTime: "08:00",
      endTime: "12:30",
      duration: "4h 30m",
      seats: "45 Seats",
      rating: 4.0,
      reviews: 620,
      price: 165,
      originalPrice: 180,
    },
    {
      operator: "SETC",
      type: "A/C Seater",
      name: 'State Express',
      startTime: "15:30",
      endTime: "20:00",
      duration: "4h 30m",
      seats: "40 Seats",
      rating: 4.3,
      reviews: 560,
      price: 195,
      originalPrice: 220,
    },
    {
      operator: "SETC",
      type: "A/C Sleeper",
      name: 'State Express Premium',
      startTime: "23:00",
      endTime: "05:30",
      duration: "6h 30m",
      seats: "32 Seats",
      rating: 4.4,
      reviews: 480,
      price: 450,
      originalPrice: 500,
    },
    {
      operator: "SRM Travels",
      type: "A/C Sleeper",
      name: 'SRM Premium',
      startTime: "22:00",
      endTime: "06:00",
      duration: "8h",
      seats: "32 Seats",
      rating: 4.6,
      reviews: 920,
      price: 850,
      originalPrice: 999,
    },
    {
      operator: "SRM Travels",
      type: "A/C Seater",
      name: 'SRM Express',
      startTime: "16:30",
      endTime: "21:00",
      duration: "4h 30m",
      seats: "36 Seats",
      rating: 4.5,
      reviews: 750,
      price: 450,
      originalPrice: 500,
    }
];

export function BusListings({ fromCity, toCity, date, onBack }: BusListingsProps) {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center flex-1">
            <button 
              onClick={onBack}
              className="p-1 -ml-1 mr-3"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1 text-base">
              <span className="font-medium">{fromCity}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{toCity}</span>
            </div>
          </div>
          <div className="bg-pink-50 px-3 py-1 rounded-full">
            <p className="text-sm text-gray-600">
              {date?.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'short'
              })} <span className="text-gray-400">•</span> {date?.toLocaleDateString('en-US', { 
                weekday: 'short'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Bus Listings */}
      <div className="p-4 space-y-4 pb-20 md:max-w-4xl md:mx-auto">
        {/* PRTC Buses Section */}
        {/* Bus Operators Stack */}
        <div className="space-y-3">
          {busOperators.map((operator, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm overflow-hidden relative"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                transform: 'perspective(1000px)',
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={operator.logo}
                      alt={operator.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{operator.name}</h3>
                        <span className="text-gray-500 text-sm">({operator.totalBuses})</span>
                      </div>
                      <p className="text-sm font-medium">From {operator.price}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Individual Bus Cards section remains the same */}
        {buses.map((bus, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 space-y-4">
              {/* Bus Info */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{bus.startTime}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold">{bus.endTime}</span>
                  </div>
                  <p className="text-sm text-gray-500">{bus.duration} • {bus.seats}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">₹{bus.price}</div>
                  <div className="text-sm text-gray-500 line-through">₹{bus.originalPrice}</div>
                </div>
              </div>

              {/* Bus Type & Rating */}
                  <span className="text-md text-black text-base">
                    {bus.type}
                  </span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-md text-black text-base">
                    {bus.operator}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-green-600 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{bus.rating}</span>
                </div>
              </div>

              {/* Route Info */}
              {/* <div className="text-sm text-gray-500">
                <p>From: {bus.from}</p>
                <p>To: {bus.to}</p>
                <p>{bus.stops}</p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}