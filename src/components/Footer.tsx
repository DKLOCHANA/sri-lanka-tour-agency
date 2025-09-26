import { Link } from 'react-router-dom';
import { memo } from 'react';


import { useState } from 'react';

function Footer() {
    const [navOpen, setNavOpen] = useState(false);
    const [packagesOpen, setPackagesOpen] = useState(false);
    const [policyOpen, setPolicyOpen] = useState(false);

    return (
        <footer className="bg-primary-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-6 gap-8 text-center lg:text-left">
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                        <div className="text-4xl font-bold text-secondary-300 mb-8 font-serif">
                            Ceylon Travels
                        </div>
                        <p className="text-primary-100 mb-8 leading-relaxed text-base max-w-xs mx-auto lg:mx-0">
                            Experience the epitome of luxury travel in Sri Lanka's cultural capital. We curate
                            exclusive experiences that showcase the sacred heritage, royal legacy, and natural
                            beauty of Kandy.
                        </p>
                        <div className="flex space-x-6 justify-center lg:justify-start">
                            <i className="ri-facebook-fill text-3xl hover:text-warning-400 cursor-pointer transition-colors"></i>
                            <i className="ri-instagram-line text-3xl hover:text-warning-400 cursor-pointer transition-colors"></i>
                            <i className="ri-whatsapp-line text-3xl hover:text-warning-400 cursor-pointer transition-colors"></i>
                            <i className="ri-tiktok-line text-3xl hover:text-warning-400 cursor-pointer transition-colors"></i>
                        </div>
                    </div>

                    {/* Navigation Dropdown */}
                    <div className="lg:hidden flex flex-col items-center">
                        <button
                            className="w-full text-left text-xl font-bold mb-2 text-secondary-300 font-serif flex items-center justify-between"
                            onClick={() => setNavOpen((v) => !v)}
                        >
                            Navigation
                            <span>{navOpen ? '▲' : '▼'}</span>
                        </button>
                        {navOpen && (
                            <ul className="space-y-3 text-primary-100 text-base pb-4">
                                <li><Link to="/" className="text-warning-400 cursor-pointer transition-colors">Home</Link></li>
                                <li><Link to="/experiences" className="hover:text-warning-400 cursor-pointer transition-colors">Experiences</Link></li>
                                <li><Link to="/heritage" className="hover:text-warning-400 cursor-pointer transition-colors">Heritage</Link></li>
                                <li><Link to="/luxury-stays" className="hover:text-warning-400 cursor-pointer transition-colors">Luxury Stays</Link></li>
                                <li><Link to="/about" className="hover:text-warning-400 cursor-pointer transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-warning-400 cursor-pointer transition-colors">Contact</Link></li>
                            </ul>
                        )}
                    </div>
                    <div className="hidden lg:block">
                        <h3 className="text-xl font-bold mb-6 text-secondary-300 font-serif">
                            Navigation
                        </h3>
                        <ul className="space-y-3 text-primary-100 text-base">
                            <li><Link to="/" className="text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0">Home</Link></li>
                            <li><Link to="/experiences" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Experiences</Link></li>
                            <li><Link to="/heritage" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Heritage</Link></li>
                            <li><Link to="/luxury-stays" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Luxury Stays</Link></li>
                            <li><Link to="/about" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Tour Packages Dropdown */}
                    <div className="lg:hidden flex flex-col items-center">
                        <button
                            className="w-full text-left text-xl font-bold mb-2 text-secondary-300 font-serif flex items-center justify-between"
                            onClick={() => setPackagesOpen((v) => !v)}
                        >
                            Tour Packages
                            <span>{packagesOpen ? '▲' : '▼'}</span>
                        </button>
                        {packagesOpen && (
                            <ul className="space-y-3 text-primary-100 text-base pb-4">
                                <li><Link to="/temple-tours" className="hover:text-warning-400 cursor-pointer transition-colors">Sacred Temple Tours</Link></li>
                                <li><Link to="/tea-heritage" className="hover:text-warning-400 cursor-pointer transition-colors">Royal Tea Heritage</Link></li>
                                <li><Link to="/cultural-dance" className="hover:text-warning-400 cursor-pointer transition-colors">Cultural Dance Shows</Link></li>
                                <li><Link to="/royal-palace" className="hover:text-warning-400 cursor-pointer transition-colors">Royal Palace Tours</Link></li>
                                <li><Link to="/botanical-gardens" className="hover:text-warning-400 cursor-pointer transition-colors">Botanical Gardens</Link></li>
                            </ul>
                        )}
                    </div>
                    <div className="hidden lg:block">
                        <h3 className="text-xl font-bold mb-6 text-secondary-300 font-serif">
                            Tour Packages
                        </h3>
                        <ul className="space-y-3 text-primary-100 text-base">
                            <li><Link to="/temple-tours" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Sacred Temple Tours</Link></li>
                            <li><Link to="/tea-heritage" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Royal Tea Heritage</Link></li>
                            <li><Link to="/cultural-dance" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Cultural Dance Shows</Link></li>
                            <li><Link to="/royal-palace" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Royal Palace Tours</Link></li>
                            <li><Link to="/botanical-gardens" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Botanical Gardens</Link></li>
                        </ul>
                    </div>

                    {/* Policy Details Dropdown */}
                    <div className="lg:hidden flex flex-col items-center">
                        <button
                            className="w-full text-left text-xl font-bold mb-2 text-secondary-300 font-serif flex items-center justify-between"
                            onClick={() => setPolicyOpen((v) => !v)}
                        >
                            Policy Details
                            <span>{policyOpen ? '▲' : '▼'}</span>
                        </button>
                        {policyOpen && (
                            <ul className="space-y-3 text-primary-100 text-base pb-4">
                                <li><Link to="/privacy-policy" className="hover:text-warning-400 cursor-pointer transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms-conditions" className="hover:text-warning-400 cursor-pointer transition-colors">Terms & Conditions</Link></li>
                                <li><Link to="/booking-policy" className="hover:text-warning-400 cursor-pointer transition-colors">Booking Policy</Link></li>
                                <li><Link to="/cancellation-policy" className="hover:text-warning-400 cursor-pointer transition-colors">Cancellation Policy</Link></li>
                                <li><Link to="/travel-insurance" className="hover:text-warning-400 cursor-pointer transition-colors">Travel Insurance</Link></li>
                                <li><Link to="/responsible-tourism" className="hover:text-warning-400 cursor-pointer transition-colors">Responsible Tourism</Link></li>
                            </ul>
                        )}
                    </div>
                    <div className="hidden lg:block">
                        <h3 className="text-xl font-bold mb-6 text-secondary-300 font-serif">
                            Policy Details
                        </h3>
                        <ul className="space-y-3 text-primary-100 text-base">
                            <li><Link to="/privacy-policy" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Terms & Conditions</Link></li>
                            <li><Link to="/booking-policy" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Booking Policy</Link></li>
                            <li><Link to="/cancellation-policy" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Cancellation Policy</Link></li>
                            <li><Link to="/travel-insurance" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Travel Insurance</Link></li>
                            <li><Link to="/responsible-tourism" className="hover:text-warning-400 cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-warning-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Responsible Tourism</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us (always visible) */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-xl font-bold mb-6 text-secondary-300 font-serif">
                            Contact Us
                        </h3>
                        <div className="space-y-4 text-primary-100 text-base">
                            <div className="flex items-start space-x-3">
                                <i className="ri-map-pin-line text-secondary-300 mt-1 text-lg"></i>
                                <span>Queen's Hotel City,<br />Kandy<br /> Sri Lanka, 20000</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <i className="ri-phone-line text-secondary-300 text-lg"></i>
                                <span>+94 81 223 3026</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <i className="ri-mail-line text-secondary-300 text-lg"></i>
                                <span>luxury@kandyroyal.lk</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-600 mt-12 pt-8">
                    <p className="text-primary-200 text-sm text-center">
                        © 2025 Ceylon Travels. All rights reserved. Licensed by Sri Lanka Tourism Development Authority.
                    </p>
                    <p className="text-primary-200 text-sm text-center">
                        <br />
                        Developed by <a href="https://www.linkedin.com/in/dklochana/" target="_blank" rel="noopener noreferrer" className="text-warning-400 hover:underline">Lochana Edirisooriya</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer)