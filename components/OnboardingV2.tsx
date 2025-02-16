import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface OnboardingSlide {
  image: string;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    image: '/images/french-quarter.jpg',
    title: 'Explore Pondicherry',
    description: 'Discover the charm of French architecture and colonial heritage',
  },
  {
    image: '/images/paradise-beach.jpg',
    title: 'Beautiful Beaches',
    description: 'Experience the serene beaches and coastal beauty of Pondicherry',
  },
  {
    image: '/images/auroville.jpg',
    title: 'Visit Auroville',
    description: 'Explore the unique spiritual and cultural hub of Auroville',
  },
];

const OnboardingV2: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSwipe = (direction: string) => {
    if (currentSlide === 0 && direction === 'prev') {
      // Prevent swipe to next on first screen
      return;
    }
    if (currentSlide === slides.length - 1 && direction === 'next') {
      // Prevent swipe to previous on last screen
      return;
    }
    if (direction === 'next') {
      nextSlide();
    } else if (direction === 'prev') {
      prevSlide();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('next'),
    onSwipedRight: () => handleSwipe('prev'),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="h-screen w-full relative overflow-hidden" {...handlers}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full absolute"
        >
          {/* Background Image with Gradient */}
          <div
            className="h-full w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
            <p className="text-lg mb-8 opacity-90">{slides[currentSlide].description}</p>
            <button
              onClick={() => {
                if (currentSlide === slides.length - 1) {
                //   Cookies.set('isOnboardingCompleted', 'true');
                  router.push('/');
                } else {
                  nextSlide();
                }
              }}
              className="w-full bg-white text-black py-4 rounded-lg font-semibold mb-8"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingV2;
