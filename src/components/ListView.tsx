import React from 'react';
import { Search, MapPin, Calendar, Compass, ArrowUpRight, Check, X, Filter, Map } from 'lucide-react';
import { Journey, FilterState, DestinationCountry } from '../types';
import { DESTINATION_COUNTRIES } from '../data/destinations';

interface ListViewProps {
  journeys: Journey[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectJourney: (journey: Journey) => void;
  onViewOnMap: (journey: Journey) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  journeys,
  filters,
  onFilterChange,
  onSelectJourney,
  onViewOnMap,
}) => {
  // Available regions for current country
  const currentCountry = DESTINATION_COUNTRIES.find((c) => c.id === filters.countryId);
  const availableRegions = currentCountry ? currentCountry.regions : [];

  // Clear a specific filter
  const clearCountry = () => onFilterChange({ ...filters, countryId: null, regionId: null });
  const clearRegion = () => onFilterChange({ ...filters, regionId: null });
  const clearActivity = () => onFilterChange({ ...filters, activityLevel: null });
  const clearAll = () =>
    onFilterChange({
      countryId: null,
      regionId: null,
      season: 'all',
      activityLevel: null,
      searchQuery: '',
    });

  const hasActiveFilters =
    filters.countryId !== null ||
    filters.regionId !== null ||
    filters.activityLevel !== null ||
    filters.searchQuery !== '';

  return (
    <div id="scheduled-journeys-list-view" className="space-y-6">
      {/* 1. Filter Bar (Matching Slow Cyclist Website UI) */}
      <div className="bg-[#f8f6f0] p-4 rounded-2xl border border-[#ded4c3] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a9b92] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by destination or name..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white rounded-xl border border-[#ded4c3] text-[#2b3330] placeholder-[#8a9b92] focus:outline-none focus:border-[#df8b53]"
            />
          </div>

          {/* Destination Dropdown */}
          <div>
            <select
              value={filters.countryId || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  countryId: e.target.value || null,
                  regionId: null, // Reset region when country changes
                })
              }
              className="w-full px-3 py-2.5 text-xs bg-white rounded-xl border border-[#ded4c3] text-[#2b3330] focus:outline-none focus:border-[#df8b53]"
            >
              <option value="">All Destinations</option>
              {DESTINATION_COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.journeyCount})
                </option>
              ))}
            </select>
          </div>

          {/* Region Dropdown (if country is selected) */}
          <div>
            <select
              value={filters.regionId || ''}
              onChange={(e) => onFilterChange({ ...filters, regionId: e.target.value || null })}
              disabled={!filters.countryId}
              className={`w-full px-3 py-2.5 text-xs rounded-xl border border-[#ded4c3] focus:outline-none focus:border-[#df8b53] ${
                filters.countryId ? 'bg-white text-[#2b3330]' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <option value="">All Regions</option>
              {availableRegions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Level Dropdown */}
          <div>
            <select
              value={filters.activityLevel || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  activityLevel: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2.5 text-xs bg-white rounded-xl border border-[#ded4c3] text-[#2b3330] focus:outline-none focus:border-[#df8b53]"
            >
              <option value="">Any Activity Level</option>
              <option value="2">Gentle (Level 2)</option>
              <option value="3">Moderate (Level 3)</option>
              <option value="4">Challenging (Level 4)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#e8dfcf]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#57665e]">Active Filters:</span>
            {filters.countryId && (
              <button
                onClick={clearCountry}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#ede5d6] text-[#2b3330] rounded-full hover:bg-[#e4dcce] transition-colors"
              >
                <span>{DESTINATION_COUNTRIES.find((c) => c.id === filters.countryId)?.name}</span>
                <X className="w-3 h-3 text-[#7a8a81]" />
              </button>
            )}

            {filters.regionId && (
              <button
                onClick={clearRegion}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#ede5d6] text-[#2b3330] rounded-full hover:bg-[#e4dcce] transition-colors"
              >
                <span>
                  {availableRegions.find((r) => r.id === filters.regionId)?.name || filters.regionId}
                </span>
                <X className="w-3 h-3 text-[#7a8a81]" />
              </button>
            )}

            {filters.activityLevel && (
              <button
                onClick={clearActivity}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#ede5d6] text-[#2b3330] rounded-full hover:bg-[#e4dcce] transition-colors"
              >
                <span>Level {filters.activityLevel}</span>
                <X className="w-3 h-3 text-[#7a8a81]" />
              </button>
            )}

            {filters.searchQuery && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[#ede5d6] text-[#2b3330] rounded-full">
                <span>"{filters.searchQuery}"</span>
                <X
                  className="w-3 h-3 text-[#7a8a81] cursor-pointer"
                  onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                />
              </span>
            )}

            {!hasActiveFilters && (
              <span className="text-xs text-[#8a9991]">Showing all journeys</span>
            )}

            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-[#df8b53] hover:underline font-semibold ml-2"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-[#57665e]">
            {journeys.length} {journeys.length === 1 ? 'Journey' : 'Journeys'} found
          </div>
        </div>
      </div>

      {/* 2. Journey Cards Grid */}
      {journeys.length === 0 ? (
        <div className="text-center py-16 bg-[#f8f6f0] rounded-2xl border border-[#ded4c3] p-8">
          <MapPin className="w-10 h-10 text-[#8a9b92] mx-auto mb-3" />
          <h3 className="font-editorial text-2xl font-bold text-[#2b3330]">
            No journeys match these criteria
          </h3>
          <p className="text-sm text-[#66766e] mt-1 max-w-md mx-auto">
            Try resetting your filters or search keywords to view all of our journeys across Europe and beyond.
          </p>
          <button
            onClick={clearAll}
            className="mt-4 px-6 py-2.5 bg-[#df8b53] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#d07b43] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeys.map((j) => (
            <div
              key={j.id}
              className="group bg-[#f8f6f0] rounded-2xl overflow-hidden border border-[#ded4c3] hover:border-[#df8b53] transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              {/* Image with zoom effect */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={j.heroImage}
                  alt={j.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider bg-[#f8f6f0]/90 backdrop-blur-xs text-[#2b3330] px-2.5 py-1 rounded-md shadow-xs">
                    {j.regionName}, {j.countryName}
                  </span>
                  {j.isSoldOut && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2b3330] text-[#f8f6f0] px-2 py-0.5 rounded shadow-xs">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Quick action: View on Map */}
                <button
                  onClick={() => onViewOnMap(j)}
                  className="absolute bottom-3 right-3 bg-[#2b3330]/90 hover:bg-[#1f2523] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md transition-all group-hover:scale-105"
                  title="View route and overnights on discovery map"
                >
                  <Map className="w-3.5 h-3.5 text-[#df8b53]" />
                  <span>View on Map</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Category & Activity Level */}
                  <div className="flex items-center justify-between text-xs text-[#718279] mb-1.5">
                    <span className="font-bold tracking-wider uppercase text-[#df8b53] text-[11px]">
                      {j.category} &middot; {j.mode}
                    </span>
                    <div className="flex items-center gap-1" title={`Activity Level ${j.activityLevel} of 5`}>
                      <span className="text-[10px] uppercase font-semibold">Level</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`w-1.5 h-1.5 rounded-full ${
                              lvl <= j.activityLevel ? 'bg-[#df8b53]' : 'bg-[#d6ccb9]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectJourney(j)}
                    className="font-editorial text-2xl font-bold text-[#232a27] hover:text-[#df8b53] cursor-pointer transition-colors leading-tight"
                  >
                    {j.title}
                  </h3>

                  <p className="text-xs text-[#5d6e64] mt-2 line-clamp-2 leading-relaxed">
                    {j.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8dfcf] space-y-3">
                  {/* Dates & Duration */}
                  <div className="flex items-center justify-between text-xs text-[#44514a]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#df8b53]" />
                      <span className="font-semibold">{j.dates}</span>
                    </div>
                    <span>{j.durationNights} Nights</span>
                  </div>

                  {/* Price & Primary CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-[#718279] uppercase block font-medium">Price from</span>
                      <span className="text-base font-bold text-[#232a27]">
                        £{j.priceFrom.toLocaleString()} <span className="text-xs font-normal text-[#718279]">/ person</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectJourney(j)}
                      className="px-4 py-2 bg-[#df8b53] hover:bg-[#cf7c45] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs transition-all hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {j.isSoldOut ? 'View Dates' : 'Explore'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
