/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Map, { Marker, ViewState, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const categories = ['Beaches', 'Temples', 'Churches', 'Parks', 'Activities', 'Hotels', 'Restaurants'] as const;
type Category = typeof categories[number];

const placesByCategory = {
    Beaches: [
        { name: 'Paradise Beach', area: 'Chunnambar', time: '9am - 5pm', latitude: 11.873628576111534, longitude: 79.82117436599387, image: '/images/explore/beaches/paradise-beach.jpg' },
        { name: 'Promenade Beach', area: 'White Town', time: '24/7', latitude: 11.93327411490338, longitude:79.83614236144241, image: '/images/explore/beaches/promenade-beach.jpg' },
        { name: 'Serenity Beach', area: 'Kottakuppam', time: '6am - 6pm', latitude: 11.969243978848848, longitude: 79.84459567434908 ,image: '/images/explore/beaches/serenity-beach.png' },
        { name: 'Auro Beach', area: 'Auroville', time: '7am - 6:30pm', latitude: 12.001320863878785, longitude: 79.85510024777128, image: '/images/explore/beaches/auro-beach.jpeg' },
    ],
    Temples: [
        { name: 'Manakula Vinayagar Temple', area: 'White Town', time: '5:30am - 12:30pm & 4pm - 9pm', latitude: 11.93603801014409, longitude: 79.83367282491899 , image: '/images/explore/temples/manakula-vinayagar-temple.jpg' },
        { name: 'Sri Varadaraja Perumal Temple', area: 'Heritage Town', time: '6am - 12pm & 4pm - 8pm', latitude: 11.941178372291377, longitude: 79.83014791428455 ,  image: '/images/explore/temples/varadaraja-temple.jpg' },
        { name: 'Shri Vedapuriswarar Temple', area: 'Heritage Town', time: '6am - 12pm & 4:30pm - 8:30pm', latitude: 11.939980029084053, longitude: 79.82976515008134, image: '/images/explore/temples/vedhapureeswarar-temple.jpg' },
    ],
    Churches: [
        { name: 'Immaculate Conception Cathedral', area: 'Mission Street', time: '6am - 8pm', latitude: 11.930543, longitude: 79.835291, image: '/images/explore/churches/immaculate-conception-cathedral.jpg' },
        { name: 'Sacred Heart Basilica', area: 'South Boulevard', time: '6am - 8:30pm', latitude: 11.929675, longitude: 79.831547, image: '/images/explore/churches/sacred-heart-basilica.jpg' },
        { name: 'Notre Dame des Anges', area: 'White Town', time: '7am - 6:30pm', latitude: 11.932859, longitude: 79.836055, image: '/images/explore/churches/notre-dame-des-anges.jpg' },
        { name: 'Eglise de Notre Dame de Lourdes', area: 'Villianur', time: '6am - 8pm', latitude: 11.940675, longitude: 79.785547, image: '/images/explore/churches/eglise-de-notre-dame.jpg' },
    ],
    Parks: [
        { name: 'Bharathi Park', area: 'White Town', time: '6am - 8pm', latitude: 11.934675, longitude: 79.834091, image: '/images/explore/parks/bharathi-park.jpg' },
        { name: 'Botanical Garden', area: 'Marimalai Adigal Salai', time: '9am - 5:30pm', latitude: 11.937245, longitude: 79.837821, image: '/images/explore/parks/botanical-garden.jpg' },
        { name: 'French War Memorial', area: 'Goubert Avenue', time: '24/7', latitude: 11.932475, longitude: 79.836147, image: '/images/explore/parks/french-war-memorial.jpg' },
        { name: 'Gandhi Thidal', area: 'Beach Road', time: '24/7', latitude: 11.932859, longitude: 79.835891, image: '/images/explore/parks/gandhi-thidal.jpg' },
    ],
    Activities: [
        { name: 'Scuba Diving', area: 'Serenity Beach', time: '8am - 4pm', latitude: 11.925496279112068, longitude: 79.82801355272586, image: '/images/explore/activities/scuba-diving.jpg' },
        { name: 'Auroville Meditation Center', area: 'Auroville', time: '9am - 5pm', latitude: 12.0069, longitude: 79.8106, image: '/images/explore/activities/auroville.jpg' },
        { name: 'Chunnambar Boat House', area: 'Chunnambar', time: '9am - 5pm', latitude: 11.884307884797636, longitude: 79.80069305248892, image: '/images/explore/activities/chunnambar-boat-house.jpg' },
    ],
    Hotels: [
        { name: 'La Villa', area: 'White Town', time: '24/7', latitude: 11.9338, longitude: 79.8357, image: '/images/explore/hotels/la-villa.jpg' },
        { name: 'Palais de Mahe', area: 'White Town', time: '24/7', latitude: 11.9334, longitude: 79.8361, image: '/images/explore/hotels/palais-de-mahe.jpg' },
        { name: 'The Promenade', area: 'White Town', time: '24/7', latitude: 11.9325, longitude: 79.8361, image: '/images/explore/hotels/the-promenade.jpg' },
        { name: 'Elementzz Community', area: 'Kottakuppam', time: '24/7', latitude: 11.97076880877992, longitude: 79.84408460395521, image: '/images/explore/hotels/elementzz-community.jpg' },
        { name: 'La Lune', area: 'Kottakuppam', time: '24/7', latitude: 11.96759668386576, longitude: 79.84142393841466, image: '/images/explore/hotels/la-lune.jpg' },
        { name: 'Sornalaxmi Residency', area: 'Heritage Town', time: '24/7', latitude: 11.946940383556912, longitude: 79.82948546162311, image: '/images/explore/hotels/sornalaxmi-residency.jpg' },
        { name: 'Heritage by De Fleur Hotel', area: 'Heritage Town', time: '24/7', latitude: 11.930178324506015, longitude: 79.8267444825887, image: '/images/explore/hotels/heritage-by-de-fleur-hotel.jpg' },
        { name: 'Dj Villa Home stay', area: 'Pudupalaiyam', time: '24/7', latitude: 11.943904647088939, longitude: 79.81147782491902, image: '/images/explore/hotels/dj-villa-home-stay.jpg' },
        { name: 'The Cradle', area: 'Heritage Town', time: '24/7', latitude: 11.933442318701408, longitude: 79.82528499608402, image: '/images/explore/hotels/the-cradle.jpg' },
        { name: 'LA GRANDE RESIDENCY', area: 'Pudupalaiyam', time: '24/7', latitude: 11.933061451006228, longitude: 79.81727845945103, image: '/images/explore/hotels/la-grande-residency.jpg' },
        { name: 'The Residency Towers Puducherry', area: 'Heritage Town', time: '24/7', latitude: 11.933883287254359, longitude: 79.82441575139896, image: '/images/explore/hotels/the-residency-towers-puducherry.jpg' },
        { name: 'De Fleur Hotel', area: 'White Town', time: '24/7', latitude: 11.930949373200468, longitude: 79.83037025521732, image: '/images/explore/hotels/de-fleur-hotel.jpg' },
        { name: 'Villa Cavi', area: 'White Town', time: '24/7', latitude: 11.935128520225904, longitude: 79.83611348810022, image: '/images/explore/hotels/villa-cavi.jpg' },
        { name: 'Le Duleix', area: 'White Town', time: '24/7', latitude: 11.931202661393181, longitude: 79.83395506505094, image: '/images/explore/hotels/le-duleix.jpg' },
        { name: 'La Plage SeaView Suites', area: 'White Town', time: '24/7', latitude: 11.930404883970319, longitude: 79.83524252523644, image: '/images/explore/hotels/la-plage-seaview-suites.jpg' },
        { name: 'Lotus Bay View Hotel', area: 'White Town', time: '24/7', latitude: 11.927371623874944, longitude: 79.83438511171587, image: '/images/explore/hotels/lotus-bay-view-hotel.jpg' },
        { name: 'Hotel De L\'Orient', area: 'White Town', time: '24/7', latitude: 11.927920649315585, longitude: 79.83348688504493, image: '/images/explore/hotels/hotel-de-l-orient.jpg' },
        { name: 'Villa Shanti Hotel', area: 'White Town', time: '24/7', latitude: 11.92965270511001, longitude: 79.83308817231959, image: '/images/explore/hotels/villa-shanti-hotel.jpg' }
    ],
    Restaurants: [
        { name: 'Writer\'s cafe', area: 'H.M.Kassim Salai', time: '12pm - 10pm', latitude: 11.935208138765786,  longitude: 79.8325229402585, image: '/images/explore/restaurants/writers-cafe.jpg' },
        { name: 'Auroville Bakery', area: 'Auroville', time: '12pm - 10pm', latitude: 11.990069693878496, longitude: 79.83470714307332, image: '/images/explore/restaurants/auroville-bakery.jpg' },
        { name: 'Surguru Veg Restaurant', area: 'Bussy Street', time: '7am - 10:30pm', latitude: 11.929592915856952, longitude:  79.82841944525198,  image: '/images/explore/restaurants/surguru-pure-veg-hotel.jpg' },
        { name: 'Bay Bistro', area: 'Maraimalai Adigal St', time: '12pm - 10pm', latitude: 11.88271957455583, longitude: 79.82025753383931, image: '/images/explore/restaurants/bay-bistro.jpg' },
        { name: 'Biriyani Brothers', area: 'Vallalar Salai Rd', time: '12pm - 10pm', latitude: 11.94358417929491, longitude: 79.82278934454224, image: '/images/explore/restaurants/biriyani-brothers.jpg' },
        { name: 'Bismilla', area: 'Heritage Town', time: '12pm - 10pm', latitude: 11.938603764711951, longitude: 79.83118616711903, image: '/images/explore/restaurants/bismilla.jpeg' },
        { name: 'Bistro', area: 'Pudupalaiyam', time: '12pm - 10pm', latitude: 11.932547679259898, longitude: 79.81761396785261, image: '/images/explore/restaurants/bistro.jpg' },
        { name: 'Copper Kitchen', area: '100 ft Road', time: '12pm - 10pm', latitude: 11.933298930896024, longitude: 79.8076274095794, image: '/images/explore/restaurants/copper-kitchen.jpg' },
        { name: 'De Fish House', area: 'Heritage Town', time: '12pm - 10pm', latitude: 11.940060509522343, longitude: 79.83112226724934, image: '/images/explore/restaurants/de-fish-house.jpg' },
        { name: 'Kailash Parbat', area: 'Mission Street', time: '12pm - 10pm', latitude: 11.930798926735388, longitude: 79.8303000452604, image: '/images/explore/restaurants/Kailash Parbat.jpg' },
        { name: 'Kamatchi', area: '100 ft Road', time: '12pm - 10pm', latitude: 11.928225765334087, longitude: 79.80716783198109, image: '/images/explore/restaurants/kamatchi.JPG' },
        { name: 'Le Dupleix', area: 'White Town', time: '12pm - 10pm', latitude: 11.931132644229345, longitude: 79.8338040095794, image: '/images/explore/restaurants/oh-pondi.jpg' },
        { name: 'Oh Pondi', area: 'South Boulevard', time: '12pm - 10pm', latitude: 11.931132644229345, longitude: 79.8338040095794, image: '/images/explore/restaurants/oh-pondi.jpg' },
        { name: 'Pavilion', area: 'Anna Salai', time: '12pm - 10pm', latitude: 11.934090518123575, longitude: 79.82439802491896, image: '/images/explore/restaurants/pavilion.jpg' },
        { name: 'Saucentoss', area: 'Nehru Street', time: '12pm - 10pm', latitude: 11.935890325869382, longitude: 79.83236562676312, image: '/images/explore/restaurants/saucentoss.jpg' },
        { name: 'Villa Krish', area: 'White Town', time: '12pm - 10pm', latitude: 11.930263412841626, longitude: 79.83364663841424, image: '/images/explore/restaurants/villa-krish.jpg' },
        { name: 'Cafe Veloute', area: 'Surcouf Street', time: '12pm - 10pm', latitude: 11.930423397047331, longitude: 79.8323205057961, image: '/images/explore/restaurants/cafe-veloute.jpg' },

    ],
};

const categoryImages = {
    Beaches: '/images/explore/beaches/promenade-beach.jpg',
    Temples: '/images/explore/temples/manakula-vinayagar-temple-category.jpg',
    Churches: '/images/explore/churches/sacred-heart-basilica-category.jpg',
    Parks: '/images/explore/parks/botanical-garden-category.jpg',
    Activities: '/images/explore/activities/activities-category.jpg',
    Hotels: '/images/explore/hotels/palais-de-mahe-category.jpg',
    Restaurants: '/images/explore/restaurants/restaurant-category.jpg',
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
                        color='red'
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
