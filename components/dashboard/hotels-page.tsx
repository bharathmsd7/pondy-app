"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
    Star, 
    MapPin, 
    CalendarIcon, 
    Users, 
    SlidersHorizontal, 
    X, 
    Wifi, 
    Car, 
    UtensilsCrossed, 
    Dumbbell, 
    Wind, 
    Wine,
    Waves,
    User,
    IndianRupee
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { popularHotels, allHotels } from "@/app/lib/data/hotels";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

export function HotelsPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const amenitiesList = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "parking", label: "Parking", icon: Car },
    { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
    { id: "gym", label: "Fitness Center", icon: Dumbbell },
    { id: "spa", label: "Spa", icon: User },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "bar", label: "Bar", icon: Wine },
  ];
  
  <div className="space-y-4">
    <h3 className="font-semibold">Amenities</h3>
    <div className="grid grid-cols-2 gap-2">
      {amenitiesList.map((amenity) => {
        const Icon = amenity.icon;
        const isSelected = selectedAmenities.includes(amenity.id);
        
        return (
          <Button
            key={amenity.id}
            variant={isSelected ? "default" : "outline"}
            className="flex items-center justify-start gap-2 h-auto py-3"
            onClick={() => {
              if (isSelected) {
                setSelectedAmenities(selectedAmenities.filter(id => id !== amenity.id));
              } else {
                setSelectedAmenities([...selectedAmenities, amenity.id]);
              }
            }}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{amenity.label}</span>
          </Button>
        );
      })}
    </div>
  </div>
  const sortOptions = [
    { id: "relevance", label: "Relevance" },
    { id: "price-low", label: "Price - Low to high" },
    { id: "price-high", label: "Price - High to low" },
    { id: "rating", label: "Best rated first" },
  ];
  const [guests, setGuests] = useState("1");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const shuffleArray = (array: typeof allHotels) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const isSearchEnabled = dateRange?.from && dateRange?.to && guests;

  return (
    <main className="min-h-screen mb-2">
      {!isSearching ? (
        // Original Hero Section
        <div className="relative h-[100px] md:h-[250px] backdrop-blur-sm">
          <Image
            src="/images/hotels/header.jpg"
            alt="Puducherry Hotels"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Book your hotel
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold m-3">Book your hotel</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-5">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span>
                    {format(dateRange!.from!, "LLL dd")} -{" "}
                    {format(dateRange!.to!, "LLL dd, y")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSearching(false)}
                >
                  Modify
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      {!isSearching && (
        <div className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Check-in and Check-out Date */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Select Dates
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select No. of Guests
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Number of guests" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button 
                className="w-full" 
                onClick={handleSearch}
                disabled={!isSearchEnabled}
              >
                Search Hotels
              </Button>
            </div>
          </div>
        </div>
      )}  

      {!isSearching ? (
        <>
          {/* Popular Stays */}
          <div className="container mx-auto px-4 mt-4">
            <h2 className="text-2xl font-bold mb-4">Popular Stays</h2>

            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {popularHotels.map((hotel) => (
                  <Link
                    key={hotel.id}
                    href={`/dashboard/hotels/${hotel.id}`}
                    className="w-[280px] shrink-0 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[180px] w-full">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{hotel.name}</h3>
                        <span className="text-base font-bold bg-gray-50 px-2.5 py-1 rounded-lg flex items-center">
                          <IndianRupee className="h-4 w-4 mr-0.5" />
                          {hotel.price}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="ml-1 text-sm">{hotel.location}</span>
                      </div>
                      <Button 
                        className="w-full mt-3 text-white" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add booking logic here
                        }}
                      >
                        Book
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>

          {/* All Hotels */}
          <div className="container mx-auto px-4 mt-4">
            <h2 className="text-2xl font-bold mb-4">All Hotels</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allHotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/dashboard/hotels/${hotel.id}`}
                  className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[180px] w-full">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{hotel.name}</h3>
                      <span className="text-base font-bold bg-gray-50 px-2.5 py-1 rounded-lg flex items-center">
                        <IndianRupee className="h-4 w-4 mr-0.5" />
                        {hotel.price}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span className="ml-1 text-sm">{hotel.location}</span>
                    </div>
                    <Button 
                      className="w-full mt-3 text-white" 
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add booking logic here
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="container mx-auto px-4 mt-4">
          <div className="flex gap-1 mb-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-fit gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filter Hotels</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Sort by</h3>
                    <Select value={selectedSort} onValueChange={setSelectedSort}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sort option" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map((amenity) => {
                        const Icon = amenity.icon;
                        const isSelected = selectedAmenities.includes(amenity.id);
                        
                        return (
                          <Button
                            key={amenity.id}
                            variant={isSelected ? "default" : "outline"}
                            className="flex items-center justify-start gap-2 h-auto py-3"
                            onClick={() => {
                              if (isSelected) {
                                setSelectedAmenities(selectedAmenities.filter(id => id !== amenity.id));
                              } else {
                                setSelectedAmenities([...selectedAmenities, amenity.id]);
                              }
                            }}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{amenity.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Star Rating</h3>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                          {rating} <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-6 sticky bottom-0 bg-white p-4 border-t">
                  <Button variant="outline" onClick={() => {
                    setSelectedAmenities([]);
                    setSelectedSort("relevance");
                  }}>
                    Clear all
                  </Button>
                  <Button className="flex-1" onClick={() => setIsSheetOpen(false)}>
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {selectedAmenities.length > 0 && (
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-4">
                  {selectedAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant="secondary"
                      size="sm"
                      className="rounded-full shrink-0"
                      onClick={() => setSelectedAmenities(selectedAmenities.filter(id => id !== amenity))}
                    >
                      {amenitiesList.find(a => a.id === amenity)?.label}
                      <X className="h-4 w-4 ml-2" />
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
            )}
          </div>

          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shuffleArray(allHotels).map((hotel) => (
              <Link
                key={hotel.id}
                href={`/dashboard/hotels/${hotel.id}`}
                className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[180px] w-full">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{hotel.name}</h3>
                    <span className="text-base font-bold bg-gray-50 px-2.5 py-1 rounded-lg flex items-center">
                      <IndianRupee className="h-4 w-4 mr-0.5" />
                      {hotel.price}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="ml-1 text-sm">{hotel.location}</span>
                  </div>
                  <Button 
                    className="w-full mt-3 text-white" 
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add booking logic here
                    }}
                  >
                    Book
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
