/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { QRCodeSVG } from 'qrcode.react';

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  foreignerPrice: number;
}

type BookingData = {
  activityId: string;
  activityTitle: string;
  ticketCount: number;
  isForeigner: boolean;
  totalPrice: number;
  bookingId?: string;
  timestamp?: string;
};

const activities: Activity[] = [
  {
    id: '1',
    title: 'Chunnambar Boat House',
    description: 'Surrounded by beautiful backwaters and stunning white sand beaches, Chunnambar Boat House is ideal for boating and is also a great picnic spot in Pondicherry.',
    image: '/activities/chunambar.jpeg',
    category: 'Activities',
    price: 500,
    foreignerPrice: 1000
  },
  {
    id: '2',
    title: 'Temple Walk',
    description: 'With temples almost at every bend, each concealing an anecdote of history.',
    image: '/activities/manakula.png',
    category: 'Discover',
    price: 200,
    foreignerPrice: 400
  }
];

const tabs = [
  'Activities',
  'Discover',
  'Day out',
  'Foods',
  'Tours',
  'Sightseeing',
  'Featured Events',
  'Explore Puducherry'
];

export default function ActivitiesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Activities');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    activityId: '',
    activityTitle: '',
    ticketCount: 1,
    isForeigner: false,
    totalPrice: 0
  });

  const filteredActivities = activities.filter(activity => activity.category === activeTab);

  const handleBookingClick = (activity: Activity) => {
    setCurrentActivity(activity);
    setBookingData({
      activityId: activity.id,
      activityTitle: activity.title,
      ticketCount: 1,
      isForeigner: false,
      totalPrice: activity.price
    });
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    // In a real app, you would send this data to your backend
    const bookingId = `BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    
    setBookingData(prev => ({
      ...prev,
      bookingId,
      timestamp
    }));
    
    setIsBookingDialogOpen(false);
    setIsBookingSuccess(true);
  };

  const calculateTotal = (ticketCount: number, isForeigner: boolean, activity: Activity | null) => {
    if (!activity) return 0;
    const price = isForeigner ? activity.foreignerPrice : activity.price;
    return price * ticketCount;
  };

  const handleTicketCountChange = (increment: number) => {
    setBookingData(prev => {
      const newCount = Math.max(1, prev.ticketCount + increment);
      return {
        ...prev,
        ticketCount: newCount,
        totalPrice: calculateTotal(newCount, prev.isForeigner, currentActivity)
      };
    });
  };

  const handleForeignerChange = (checked: boolean) => {
    setBookingData(prev => ({
      ...prev,
      isForeigner: checked,
      totalPrice: calculateTotal(prev.ticketCount, checked, currentActivity)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <img
          src="/activities/day-out.jpg"
          alt="Activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold text-white">What to do</h1>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
        <div className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-4 relative whitespace-nowrap ${activeTab === tab ? 'text-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div 
                className="relative aspect-video cursor-pointer"
                onClick={() => router.push(`/dashboard/places/${activity.id}`)}
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-600">
                    ₹{activity.price} {activity.foreignerPrice > activity.price && 
                      <span className="text-sm text-gray-500 ml-1">(Indian)</span>}
                  </span>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookingClick(activity);
                    }}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Book Now
                  </Button>
                </div>
                {activity.foreignerPrice > activity.price && (
                  <p className="text-sm text-gray-500 mt-1">
                    Foreigner: ₹{activity.foreignerPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book {bookingData.activityTitle}</DialogTitle>
            <DialogDescription>
              Please confirm your booking details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Number of Tickets</Label>
              <div className="flex items-center justify-center gap-1 w-full max-w-[140px] mx-auto">
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon"
                  onClick={() => handleTicketCountChange(-1)}
                  disabled={bookingData.ticketCount <= 1}
                  className="h-9 w-9 rounded-full p-0"
                >
                  -
                </Button>
                <div className="min-w-[40px] text-center">
                  <span className="text-lg font-medium">{bookingData.ticketCount}</span>
                </div>
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon"
                  onClick={() => handleTicketCountChange(1)}
                  className="h-9 w-9 rounded-full p-0"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="foreigner" 
                checked={bookingData.isForeigner}
                onCheckedChange={handleForeignerChange}
              />
              <label
                htmlFor="foreigner"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Foreign Visitor
              </label>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>₹{bookingData.totalPrice}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} className="bg-orange-500 hover:bg-orange-600">
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Success Dialog */}
      <Dialog open={isBookingSuccess} onOpenChange={setIsBookingSuccess}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Your tickets have been successfully booked.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <QRCodeSVG 
                value={JSON.stringify(bookingData)} 
                size={200} 
                level="H"
              />
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Activity:</span> {bookingData.activityTitle}</p>
            <p><span className="font-medium">Tickets:</span> {bookingData.ticketCount} x ₹{bookingData.isForeigner ? currentActivity?.foreignerPrice : currentActivity?.price}</p>
            <p><span className="font-medium">Total:</span> ₹{bookingData.totalPrice}</p>
            <p><span className="font-medium">Visitor Type:</span> {bookingData.isForeigner ? 'Foreigner' : 'Indian'}</p>
            <p className="text-xs text-gray-400 mt-2">Booking ID: {bookingData.bookingId}</p>
          </div>
          <div className="mt-4">
            <Button 
              onClick={() => {
                setIsBookingSuccess(false);
                setCurrentActivity(null);
              }}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}