import React, { useState, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    name: string;
    country: string;
    text: string;
    rating: number;
    image: string;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, className = '' }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const extendedTestimonials = React.useMemo(() => [...testimonials, ...testimonials, ...testimonials], [testimonials]);
    const baseIndex = testimonials.length;
    const [virtualIndex, setVirtualIndex] = useState(baseIndex);

    // Touch/drag state
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragDelta, setDragDelta] = useState(0);
    const dragThreshold = 80;

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newVirtualIndex = virtualIndex + 1;
        const newCurrentIndex = (currentIndex + 1) % testimonials.length;
        setVirtualIndex(newVirtualIndex);
        setCurrentIndex(newCurrentIndex);
        setTimeout(() => {
            setIsTransitioning(false);
            if (newVirtualIndex >= testimonials.length * 2 - 1) {
                setVirtualIndex(baseIndex + newCurrentIndex);
            }
        }, 500);
    }, [testimonials.length, isTransitioning, virtualIndex, currentIndex, baseIndex]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newVirtualIndex = virtualIndex - 1;
        const newCurrentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        setVirtualIndex(newVirtualIndex);
        setCurrentIndex(newCurrentIndex);
        setTimeout(() => {
            setIsTransitioning(false);
            if (newVirtualIndex <= 0) {
                setVirtualIndex(baseIndex + newCurrentIndex);
            }
        }, 500);
    }, [testimonials.length, isTransitioning, virtualIndex, currentIndex, baseIndex]);

    // Drag/touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isTransitioning) return;
        setDragStartX(e.touches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (dragStartX === null) return;
        setDragDelta(e.touches[0].clientX - dragStartX);
    };
    const handleTouchEnd = () => {
        if (dragStartX === null) return;
        if (dragDelta > dragThreshold) {
            prevSlide();
        } else if (dragDelta < -dragThreshold) {
            nextSlide();
        }
        setDragStartX(null);
        setDragDelta(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isTransitioning) return;
        setDragStartX(e.clientX);
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragStartX === null) return;
        setDragDelta(e.clientX - dragStartX);
    };
    const handleMouseUp = () => {
        if (dragStartX === null) return;
        if (dragDelta > dragThreshold) {
            prevSlide();
        } else if (dragDelta < -dragThreshold) {
            nextSlide();
        }
        setDragStartX(null);
        setDragDelta(0);
    };

    // Seamless infinite loop reset
    useEffect(() => {
        if (!isTransitioning) {
            if (virtualIndex >= testimonials.length * 2) {
                setVirtualIndex(baseIndex + currentIndex);
            } else if (virtualIndex < testimonials.length) {
                setVirtualIndex(baseIndex + currentIndex);
            }
        }
    }, [isTransitioning, virtualIndex, currentIndex, testimonials.length, baseIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                prevSlide();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                nextSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    const getCardStyle = (virtualIdx: number) => {
        const diff = virtualIdx - virtualIndex;
        const absIndex = Math.abs(diff);

        if (absIndex === 0) {
            // Focused card - center, large
            return {
                transform: 'translateX(0) scale(1.05)',
                zIndex: 20,
                opacity: 1,
            };
        } else if (absIndex === 1) {
            // Adjacent cards
            return {
                transform: `translateX(${diff > 0 ? '320px' : '-320px'}) scale(0.95)`,
                zIndex: 10,
                opacity: 0.6,
            };
        } else if (absIndex === 2) {
            // Far cards
            return {
                transform: `translateX(${diff > 0 ? '580px' : '-580px'}) scale(0.85)`,
                zIndex: 5,
                opacity: 0.3,
            };
        } else {
            // Hidden cards
            return {
                transform: `translateX(${diff > 0 ? '800px' : '-800px'}) scale(0.7)`,
                zIndex: 0,
                opacity: 0,
            };
        }
    };

    return (
        <div
            className={`relative w-full h-[600px] overflow-hidden pt-0 ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={dragStartX !== null ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: dragStartX !== null ? 'grabbing' : 'grab' }}
        >
            {/* Background Cards Container */}
            <div className="absolute inset-0 flex items-center justify-center">
                {extendedTestimonials.map((testimonial, virtualIdx) => {
                    const style = getCardStyle(virtualIdx);
                    const testimonialIndex = virtualIdx % testimonials.length;
                    const isFocused = virtualIdx === virtualIndex;
                    const isVisible = Math.abs(virtualIdx - virtualIndex) <= 2; // Only render visible cards for performance

                    if (!isVisible) return null;

                    return (
                        <div
                            key={`${testimonial.name}-${virtualIdx}`}
                            className={`absolute ${isFocused ? 'w-96' : 'w-80'} transition-all duration-700 ease-out cursor-pointer`}
                            style={style}
                            onClick={() => {
                                if (!isFocused && !isTransitioning) {
                                    setIsTransitioning(true);
                                    setVirtualIndex(virtualIdx);
                                    setCurrentIndex(testimonialIndex);
                                    setTimeout(() => setIsTransitioning(false), 500);
                                }
                            }}
                        >
                            <div className={`bg-neutral-50/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border transition-all duration-700 h-96 flex flex-col justify-between hover:shadow-3xl ${isFocused
                                ? 'border-secondary-300/60 shadow-3xl hover:border-secondary-400/70'
                                : 'border-primary-200/50 shadow-xl hover:shadow-2xl hover:border-primary-300/60'
                                }`}>
                                {/* Decorative element for center card */}
                                {isFocused && (
                                    <div className="absolute top-4 right-4 transition-all duration-300">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                                            <i className="ri-vip-crown-line text-white text-sm"></i>
                                        </div>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="text-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className={`rounded-full mx-auto mb-3 object-cover border-4 border-secondary-200 transition-all duration-500 ${isFocused ? 'w-20 h-20 hover:border-secondary-300' : 'w-16 h-16 hover:border-secondary-250'
                                            }`}
                                    />
                                    <div className="flex justify-center mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <i key={i} className={`ri-star-fill text-yellow-500 transition-all duration-300 hover:text-yellow-400 ${isFocused ? 'text-lg mx-0.5' : 'text-base mx-0.5'
                                                }`}></i>
                                        ))}
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className={`text-primary-800 leading-relaxed font-serif italic text-center flex-1 flex items-center justify-center transition-all duration-500 ${isFocused ? 'text-base' : 'text-sm'
                                    }`}>
                                    "{testimonial.text}"
                                </blockquote>

                                {/* Author info */}
                                <div className="text-center mt-4">
                                    <h4 className={`font-bold text-primary-800 mb-1 transition-all duration-300 ${isFocused ? 'text-lg' : 'text-base'
                                        }`}>
                                        {testimonial.name}
                                    </h4>
                                    <p className={`text-secondary-700 font-semibold transition-all duration-300 ${isFocused ? 'text-sm' : 'text-xs'
                                        }`}>
                                        {testimonial.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls - Arrows and Dots grouped together */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-6">
                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer disabled:opacity-50"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isTransitioning) {
                                    setIsTransitioning(true);
                                    const targetVirtualIndex = baseIndex + index;
                                    setVirtualIndex(targetVirtualIndex);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsTransitioning(false), 500);
                                }
                            }}
                            className={`h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'bg-secondary-600 w-10' : 'bg-primary-400/50 hover:bg-secondary-400 w-3'
                                }`}
                        />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer disabled:opacity-50"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default memo(TestimonialCarousel);