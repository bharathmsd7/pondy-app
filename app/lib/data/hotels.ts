import { Hotel, Stars } from "lucide-react";

export interface HotelCategory {
  name: string;
  icon: any; // Using any for Lucide icons type
}

export interface Hotel {
  id: number;
  name: string;
  rating: number;
  location: string;
  image: string;
  price?: number;
  description?: string;
}

export const hotelCategories: HotelCategory[] = [
  { name: "All types", icon: Hotel },
  { name: "Two Star", icon: Stars },
  { name: "Three Star", icon: Stars },
  { name: "Four Star", icon: Stars },
];

export const popularHotels: Hotel[] = [
  {
    id: 1,
    name: "Le Pondy Resort",
    rating: 4.5,
    location: "Pondicherry Beach",
    image: "/images/hotels/le-pondy.jpg",
    price: 4900,
  },
  {
    id: 2,
    name: "Villa Shanti",
    rating: 4.3,
    location: "French Quarter",
    image: "/images/hotels/villa-shanti.jpeg",
    price: 1850,
  },
  {
    id: 3,
    name: "Palais de Mahe",
    rating: 4.7,
    location: "White Town",
    image: "/images/hotels/palais-de-mahe.jpg",
    price: 2200,
  },
  {
    id: 4,
    name: "The Promenade",
    rating: 4.2,
    location: "Rock Beach",
    image: "/images/hotels/the-promenade.jpg",
    price: 5950,
  },
  {
    id: 5,
    name: "Ocean Spray",
    rating: 4.4,
    location: "ECR Road",
    image: "/images/hotels/ocean-spray.jpg",
    price: 4100,
  },
];

export const allHotels: Hotel[] = [
  {
    id: 6,
    name: "Hotel Atithi",
    rating: 3.9,
    location: "J.N. Street",
    image: "/images/hotels/hotel-atithi.jpg",
    price: 3750,
  },
  {
    id: 7,
    name: "Sunway GRT",
    rating: 4.0,
    location: "Auroville Main Road",
    image: "/images/hotels/sunway-grt.jpg",
    price: 6800,
  },
  {
    id: 8,
    name: "La Villa",
    rating: 4.4,
    location: "Heritage Town",
    image: "/images/hotels/la-villa.jpg",
    price: 4950,
  },
  {
    id: 10,
    name: "Le Royal Park",
    rating: 3.8,
    location: "Bussy Street",
    image: "/images/hotels/le-royal-park.jpg",
    price: 5700,
  },
  {
    id: 11,
    name: "Hotel Kailash",
    rating: 3.5,
    location: "S.V. Patel Salai",
    image: "/images/hotels/hotel-kailash.jpg",
    price: 5600,
  },
  {
    id: 12,
    name: "Anandha Inn",
    rating: 3.7,
    location: "Shivaji Garden",
    image: "/images/hotels/anandha-inn.jpg",
    price: 5650,
  },
  {
    id: 13,
    name: "Maison Perumal",
    rating: 4.6,
    location: "Tamil Quarter",
    image: "/images/hotels/maison-perumal.jpg",
    price: 5000,
  },
];

export const getHotelById = (id: number): Hotel | undefined => {
  return [...popularHotels, ...allHotels].find(hotel => hotel.id === id);
}; 