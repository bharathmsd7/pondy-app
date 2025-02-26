"use client"
import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
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
    const [viewport, setViewport] = useState({
        latitude: popularPlaces[0].latitude,
        longitude: popularPlaces[0].longitude,
        width: '100%',
        height: '100vh',
        zoom: 14,
    });

    const [selectedPlace, setSelectedPlace] = useState(popularPlaces[0]);

    useEffect(() => {
        setViewport(prev => ({ ...prev, latitude: selectedPlace.latitude, longitude: selectedPlace.longitude }));
    }, [selectedPlace]);
    return (
        <div className="flex flex-col h-screen w-screen">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                // style={{ width: 900, height: 900 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={12.02203} latitude={79.84992} anchor="bottom" >
                    
                </Marker>
            </Map>
            {/* <Map
                {...viewport}
                onViewportChange={setViewport}
                mapboxAccessToken=""
            >
                {popularPlaces.map(place => (
                    <Marker
                        key={place.name}
                        latitude={place.latitude}
                        longitude={place.longitude}
                    >
                        <div className="marker" />
                    </Marker>
                ))}
            </Map> */}
            <div className="overflow-x-auto mt-4">
                <div className="flex space-x-4">
                    {popularPlaces.map(place => (
                        <div key={place.name} className="bg-white rounded-lg shadow-lg p-4 flex w-64 md:w-80 lg:w-96" onClick={() => setSelectedPlace(place)}>
                            <img src={place.image} alt={place.name} className="w-1/3 h-auto rounded-l-lg" />
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
