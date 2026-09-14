import React, { useState } from 'react';
import { ChevronDown, Search, Phone, Mail, X } from 'lucide-react';

interface HeaderProps {
  onExploreClick?: () => void;
  onDestinationSelect?: (countryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onDestinationSelect }) => {
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const destinationsList = [
    { id: 'italy', name: 'Italy' },
    { id: 'spain', name: 'Spain' },
    { id: 'greece', name: 'Greece' },
    { id: 'armenia', name: 'Armenia' },
    { id: 'portugal', name: 'Portugal' },
    { id: 'romania', name: 'Romania' },
    { id: 'norway', name: 'Norway' },
    { id: 'poland', name: 'Poland' },
    { id: 'rwanda', name: 'Rwanda' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#e6decb] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#explore"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#df8b53]"
            title="The Slow Cyclist"
          >
            {/* Custom SVG logo based on The Slow Cyclist badge from screenshots */}
            <div className="w-11 h-11 rounded-full border border-[#2b3330]/80 flex items-center justify-center text-[#2b3330] p-1.5 transition-transform duration-300 group-hover:scale-105 bg-white/40">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-full h-full">
                {/* Vintage Bicycle with sun & hills in wheels */}
                <circle cx="20" cy="42" r="14" strokeWidth="2.5" />
                <circle cx="44" cy="42" r="14" strokeWidth="2.5" />
                <path d="M12 42 Q 20 33 28 42" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
                <path d="M36 42 Q 44 33 52 42" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
                {/* Bike Frame */}
                <path d="M20 42 L 29 26 L 42 26 L 44 42" strokeWidth="2.5" />
                <path d="M29 26 L 35 42 L 20 42" strokeWidth="2.5" />
                {/* Saddle & Handlebars */}
                <path d="M26 22 L 31 22" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M29 26 L 28 22" strokeWidth="2.5" />
                <path d="M40 20 Q 43 20 44 26" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="35" cy="42" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-2xl tracking-wide uppercase font-semibold text-[#2b3330] leading-none">
                The Slow Cyclist
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#6f7c75] mt-1 font-medium">
                Paced Travel &middot; Est. 2015
              </span>
            </div>
          </a>
        </div>

        {/* Center Main Nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-[#2b3330]">
          <div className="relative group">
            <button className="flex items-center gap-1.5 hover:text-[#df8b53] transition-colors py-2 focus:outline-none">
              <span>Our Trips</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-[#f8f6f0] border border-[#e4dcce] rounded-lg shadow-xl p-3 w-52 text-sm">
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330] font-medium">Scheduled Journeys</a>
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330] font-medium">Private Journeys</a>
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330] font-medium">Walking Safaris & Treks</a>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setDestMenuOpen(!destMenuOpen)}
              className="flex items-center gap-1.5 hover:text-[#df8b53] transition-colors py-2 focus:outline-none"
            >
              <span>Destinations</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${destMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {destMenuOpen && (
              <div className="absolute left-0 top-full mt-2 bg-[#f8f6f0] border border-[#e4dcce] rounded-xl shadow-2xl p-4 w-64 z-50 text-sm">
                <div className="text-[11px] uppercase tracking-wider text-[#798a81] font-semibold px-2 py-1 mb-1">
                  Explore by Country
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {destinationsList.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        onDestinationSelect?.(d.id);
                        setDestMenuOpen(false);
                      }}
                      className="text-left px-2.5 py-2 rounded hover:bg-[#ece4d5] text-[#2b3330] transition-colors"
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#explore" className="hover:text-[#df8b53] transition-colors">
            Stories
          </a>

          <div className="relative group">
            <button className="flex items-center gap-1.5 hover:text-[#df8b53] transition-colors py-2 focus:outline-none">
              <span>About Us</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-[#f8f6f0] border border-[#e4dcce] rounded-lg shadow-xl p-3 w-48 text-sm">
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330]">Our Philosophy</a>
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330]">Team & Guides</a>
                <a href="#explore" className="block px-3 py-2 rounded hover:bg-[#eae3d4] text-[#2b3330]">Slow Journal</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Section: Contact & CTA */}
        <div className="flex items-center space-x-6 text-sm">
          <a
            href="tel:01865410356"
            className="hidden md:flex items-center gap-2 text-[#46534d] hover:text-[#2b3330] transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#df8b53]" />
            <span>01865 410 356</span>
          </a>

          <a
            href="mailto:explore@theslowcyclist.com"
            className="hidden sm:flex items-center gap-1.5 text-[#46534d] hover:text-[#2b3330] transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#df8b53]" />
            <span>Email us</span>
          </a>

          {/* Quick Search Toggle */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#2b3330] hover:text-[#df8b53] transition-colors rounded-full hover:bg-black/5"
              aria-label="Search journeys"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#f8f6f0] border border-[#e4dcce] rounded-xl shadow-xl p-3 flex items-center gap-2 z-50">
                <Search className="w-4 h-4 text-[#798a81]" />
                <input
                  type="text"
                  placeholder="Search Abruzzo, Rioja, Italy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent border-none focus:outline-none text-[#2b3330] placeholder-[#8c9c93]"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)} className="text-[#8c9c93] hover:text-[#2b3330]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Authentic Terracotta 'FIND A TRIP' Pill Button */}
          <a
            href="#explore"
            className="bg-[#df8b53] hover:bg-[#d07b43] text-white px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Find a Trip
          </a>
        </div>
      </div>
    </header>
  );
};
