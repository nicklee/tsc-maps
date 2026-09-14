import React, { useState, useMemo } from 'react';
import { Map as MapIcon, List, Compass, Filter } from 'lucide-react';
import { Header } from './components/Header';
import { MapCanvas } from './components/MapCanvas';
import { JourneyPreviewCard } from './components/JourneyPreviewCard';
import { ListView } from './components/ListView';
import { Footer } from './components/Footer';
import { DESTINATION_COUNTRIES, JOURNEYS } from './data/destinations';
import { FilterState, Journey } from './types';

export function App() {
  // View mode: 'map' | 'list'
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Shared geographic state
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(JOURNEYS[0]);

  // Additional list filters
  const [filters, setFilters] = useState<FilterState>({
    countryId: null,
    regionId: null,
    season: 'all',
    activityLevel: null,
    searchQuery: '',
  });

  // Keep filters in sync with map selections
  const handleSelectCountry = (countryId: string | null) => {
    setSelectedCountryId(countryId);
    setFilters((prev) => ({ ...prev, countryId, regionId: null }));
    if (countryId) {
      const journeyInCountry = JOURNEYS.find((j) => j.countryId === countryId);
      if (journeyInCountry) {
        setSelectedJourney(journeyInCountry);
      }
    }
  };

  const handleSelectRegion = (regionId: string | null) => {
    setSelectedRegionId(regionId);
    setFilters((prev) => ({ ...prev, regionId }));
    if (regionId) {
      const journeyInRegion = JOURNEYS.find((j) => j.regionId === regionId);
      if (journeyInRegion) {
        setSelectedJourney(journeyInRegion);
      }
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setSelectedCountryId(newFilters.countryId);
    setSelectedRegionId(newFilters.regionId);
  };

  // Filtered journeys for List View
  const filteredJourneys = useMemo(() => {
    return JOURNEYS.filter((j) => {
      if (filters.countryId && j.countryId !== filters.countryId) return false;
      if (filters.regionId && j.regionId !== filters.regionId) return false;
      if (filters.activityLevel && j.activityLevel !== filters.activityLevel) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = j.title.toLowerCase().includes(q);
        const matchesRegion = j.regionName.toLowerCase().includes(q);
        const matchesCountry = j.countryName.toLowerCase().includes(q);
        const matchesDesc = j.shortDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesRegion && !matchesCountry && !matchesDesc) return false;
      }
      return true;
    });
  }, [filters]);

  // Jump straight to map for a journey
  const handleViewOnMap = (journey: Journey) => {
    setSelectedCountryId(journey.countryId);
    setSelectedRegionId(journey.regionId);
    setSelectedJourney(journey);
    setFilters((prev) => ({
      ...prev,
      countryId: journey.countryId,
      regionId: journey.regionId,
    }));
    setViewMode('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f0] text-[#2b3330]">
      {/* 1. Slow Cyclist Header */}
      <Header
        onDestinationSelect={(countryId) => {
          handleSelectCountry(countryId);
          setViewMode('map');
        }}
      />

      {/* 2. Main Page Header & Discovery Controls */}
      <main id="explore" className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="space-y-5">
          {/* Breadcrumb / Category header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5dcce] pb-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#df8b53]">
                <span>Discover</span>
                <span>&middot;</span>
                <span>The Slow Cyclist Cartography</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#232a27] tracking-tight">
                Explore our journeys
              </h1>
              <p className="text-sm text-[#5c6e64] leading-relaxed">
                Discover extraordinary places at a slower pace. Explore our hand-illustrated cartographic map or browse journeys by region.
              </p>
            </div>

            {/* View Switcher: Map vs List */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[#ebe4d4] p-1 rounded-full border border-[#ded4c3] flex items-center shadow-xs">
                <button
                  id="view-toggle-map"
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    viewMode === 'map'
                      ? 'bg-[#2b3330] text-white shadow-sm'
                      : 'text-[#5d6d64] hover:text-[#2b3330]'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>

                <button
                  id="view-toggle-list"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-[#2b3330] text-white shadow-sm'
                      : 'text-[#5d6d64] hover:text-[#2b3330]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Destination Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => {
                handleSelectCountry(null);
                setSelectedRegionId(null);
                setSelectedJourney(null);
              }}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCountryId === null
                  ? 'bg-[#df8b53] text-white font-bold shadow-xs'
                  : 'bg-[#ede6d7] text-[#4d5e55] hover:bg-[#e4dcce]'
              }`}
            >
              All Destinations ({JOURNEYS.length})
            </button>

            {DESTINATION_COUNTRIES.map((c) => {
              const isSelected = selectedCountryId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    handleSelectCountry(c.id);
                    setSelectedRegionId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#2b3330] text-white font-bold shadow-xs'
                      : 'bg-[#ede6d7] text-[#4d5e55] hover:bg-[#e4dcce]'
                  }`}
                >
                  {c.name} ({c.journeyCount})
                </button>
              );
            })}
          </div>

          {/* 3. Primary Content Area: Map View OR List View */}
          <div className="relative">
            {viewMode === 'map' ? (
              <div className="relative">
                {/* Geographically accurate, illustrated discovery map */}
                <MapCanvas
                  selectedCountryId={selectedCountryId}
                  selectedRegionId={selectedRegionId}
                  selectedJourneyId={selectedJourney?.id || null}
                  onSelectCountry={handleSelectCountry}
                  onSelectRegion={handleSelectRegion}
                  onSelectJourney={(j) => setSelectedJourney(j)}
                />

                {/* Floating Journey Preview Card (Interaction 3) */}
                <JourneyPreviewCard
                  journey={selectedJourney}
                  onClose={() => setSelectedJourney(null)}
                  onSwitchToList={() => setViewMode('list')}
                  onFlyToRoute={() => {
                    if (selectedJourney) {
                      handleSelectCountry(selectedJourney.countryId);
                      handleSelectRegion(selectedJourney.regionId);
                    }
                  }}
                />
              </div>
            ) : (
              /* Scheduled Journeys List View (Shared State) */
              <ListView
                journeys={filteredJourneys}
                filters={filters}
                onFilterChange={handleFilterChange}
                onSelectJourney={(j) => setSelectedJourney(j)}
                onViewOnMap={handleViewOnMap}
              />
            )}
          </div>
        </div>
      </main>

      {/* 4. Slow Cyclist Footer */}
      <Footer />
    </div>
  );
}
export default App;
