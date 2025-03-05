// app/hotels/page.tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Hotel, Star, Stars, MapPin, Eye, TicketCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const hotelCategories = [
  { name: "Top Attractions", icon: Eye },
  { name: "Events", icon: TicketCheck },
];

const popularHotels = [
  {
    id: 1,
    name: "Paradise Beach",
    rating: 4.5,
    location: "Chunnambar",
    image: "/images/places/paradise-beach.jpeg",
  },
  {
    id: 2,
    name: "Rock Beach",
    rating: 4.3,
    location: "Pondicherry Beach",
    image: "/images/places/rock-beach.jpg",
  },
  {
    id: 3,
    name: "Arulmigu Manakula Vinayagar Temple",
    rating: 4.7,
    location: "White Town",
    image: "/images/places/manakula-vinayagar-temple.jpg",
  },
  {
    id: 4,
    name: "The Basilica Sacred heart of Jesus Church",
    rating: 4.2,
    location: "White Town",
    image: "/images/places/basilica-church.jpg",
  },
  {
    id: 5,
    name: "Aurbindo Ashram",
    rating: 4.4,
    location: "ECR Road",
    image: "/images/places/aurbindo-ashram.jpg",
  },
];

const allHotels = [
    {
      id: 6,
      name: "Hotel Atithi",
      rating: 3.9,
      location: "J.N. Street",
      image: "/images/hotels/atithi.jpg",
    },
    {
      id: 7,
      name: "Sunway GRT",
      rating: 4.0,
      location: "Auroville Main Road",
      image: "/images/hotels/sunway.jpg",
    },
    {
      id: 8,
      name: "La Villa",
      rating: 4.4,
      location: "Heritage Town",
      image: "/images/hotels/lavilla.jpg",
    },
    {
      id: 9,
      name: "The Windflower Resort",
      rating: 4.2,
      location: "Periya Mudaliar Chavadi",
      image: "/images/hotels/windflower.jpg",
    },
    {
      id: 10,
      name: "Le Royal Park",
      rating: 3.8,
      location: "Bussy Street",
      image: "/images/hotels/le-royal-park.jpg",
    },
    {
      id: 11,
      name: "Hotel Kailash",
      rating: 3.5,
      location: "S.V. Patel Salai",
      image: "/images/hotels/kailaash.jpg",
    },
    {
      id: 12,
      name: "Anandha Inn",
      rating: 3.7,
      location: "Shivaji Garden",
      image: "/images/hotels/anandha.jpg",
    },
    {
      id: 13,
      name: "Maison Perumal",
      rating: 4.6,
      location: "Tamil Quarter",
      image: "/images/hotels/maison-perumal.jpg",
    },
  ];

export default function HotelsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[250px] md:h-[450px]">
        <Image
          src="/images/places/header-places.png"
          alt="Puducherry Places"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Best places to visit
          </h1>
        </div>
        
        {/* Hotel Categories - Overlapping the Hero Section */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-2 md:gap-2">
              {hotelCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/hotels/category/${category.name.toLowerCase().replace(" ", "-")}`}
                  className="bg-white rounded-lg shadow-md p-3 md:p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
                >
                  <category.icon 
                    className={`h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2 ${index > 0 ? "text-yellow-500" : "text-gray-700"}`} 
                    strokeWidth={1.5}
                  />
                  <span className="text-xs md:text-sm font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to account for the overlapping cards
      <div className="h-16 md:h-20"></div> */}

      {/* Popular Stays */}
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Popular Attractions</h2>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {popularHotels.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
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
                  <h3 className="font-medium text-lg">{hotel.name}</h3>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="ml-1 text-sm">{hotel.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

       {/* All Hotels */}
       <div className="container mx-auto px-4 mt-4">
        <h2 className="text-2xl font-bold mb-4">All Places</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allHotels.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
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
                <h3 className="font-medium text-lg">{hotel.name}</h3>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{hotel.rating}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="ml-1 text-sm">{hotel.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}