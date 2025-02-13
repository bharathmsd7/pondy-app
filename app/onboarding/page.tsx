'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { SpinningText } from '@/components/magicui/spinning-text';

const onboardingData = [
  {
    title: 'French Colonial Charm',
    description: 'Experience the unique blend of French architecture and Indian culture in our heritage town',
    image: '/onboarding/french-quarter.png',
    color: '#f6c634', // Warm yellow for heritage and sunshine
  },
  {
    title: 'Spiritual Journey',
    description: 'Find peace at Auroville, ancient temples, and serene beaches of Pondicherry',
    image: '/onboarding/auroville.png',
    color: '#88d8df', // Calming blue for spirituality and ocean
  },
  {
    title: 'Culinary Paradise',
    description: 'Savor the fusion of French and Tamil cuisine in our beachside cafes',
    image: '/onboarding/cuisine.png',
    color: '#f2d1dc', // Soft pink for food and hospitality
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    // const isOnboardingCompleted = Cookies.get('isOnboardingCompleted');
    // if (isOnboardingCompleted === 'true' || isOnboardingCompleted === 'false') {
    //   router.push('/auth/login');
    // }
  }, [router]);

  const completeOnboarding = () => {
    Cookies.set('isOnboardingCompleted', 'false', { expires: 365 });
    router.push('/auth/login');
  };

  const paginate = (newDirection: number) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage < onboardingData.length) {
      setPage([nextPage, newDirection]);
    }
  };

  const handleDragEnd = (event: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const handleNext = () => {
    if (page === onboardingData.length - 1) {
      completeOnboarding();
    } else {
      paginate(1);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      animate={{ backgroundColor: onboardingData[page].color }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          onClick={completeOnboarding}
          className="text-black hover:bg-black/10"
        >
          Skip
        </Button>
      </div>

      {page > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-black hover:bg-black/10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      <div className="flex-1 flex items-center justify-center p-4 relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full max-w-md cursor-grab active:cursor-grabbing"
          >
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-6">
                <div className="absolute top-6 right-3 w-24 h-24">
                    <SpinningText>Explore . Pondicherry .</SpinningText>
                </div>
                <div className="relative w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden group">
                  <Image
                    src={onboardingData[page].image}
                    alt={onboardingData[page].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-black">{onboardingData[page].title}</h2>
                <p className="text-center text-black/70 text-lg mb-4">
                  {onboardingData[page].description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-10 w-full max-w-md px-8">
        <div className="relative flex items-center justify-center">

          {/* Circular progress indicators */}
          <div className="absolute -inset-3 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
              {onboardingData.map((_, index) => {
                const rotation = (360 / onboardingData.length) * index;
                const isActive = index <= page;
                return (
                  <circle
                    key={index}
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke={isActive ? 'black' : 'rgba(0, 0, 0, 0.2)'}
                    strokeWidth="2"
                    strokeDasharray="20 200"
                    strokeDashoffset="-47"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      transition: 'stroke 0.3s ease'
                    }}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Button */}
          <Button 
            size="icon"
            onClick={handleNext}
            className="relative bg-black text-white hover:bg-black/90 rounded-full h-14 w-14 p-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {page === onboardingData.length - 1 ? (
                <span className="text-sm font-medium">Start</span>
              ) : (
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M9 6L15 12L9 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
