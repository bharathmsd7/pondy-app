/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Map, { Marker, ViewState, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const categories = ['Beaches', 'Temples', 'Activities', 'Hotels', 'Restaurants'] as const;
type Category = typeof categories[number];

const placesByCategory = {
    Beaches: [
        { name: 'Paradise Beach', area: 'Chunnambar', time: '9am - 5pm', latitude: 11.8882, longitude: 79.8063, image: '/images/paradise-beach.jpg' },
        { name: 'Promenade Beach', area: 'White Town', time: '24/7', latitude: 11.9321, longitude: 79.8351, image: '/images/promenade-beach.jpg' },
        { name: 'Serenity Beach', area: 'Kottakuppam', time: '24/7', latitude: 11.9775, longitude: 79.8530, image: '/images/serenity-beach.jpg' },
        { name: 'Auro Beach', area: 'Auroville', time: '24/7', latitude: 11.9715, longitude: 79.8427, image: '/images/auro-beach.jpg' },
    ],
    Temples: [
        { name: 'Manakula Vinayagar Temple', area: 'White Town', time: '5:30am - 12:30pm & 4pm - 9pm', latitude: 11.9339, longitude: 79.8345, image: '/images/manakula-temple.jpg' },
        { name: 'Varadaraja Perumal Temple', area: 'Heritage Town', time: '6am - 12pm & 4pm - 8pm', latitude: 11.9367, longitude: 79.8308, image: '/images/varadaraja-temple.jpg' },
        { name: 'Vedhapureeswarar Temple', area: 'Heritage Town', time: '6am - 12pm & 4:30pm - 8:30pm', latitude: 11.9330, longitude: 79.8328, image: '/images/vedhapureeswarar-temple.jpg' },
    ],
    Activities: [
        { name: 'Scuba Diving', area: 'Serenity Beach', time: '8am - 4pm', latitude: 11.9775, longitude: 79.8530, image: '/images/scuba.jpg' },
        { name: 'Auroville Meditation Center', area: 'Auroville', time: '9am - 5pm', latitude: 12.0069, longitude: 79.8106, image: '/images/auroville.jpg' },
        { name: 'Boat House', area: 'Chunnambar', time: '9am - 5pm', latitude: 11.8882, longitude: 79.8063, image: '/images/boat-house.jpg' },
    ],
    Hotels: [
        { name: 'La Villa', area: 'White Town', time: '24/7', latitude: 11.9338, longitude: 79.8357, image: '/images/la-villa.jpg' },
        { name: 'Palais de Mahe', area: 'White Town', time: '24/7', latitude: 11.9334, longitude: 79.8361, image: '/images/palais-mahe.jpg' },
        { name: 'The Promenade', area: 'White Town', time: '24/7', latitude: 11.9325, longitude: 79.8361, image: '/images/promenade-hotel.jpg' },
    ],
    Restaurants: [
        { name: 'Carte Blanche', area: 'White Town', time: '12pm - 10pm', latitude: 11.9339, longitude: 79.8357, image: '/images/carte-blanche.jpg' },
        { name: 'La Villa Restaurant', area: 'White Town', time: '12pm - 10pm', latitude: 11.9338, longitude: 79.8357, image: '/images/la-villa-restaurant.jpg' },
        { name: 'Surguru Restaurant', area: 'Heritage Town', time: '7am - 10:30pm', latitude: 11.9367, longitude: 79.8308, image: '/images/surguru.jpg' },
    ],
};

const categoryImages = {
    Beaches: '/images/beach-category.jpg',
    Temples: '/images/temple-category.jpg',
    Activities: '/images/activities-category.jpg',
    Hotels: '/images/hotels-category.jpg',
    Restaurants: '/images/restaurants-category.jpg',
};

const ExplorePage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Beaches');
    const [selectedPlace, setSelectedPlace] = useState<null | {
        name: string;
        area: string;
        time: string;
        latitude: number;
        longitude: number;
        image: string;
    }>(null);
    const [viewState, setViewState] = useState<ViewState>({
        latitude: 11.9416,
        longitude: 79.8083,
        zoom: 12,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    return (
        <div className="flex flex-col h-screen w-screen">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {placesByCategory[selectedCategory].map((place) => (
                    <Marker
                        key={place.name}
                        latitude={place.latitude}
                        longitude={place.longitude}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation();
                            setSelectedPlace(place);
                        }}
                    >
                    </Marker>
                ))}

                {selectedPlace && (
                    <Popup
                        latitude={selectedPlace.latitude}
                        longitude={selectedPlace.longitude}
                        anchor="bottom"
                        onClose={() => setSelectedPlace(null)}
                        closeButton={true}
                    >
                        <div className="p-2 max-w-[200px]">
                            <img src={selectedPlace.image} alt={selectedPlace.name} 
                                className="w-full h-32 object-cover rounded-lg mb-2" />
                            <h3 className="font-bold text-sm">{selectedPlace.name}</h3>
                            <p className="text-sm text-gray-600">{selectedPlace.area}</p>
                            <p className="text-sm text-gray-600">{selectedPlace.time}</p>
                        </div>
                    </Popup>
                )}
            </Map>

            <div className="w-full overflow-x-auto pb-28 md:pb-8 pt-2 px-4 no-scrollbar">
                <div className="flex space-x-4 min-w-min">
                    {categories.map(category => (
                        <div 
                            key={category} 
                            className={`flex-shrink-0 rounded-lg shadow-lg cursor-pointer overflow-hidden
                                relative w-[200px] h-[120px] ${
                                selectedCategory === category ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <img 
                                src={categoryImages[category]} 
                                alt={category}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                <h3 className="font-bold text-lg text-white">{category}</h3>
                                <p className="text-sm text-gray-200">
                                    {placesByCategory[category].length} places
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
