import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="mt-20 border-t border-[#e2d8c7] bg-[#f8f6f0]">
      {/* 1. Three Iconic Colored Slow Cyclist Banner Strips (from screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-[#2b3330] font-editorial text-2xl font-bold">
        <a
          href="#explore"
          className="bg-[#f5c3af] hover:bg-[#eeb49e] py-8 px-8 flex items-center justify-between transition-colors group"
        >
          <span>Our Trips</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
        </a>
        <a
          href="#explore"
          className="bg-[#9db0a5] hover:bg-[#8ea297] py-8 px-8 flex items-center justify-between transition-colors group text-white"
        >
          <span>Private Journeys</span>
          <span className="text-3xl font-light leading-none">+</span>
        </a>
        <a
          href="#explore"
          className="bg-[#dc9f66] hover:bg-[#d09156] py-8 px-8 flex items-center justify-between transition-colors group text-white"
        >
          <span>Destinations</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
        </a>
      </div>

      {/* 2. Slow Journal Newsletter Signup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#e5dcce]">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#df8b53]">
            The Slow Journal
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#232a27]">
            Five minutes of inspiration, every other week.
          </h3>
          <p className="text-sm text-[#617167] max-w-lg mx-auto leading-relaxed">
            Stories of quiet roads, local recipes, behind-the-scenes travel dispatches, and early access to new departures.
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#ede5d6] rounded-xl text-xs font-semibold text-[#2b3330] flex items-center justify-center gap-2 mt-4">
              <CheckCircle2 className="w-4 h-4 text-[#df8b53]" />
              <span>Thank you for subscribing to The Slow Journal.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-xs bg-white rounded-full border border-[#ded4c3] text-[#2b3330] placeholder-[#8a9a91] focus:outline-none focus:border-[#df8b53]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#df8b53] hover:bg-[#cf7c45] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Navigation Columns & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs text-[#526259]">
          <div>
            <h4 className="font-editorial text-base font-bold text-[#232a27] uppercase tracking-wider mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#explore" className="hover:text-[#df8b53]">Italy</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Spain</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Greece</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Armenia</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Portugal</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Romania</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Norway</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Rwanda</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-base font-bold text-[#232a27] uppercase tracking-wider mb-4">
              Our Journeys
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#explore" className="hover:text-[#df8b53]">Scheduled Departures</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Private Bespoke Journeys</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Walking & Trekking</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">E-Bike Touring</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Family Departures</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-base font-bold text-[#232a27] uppercase tracking-wider mb-4">
              Useful Info
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#explore" className="hover:text-[#df8b53]">Brochure Request</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Activity Levels Guide</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Our Bikes & Equipment</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Travel Insurance</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-base font-bold text-[#232a27] uppercase tracking-wider mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#explore" className="hover:text-[#df8b53]">Our Philosophy</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">The Team in Oxford</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Local Guides</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">B Corp & Sustainability</a></li>
              <li><a href="#explore" className="hover:text-[#df8b53]">Careers</a></li>
            </ul>
          </div>

          {/* Condé Nast Traveller Badge */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 border-t lg:border-t-0 pt-6 lg:pt-0 border-[#e5dcce]">
            <div className="p-4 bg-white rounded-2xl border border-[#ded4c3] text-center space-y-2 shadow-xs">
              <Award className="w-8 h-8 text-[#df8b53] mx-auto" />
              <div className="font-editorial text-lg font-bold text-[#232a27]">
                Condé Nast Traveller
              </div>
              <p className="text-[10px] text-[#718279] uppercase tracking-widest font-semibold">
                Top Travel Specialist &middot; 2025
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & phone */}
        <div className="mt-12 pt-8 border-t border-[#e5dcce] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#788880] gap-4">
          <div>
            &copy; {new Date().getFullYear()} The Slow Cyclist Ltd. All rights reserved. Registered in England & Wales.
          </div>
          <div className="flex items-center gap-6 font-medium">
            <span>Oxford, UK &middot; 01865 410 356</span>
            <a href="mailto:explore@theslowcyclist.com" className="hover:text-[#2b3330]">
              explore@theslowcyclist.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
