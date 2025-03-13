"use client";

import { Hotel, Compass, Car, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    { icon: Hotel, text: "Hotels", color: "text-orange-500", path: "/dashboard/hotels" },
    { icon: Compass, text: "Explore", color: "text-orange-500", path: "/dashboard/explore" },
    { icon: Car, text: "Rentals", color: "text-orange-500", path: "/dashboard/rentals" },
    { icon: MapPin, text: "Places", color: "text-orange-500", path: "/dashboard/places" },
  ];

  return (
    <div className="px-4 pb-6 pt-1">
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                onClick={() => router.push(action.path)}
                className="w-20 h-20 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95"
              >
                <Icon size={22} className={action.color} />
                <span className="text-xs text-gray-600">
                  {action.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}