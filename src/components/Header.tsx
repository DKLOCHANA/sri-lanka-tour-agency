import { Link } from 'react-router-dom';
import { memo, useState } from 'react';

interface HeaderProps {
    scrollY: number;
}

function Header({ scrollY }: HeaderProps) {
    // Mobile menu state
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg border-b transition-all duration-300 ${scrollY > 100
            ? 'bg-white border-gray-200'
            : 'bg-white/10 backdrop-blur-xl border-white/20'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <div className={`text-3xl font-bold font-serif transition-colors duration-300 ${scrollY > 100 ? 'text-secondary-900' : 'text-white'
                            }`}>
                            <span className="text-warning-400">Ceylon </span>Travels
                        </div>
                    </div>
                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`font-medium text-lg transition-colors cursor-pointer px-4 py-2 rounded-full border ${scrollY > 100
                            ? 'text-warning-400 hover:text-warning-400 bg-secondary-100 border-secondary-200'
                            : 'text-warning-400 hover:text-warning-400 bg-white/20 backdrop-blur-sm border-white/30'
                            }`}>
                            Home
                        </Link>
                        <Link to="/destinations" className={`font-medium text-lg transition-colors cursor-pointer px-4 py-2 rounded-full hover:border ${scrollY > 100
                            ? 'text-secondary-700 hover:text-warning-400 hover:bg-secondary-100 hover:border-secondary-200'
                            : 'text-white hover:text-warning-400 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30'
                            }`}>
                            Destinations
                        </Link>
                        <Link to="/tours" className={`font-medium text-lg transition-colors cursor-pointer px-4 py-2 rounded-full hover:border ${scrollY > 100
                            ? 'text-secondary-700 hover:text-warning-400 hover:bg-secondary-100 hover:border-secondary-200'
                            : 'text-white hover:text-warning-400 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30'
                            }`}>
                            Tours
                        </Link>
                        <Link to="/heritage" className={`font-medium text-lg transition-colors cursor-pointer px-4 py-2 rounded-full hover:border ${scrollY > 100
                            ? 'text-secondary-700 hover:text-warning-400 hover:bg-secondary-100 hover:border-secondary-200'
                            : 'text-white hover:text-warning-400 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30'
                            }`}>
                            Contact Us
                        </Link>
                        <Link to="/about" className={`font-medium text-lg transition-colors cursor-pointer px-4 py-2 rounded-full hover:border ${scrollY > 100
                            ? 'text-secondary-700 hover:text-warning-400 hover:bg-secondary-100 hover:border-secondary-200'
                            : 'text-white hover:text-warning-400 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30'
                            }`}>
                            About Us
                        </Link>
                        <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap shadow-lg border-2 border-white/50">
                            <span>Plan Your Journey</span>
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                    {/* Mobile menu icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-3xl text-white  "
                            aria-label="Open menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <i className="ri-menu-line"></i>
                        </button>
                        {/* Mobile dropdown menu */}
                        {menuOpen && (
                            <div className="absolute top-20 left-0 right-0 w-full bg-white rounded-none shadow-2xl border-t border-secondary-200 z-50 animate-fade-in">
                                <div className="flex flex-col py-4">
                                    <Link to="/" className="px-6 py-3 text-secondary-900 font-semibold hover:bg-secondary-50 rounded-xl transition-colors">Home</Link>
                                    <Link to="/destinations" className="px-6 py-3 text-secondary-900 font-semibold hover:bg-secondary-50 rounded-xl transition-colors">Destinations</Link>
                                    <Link to="/tours" className="px-6 py-3 text-secondary-900 font-semibold hover:bg-secondary-50 rounded-xl transition-colors">Tours</Link>
                                    <Link to="/heritage" className="px-6 py-3 text-secondary-900 font-semibold hover:bg-secondary-50 rounded-xl transition-colors">Contact Us</Link>
                                    <Link to="/about" className="px-6 py-3 text-secondary-900 font-semibold hover:bg-secondary-50 rounded-xl transition-colors">About Us</Link>
                                    <button className="mt-4 mx-6 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer whitespace-nowrap shadow-lg border-2 border-accent-400">
                                        <span>Plan Your Journey</span>
                                        <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default memo(Header)