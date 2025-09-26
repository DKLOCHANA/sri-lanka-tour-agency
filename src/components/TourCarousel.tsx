import React, { useState, useEffect, useCallback, memo } from 'react';

import { ChevronLeft, ChevronRight, Clock, Users, Star } from 'lucide-react';

interface PackageHighlight {
    icon: string;
    title: string;
    description: string;
}

interface TourPackage {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    highlights: PackageHighlight[];
    price?: number;
    duration?: string;
}

interface TourCarouselProps {
    packages: TourPackage[];
    className?: string;
}

const TourCarousel: React.FC<TourCarouselProps> = ({ packages, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const extendedPackages = React.useMemo(() => [...packages, ...packages, ...packages], [packages]);
    const baseIndex = packages.length;
    const [virtualIndex, setVirtualIndex] = useState(baseIndex);

    // Touch/drag state
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragDelta, setDragDelta] = useState(0);
    const dragThreshold = 80;

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newVirtualIndex = virtualIndex + 1;
        const newCurrentIndex = (currentIndex + 1) % packages.length;
        setVirtualIndex(newVirtualIndex);
        setCurrentIndex(newCurrentIndex);
        setTimeout(() => {
            setIsTransitioning(false);
            if (newVirtualIndex >= packages.length * 2 - 1) {
                setVirtualIndex(baseIndex + newCurrentIndex);
            }
        }, 500);
    }, [packages.length, isTransitioning, virtualIndex, currentIndex, baseIndex]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newVirtualIndex = virtualIndex - 1;
        const newCurrentIndex = (currentIndex - 1 + packages.length) % packages.length;
        setVirtualIndex(newVirtualIndex);
        setCurrentIndex(newCurrentIndex);
        setTimeout(() => {
            setIsTransitioning(false);
            if (newVirtualIndex <= 0) {
                setVirtualIndex(baseIndex + newCurrentIndex);
            }
        }, 500);
    }, [packages.length, isTransitioning, virtualIndex, currentIndex, baseIndex]);

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
            if (virtualIndex >= packages.length * 2) {
                setVirtualIndex(baseIndex + currentIndex);
            } else if (virtualIndex < packages.length) {
                setVirtualIndex(baseIndex + currentIndex);
            }
        }
    }, [isTransitioning, virtualIndex, currentIndex, packages.length, baseIndex]);

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
                transform: 'translateX(0) scale(1)',
                zIndex: 10,
                opacity: 1,
            };
        } else if (absIndex === 1) {
            // Adjacent cards
            return {
                transform: `translateX(${diff > 0 ? '320px' : '-320px'}) scale(0.8)`,
                zIndex: 5,
                opacity: 0.7,
            };
        } else if (absIndex === 2) {
            // Far cards
            return {
                transform: `translateX(${diff > 0 ? '580px' : '-580px'}) scale(0.6)`,
                zIndex: 1,
                opacity: 0.4,
            };
        } else {
            // Hidden cards
            return {
                transform: `translateX(${diff > 0 ? '800px' : '-800px'}) scale(0.4)`,
                zIndex: 0,
                opacity: 0,
            };
        }
    };

    return (
        <div
            className={`relative w-full h-[650px] overflow-hidden focus:outline-none ${className}`}
            tabIndex={0}
            role="region"
            aria-label="Tour packages carousel"
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
                {extendedPackages.map((pkg, virtualIdx) => {
                    const style = getCardStyle(virtualIdx);
                    const packageIndex = virtualIdx % packages.length;
                    const isFocused = virtualIdx === virtualIndex;
                    const isVisible = Math.abs(virtualIdx - virtualIndex) <= 3; // Only render visible cards for performance

                    if (!isVisible) return null;

                    return (
                        <div
                            key={`${pkg.id}-${virtualIdx}`}
                            className={`absolute ${isFocused ? 'w-[400px] h-[500px]' : 'w-[280px] h-[400px]'} rounded-2xl shadow-2xl transition-all duration-500 ease-out cursor-pointer ${isTransitioning ? 'pointer-events-none' : ''
                                }`}
                            style={style}
                            onClick={() => {
                                if (!isFocused && !isTransitioning) {
                                    setIsTransitioning(true);
                                    setVirtualIndex(virtualIdx);
                                    setCurrentIndex(packageIndex);
                                    setTimeout(() => setIsTransitioning(false), 500);
                                }
                            }}
                        >
                            {isFocused ? (
                                // Focused card - use <img> for background and add blackish overlay
                                <div className="h-full border-2 border-blue-400 rounded-2xl overflow-hidden relative">
                                    <img
                                        src={pkg.backgroundImage}
                                        alt={pkg.title}
                                        className="absolute inset-0 w-full h-full object-cover z-0"
                                    />
                                    {/* Blackish overlay for better text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-black/10 z-10" />

                                    {/* Content overlay */}
                                    <div className="relative z-20 h-full flex flex-col justify-between p-6">
                                        {/* Top section - Price */}
                                        <div className="flex justify-start">
                                            <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                From ${pkg.price || '299'}
                                            </div>
                                        </div>

                                        {/* Bottom section - Main content */}
                                        <div className="space-y-6">
                                            {/* Title and subtitle */}
                                            <div className="text-white">
                                                <h3 className="text-3xl font-bold mb-2 font-serif">{pkg.title}</h3>
                                                <p className="text-lg opacity-95 mb-4">{pkg.subtitle}</p>
                                            </div>

                                            {/* Key highlights */}
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                {pkg.highlights.slice(0, 3).map((highlight: PackageHighlight, i: number) => (
                                                    <div key={i} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-white font-medium">{highlight.title}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bottom info in glass effect containers */}
                                            <div className="flex justify-center items-center gap-4 mb-6">
                                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{pkg.duration || '7 days'}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                                                    <Users className="w-4 h-4" />
                                                    <span>Max 12</span>
                                                </div>
                                            </div>

                                            {/* Read More Button */}
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 border border-blue-600 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Background cards - image and title only
                                <div className="h-full relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={pkg.backgroundImage}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h4 className="text-lg font-bold font-serif mb-1">{pkg.title}</h4>
                                        <p className="text-sm opacity-90 truncate">{pkg.subtitle}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Navigation Arrows & Dots indicator - Responsive grouping */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 sm:space-x-4">
                {/* Left Arrow (mobile: next to dots, desktop: hidden) */}
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="block sm:hidden w-10 h-10 bg-white/90 hover:bg-white text-secondary-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex space-x-2">
                    {packages.map((_, index) => (
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
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-blue-500 w-8'
                                : 'bg-gray-400 hover:bg-gray-500'
                                }`}
                        />
                    ))}
                </div>

                {/* Right Arrow (mobile: next to dots, desktop: hidden) */}
                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="block sm:hidden w-10 h-10 bg-white/90 hover:bg-white text-secondary-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Desktop arrows (absolute, side of carousel) */}
            <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="hidden sm:block absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-secondary-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="hidden sm:block absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-secondary-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default memo(TourCarousel);