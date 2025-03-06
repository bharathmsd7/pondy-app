/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Map, { Marker, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const popularPlaces = [
    { name: 'Rock Beach', area: 'White Town', time: '6am -10pm', latitude: 11.9334, longitude: 79.8143, image: '/images/auroville.jpg' },
    { name: 'Sand Beach', area: 'Black Town', time: '6am -10pm', latitude: 11.1234, longitude: 79.1233, image: '/images/auroville.jpg' },
    { name: 'RockBeach', area: 'White Town', time: '6am -10pm', latitude: 11.9334, longitude: 79.8143, image: '/images/auroville.jpg' },
    { name: 'Sand each', area: 'Black Town', time: '6am -10pm', latitude: 11.1234, longitude: 79.1233, image: '/images/auroville.jpg' },
    { name: 'Rock Bach', area: 'White Town', time: '6am -10pm', latitude: 11.9334, longitude: 79.8143, image: '/images/auroville.jpg' },
    { name: 'Sand Bech', area: 'Black Town', time: '6am -10pm', latitude: 11.1234, longitude: 79.1233, image: '/images/auroville.jpg' },
];

const ExplorePage = () => {
    const [viewState, setViewState] = useState<ViewState>({
        latitude: popularPlaces[0].latitude,
        longitude: popularPlaces[0].longitude,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    const [selectedPlace, setSelectedPlace] = useState(popularPlaces[0]);

    const handlePlaceClick = (place: typeof popularPlaces[0]) => {
        setSelectedPlace(place);
        setViewState({
            ...viewState,
            latitude: place.latitude,
            longitude: place.longitude,
        });
    };

    return (
        <div className="flex flex-col h-screen w-screen">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {popularPlaces.map((place) => (
                    <Marker
                        key={place.name}
                        latitude={place.latitude}
                        longitude={place.longitude}
                        anchor="bottom"
                        color={selectedPlace === place ? '#ff0000' : '#000000'}
                    />
                ))}
            </Map>

            <div className="w-full overflow-x-auto pb-28 md:pb-8 pt-2 px-4 no-scrollbar">
                <div className="flex space-x-4 min-w-min">
                    {popularPlaces.map(place => (
                        <div 
                            key={place.name} 
                            className={`flex-shrink-0 bg-white rounded-lg shadow-lg p-4 flex w-[300px] cursor-pointer
                                ${selectedPlace === place ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => handlePlaceClick(place)}
                        >
                            <img src={place.image} alt={place.name} className="w-1/3 h-auto rounded-l-lg object-cover" />
                            <div className="flex-1 p-2">
                                <h3 className="font-bold text-lg">{place.name}</h3>
                                <p>{place.area}</p>
                                <p>{place.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
