import { useState } from 'react';
import Header from '../../components/Header';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from '../../components/Footer';
import TourCarousel from '../../components/TourCarousel';
import TestimonialCarousel from '../../components/TestimonialCarousel';
import { packages } from '../../data/packages';
import { testimonials } from '../../data/testimonials';
import { useScrollPosition } from '../../hooks/useScrollPosition';

import { useCurrentTime } from '../../hooks/useCurrentTime';

export default function Home() {
  const scrollY = useScrollPosition();

  const currentTime = useCurrentTime();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTour: '',
    travelDates: '',
    message: '',
    adults: '2',
    children: '0',
    infants: '0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.length > 500) {
      alert('Message must be 500 characters or less');
      return;
    }

    try {
      const response = await fetch('https://readdy.ai/api/forms/kandy-luxury-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredTour: formData.preferredTour,
          travelDates: formData.travelDates,
          message: formData.message
        }).toString()
      });

      if (response.ok) {
        alert('Your luxury tour request has been submitted successfully! We will contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredTour: '',
          travelDates: '',
          message: '',
          adults: '2',
          children: '0',
          infants: '0'
        });
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };



  return (
    <div className="min-h-screen bg-primary-50 relative overflow-hidden">
      {/* Navigation */}
      <Header scrollY={scrollY} />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop={false}
          poster="/masonory(17).jpg"
          onTimeUpdate={e => {
            const video = e.currentTarget;
            if (video.currentTime >= 50) {
              video.pause();
            }
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img
            src="/masonory(17).jpg"
            alt="Sri Lanka Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

        </video>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-20 w-32 h-32 bg-warning-500/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div
            className="absolute bottom-32 right-32 w-48 h-48 bg-accent-500/15 rounded-full blur-3xl"
            style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
          />
        </div>

        {/* Left Bottom Content */}
        <div className="absolute bottom-16 left-0 text-left text-white z-20 max-w-4xl px-6 lg:px-8">
          <h1 className="text-7xl font-bold mb-4 leading-tight font-serif text-warning-400">
            Discover <span className="text-white">Pearl of the Indian Ocean</span>
          </h1>
          <p className="text-2xl mb-4 text-white max-w-2xl leading-relaxed">
            • Ancient Kingdoms • Pristine Beaches • Misty Mountains • Wildlife Safaris
          </p>

          {/* White Divider */}
          <div className="w-56 h-0.5 bg-white mb-4"></div>

          {/* Local Time and Date Display */}
          <div className="flex space-x-4">
            {/* Local Time Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-1">Local Time</p>
                <p className="text-white text-2xl font-bold">
                  {currentTime.toLocaleString('en-US', {
                    timeZone: 'Asia/Colombo',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </p>
              </div>
            </div>

            {/* Local Date Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-1">Today's Date</p>
                <p className="text-white text-2xl font-bold">
                  {currentTime.toLocaleString('en-US', {
                    timeZone: 'Asia/Colombo',
                    month: 'numeric',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tour Packages Section with ScrollStack */}
      <section
        className="pt-16 pb-32 bg-primary-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-secondary-900 mb-8 font-serif">
              Luxury <span className="text-warning-400">Destinations</span>
            </h2>
            <p className="text-2xl text-secondary-800 max-w-4xl mx-auto leading-relaxed">
              Discover the incredible diversity of Sri Lanka - from ancient kingdoms and pristine beaches
              to misty mountains and wildlife safaris across this island paradise
            </p>
          </div>

          {/* Tour Carousel Container */}
          <TourCarousel
            packages={packages}
            className="mx-auto"
          />
        </div>
      </section>

      <section
        className="py-16 relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-secondary-900"
        style={{ minHeight: '100vh', height: 'auto' }}
      >
        {/* Optimized Masonry Background - Reduced images and better performance */}
        <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
          <div
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-1 w-full min-h-full"
            style={{ willChange: 'transform', containIntrinsicSize: '100vw 100vh' }}
          >
            {Array.from({ length: 36 }).map((_, i) => {
              const imgNum = (i % 16) + 1;
              return (
                <div key={i} className="break-inside-avoid mb-1">
                  <LazyLoadImage
                    src={`/masonory(${imgNum}).jpg`}
                    alt="Heritage"
                    className="w-full h-auto"
                    effect="opacity"
                    loading="lazy"
                    decoding="async"
                    width="100%"
                    height="auto"
                    style={{ contentVisibility: 'auto' }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Simplified Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/50 to-primary-900/60"></div>

        {/* Optimized Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-400/10 rounded-full blur-2xl animate-pulse z-25"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent-400/10 rounded-full blur-xl animate-pulse delay-1000 z-25"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-secondary-300"></div>
              <i className="ri-crown-2-line text-4xl text-secondary-300"></i>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-secondary-300"></div>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif tracking-wide">
              Island <span className="text-warning-400">Heritage</span>
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience 2,500 years of magnificent civilization across the Pearl of the Indian Ocean
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20 lg:items-center">
            {/* Left Column - Highlights */}
            <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
              {/* UNESCO Sites */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                    <i className="ri-medal-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-secondary-200 transition-colors">8 UNESCO Sites</h4>
                    <p className="text-white/70 text-sm">World Heritage Status</p>
                  </div>
                </div>
                <p className="text-white/85 leading-relaxed">
                  From ancient cities of Anuradhapura and Polonnaruwa to the fortress of Sigiriya - more heritage sites than most countries.
                </p>
              </div>

              {/* Ancient Kingdoms */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                    <i className="ri-building-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-secondary-200 transition-colors">Ancient Kingdoms</h4>
                    <p className="text-white/70 text-sm">2,500 Years of History</p>
                  </div>
                </div>
                <p className="text-white/85 leading-relaxed">
                  Explore magnificent ruins of ancient capitals, from sacred Anuradhapura to the sky palace of Sigiriya.
                </p>
              </div>

              {/* Biodiversity Hotspot */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                    <i className="ri-leaf-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-secondary-200 transition-colors">Biodiversity Hotspot</h4>
                    <p className="text-white/70 text-sm">26 National Parks</p>
                  </div>
                </div>
                <p className="text-white/85 leading-relaxed">
                  Home to leopards, elephants, blue whales, and endemic species found nowhere else on Earth.
                </p>
              </div>

              {/* Diverse Landscapes */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                    <i className="ri-landscape-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-secondary-200 transition-colors">Diverse Landscapes</h4>
                    <p className="text-white/70 text-sm">From Beaches to Mountains</p>
                  </div>
                </div>
                <p className="text-white/85 leading-relaxed">
                  Pristine beaches, misty tea plantations, tropical rainforests, and arid plains - all within a few hours' drive.
                </p>
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/30 hover:border-white/40 transition-all duration-500 group shadow-xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-32 h-24 rounded-lg flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <LazyLoadImage
                      src="/sri-Lanka-Flag.jpeg"
                      alt="Sri Lanka Flag"
                      effect="blur"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white font-serif">
                      Sri Lanka - Serendipity
                    </h3>
                    <p className="text-white/70 text-base lg:text-lg">The Original Name That Inspired "Serendipity"</p>
                  </div>
                </div>

                <div className="space-y-6 lg:space-y-8 text-white/90 leading-relaxed text-base lg:text-lg">
                  <div className="relative pl-8 border-l-2 border-secondary-300/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary-400 rounded-full"></div>
                    <p className="font-medium text-secondary-200 mb-2">Ancient Civilizations & Sacred Sites</p>
                    <p>
                      From the sacred city of Anuradhapura, where Buddhism first took root 2,300 years ago,
                      to the sky fortress of Sigiriya with its breathtaking frescoes. Sri Lanka preserves
                      magnificent remnants of ancient kingdoms that once ruled vast trading empires.
                    </p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-secondary-300/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary-400 rounded-full"></div>
                    <p className="font-medium text-secondary-200 mb-2">Natural Wonders & Wildlife</p>
                    <p>
                      Witness blue whales off the southern coast, leopards in Yala National Park, and
                      elephants roaming freely. The island's biodiversity rivals countries ten times its size,
                      with pristine beaches, misty mountains, and tropical rainforests.
                    </p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-primary-300/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-400 rounded-full"></div>
                    <p className="font-medium text-primary-200 mb-2">Tea Plantations & Hill Country</p>
                    <p>
                      Journey through emerald tea estates that have produced the world's finest Ceylon tea
                      for over 150 years. Take the scenic train through misty mountains to charming colonial
                      towns like Ella and Nuwara Eliya, where time seems to stand still.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-white/5 to-transparent rounded-2xl p-6 mt-8 border-l-4 border-secondary-400">
                    <div className="flex items-start space-x-4">
                      <i className="ri-heart-3-line text-2xl text-secondary-300 mt-1"></i>
                      <div>
                        <h5 className="text-xl font-semibold text-secondary-200 mb-2">The Warmth of Sri Lankan Hospitality</h5>
                        <p className="text-white/85">
                          Experience the genuine warmth of Sri Lankan people, renowned worldwide for their hospitality.
                          From fishermen sharing stories on pristine beaches to tea pluckers welcoming you to their
                          mountain villages, every encounter enriches your journey through this island paradise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-12 lg:px-16 py-4 lg:py-6 rounded-full font-bold text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl hover:shadow-accent-500/25 flex items-center space-x-4 group">
                <i className="ri-compass-3-line text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                <span>Discover Sri Lanka</span>
                <i className="ri-map-pin-2-line text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Card Testimonials Section */}
      <section
        className="py-20 bg-gradient-to-b from-secondary-50/30 to-neutral-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-0">
            <h2 className="text-6xl font-bold text-secondary-900 mb-8 font-serif">
              Happy <span className="text-warning-400">Testimonials</span>
            </h2>
            <p className="text-2xl text-secondary-800 max-w-4xl mx-auto leading-relaxed">
              Discover what our distinguished guests say about their extraordinary Sri Lanka experiences
            </p>
          </div>

          {/* Testimonial Carousel */}
          <TestimonialCarousel
            testimonials={testimonials}
            className="mx-auto"
          />

          {/* Trust Building Section */}
          <div className="mt-24">
            <div className="text-center mb-20">
              <h3 className="text-6xl font-bold text-secondary-900 mb-8 font-serif">
                Why Choose <span className="text-warning-400">Our Service</span>
              </h3>
              <p className="text-2xl text-secondary-800 max-w-4xl mx-auto leading-relaxed">
                Experience unparalleled luxury and reliability with our premium tour services
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-accent-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* 24/7 Service */}
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-customer-service-2-line text-blue-500 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-secondary-900 mb-3 font-serif">24/7 Support</h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    Round-the-clock assistance from our dedicated customer service team for your peace of mind
                  </p>
                </div>

                {/* Experienced Guides */}
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-guide-line text-blue-500 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-secondary-900 mb-3 font-serif">Expert Guides</h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    Certified local guides with 10+ years experience and deep cultural knowledge of Kandy
                  </p>
                </div>

                {/* Safety & Security */}
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-shield-check-line text-blue-500 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-secondary-900 mb-3 font-serif">Safety First</h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    Fully insured tours with comprehensive safety protocols and emergency support systems
                  </p>
                </div>

                {/* Premium Experience */}
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-vip-crown-line text-blue-500 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-secondary-900 mb-3 font-serif">VIP Treatment</h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    Exclusive access to premium venues, luxury transportation, and personalized experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Booking Form */}
      <section
        className="min-h-screen flex items-center relative py-8"
        style={{
          backgroundImage: `linear-gradient(rgba(8, 47, 73, 0.9), rgba(27, 51, 67, 0.8)), url('/masonory(4).jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: 'scaleX(-1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full" style={{ transform: 'scaleX(-1)' }}>
          {/* Adding the inverse transform to the content container to keep content normal */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Header */}
            <div className="text-left">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-serif text-left md:text-left sm:text-center">
                Plan Your <span className="text-warning-400">Sri Lankan Adventure</span>
              </h2>
              <p className="text-xl text-white/95 mb-8 leading-relaxed text-left md:text-left sm:text-center">
                Let us curate your perfect island journey across Sri Lanka's diverse destinations
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <i className="ri-shield-check-line text-secondary-300 text-2xl"></i>
                    <div>
                      <h4 className="text-white font-bold">Secure Booking</h4>
                      <p className="text-white/80 text-sm">100% Protected</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <i className="ri-time-line text-secondary-300 text-2xl"></i>
                    <div>
                      <h4 className="text-white font-bold">Quick Response</h4>
                      <p className="text-white/80 text-sm">Within 24 hours</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <i className="ri-award-line text-secondary-300 text-2xl"></i>
                    <div>
                      <h4 className="text-white font-bold">Premium Service</h4>
                      <p className="text-white/80 text-sm">5-Star Experience</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <i className="ri-money-dollar-circle-line text-secondary-300 text-2xl"></i>
                    <div>
                      <h4 className="text-white font-bold">Best Price</h4>
                      <p className="text-white/80 text-sm">No Hidden Fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Compact Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-readdy-form
                id="kandy-luxury-booking"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 placeholder:text-black"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 placeholder:text-black"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 placeholder:text-black"
                      placeholder="Your phone"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Traveling Details
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-white/90 mb-1">Adults</label>
                      <input
                        type="number"
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/90 mb-1">Children</label>
                      <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/90 mb-1">Infants</label>
                      <input
                        type="number"
                        name="infants"
                        value={formData.infants}
                        onChange={handleInputChange}
                        min="0"
                        max="3"
                        className="w-full px-3 py-2 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Special Requests & Preferences
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={400}
                    rows={4}
                    className="w-full px-3 py-3 bg-primary-50/50 border-2 border-primary-300/50 rounded-lg text-sm text-primary-800 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-100/50 transition-all duration-300 resize-none placeholder:text-black"
                    placeholder="Tell us about your preferences, dietary requirements, special occasions, accessibility needs, or any other requests to make your luxury experience perfect..."
                  />
                  <div className="text-right text-xs text-white/80 mt-1">
                    {formData.message.length}/400 characters
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-500 to-accent-500 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-3 rounded-lg text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <i className="ri-map-2-line text-lg"></i>
                    <span>Plan My Journey</span>
                  </span>
                </button>

                <p className="text-white/90 text-center text-xs">
                  Our Sri Lanka specialists will contact you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
