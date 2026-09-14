import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, Compass, CheckCircle2, ChevronRight, Share2, Heart, ArrowRight, Minimize2 } from 'lucide-react';
import { Journey } from '../types';

interface JourneyPreviewCardProps {
  journey: Journey | null;
  onClose: () => void;
  onSwitchToList: () => void;
  onFlyToRoute?: () => void;
}

export const JourneyPreviewCard: React.FC<JourneyPreviewCardProps> = ({
  journey,
  onClose,
  onSwitchToList,
  onFlyToRoute,
}) => {
  const [saved, setSaved] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  React.useEffect(() => {
    if (journey) {
      setIsMinimized(false);
    }
  }, [journey?.id]);

  if (!journey) return null;

  // Minimized floating card
  if (isMinimized) {
    return (
      <div className="absolute top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="bg-[#f8f6f0]/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#ded3c2] p-2 pr-3 flex items-center gap-3">
          <img
            src={journey.heroImage}
            alt={journey.title}
            className="w-12 h-12 rounded-xl object-cover border border-[#ded4c3] shadow-xs cursor-pointer"
            onClick={() => setIsMinimized(false)}
          />
          <div className="cursor-pointer" onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#df8b53]">
                {journey.regionName}
              </span>
              <span className="text-[10px] text-[#718279]">&middot; From £{journey.priceFrom.toLocaleString()}</span>
            </div>
            <h4 className="font-editorial text-base font-bold text-[#232a27] hover:text-[#df8b53] transition-colors leading-none">
              {journey.title}
            </h4>
          </div>
          <div className="flex items-center gap-1 pl-1 border-l border-[#ded4c3]">
            {onFlyToRoute && (
              <button
                onClick={onFlyToRoute}
                className="p-1.5 rounded-lg bg-[#2b3330] text-white hover:bg-[#1a201e] text-[11px] font-semibold"
                title="Zoom to Route"
              >
                <Compass className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg bg-[#ede5d6] text-[#2b3330] hover:bg-[#e3d9c7] text-[11px] font-semibold"
              title="Expand Details"
            >
              Expand
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7f8f86] hover:text-[#2b3330]"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="journey-preview-drawer"
        className="absolute top-4 right-4 bottom-4 w-full max-w-md bg-[#f8f6f0] rounded-2xl shadow-2xl border border-[#ded3c2] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300"
      >
        {/* Top Floating Control Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="bg-[#2b3330]/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full pointer-events-auto">
            {journey.category} Journey
          </span>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#2b3330] flex items-center justify-center transition-colors shadow-sm"
              title="Minimize panel"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#2b3330] flex items-center justify-center transition-colors shadow-sm"
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-[#df503b] text-[#df503b]' : ''}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Journey link copied to clipboard!');
              }}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#2b3330] flex items-center justify-center transition-colors shadow-sm"
              title="Share journey"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#2b3330] flex items-center justify-center transition-colors shadow-sm hover:rotate-90"
              title="Close preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image */}
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src={journey.heroImage}
              alt={journey.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f0] via-transparent to-black/30" />
            
            {/* Country & Region Breadcrumb Pill */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-[#df8b53] bg-[#2b3330]/90 backdrop-blur-xs px-2.5 py-1 rounded-md">
                {journey.regionName}, {journey.countryName}
              </span>
              {onFlyToRoute && (
                <button
                  onClick={onFlyToRoute}
                  className="text-xs font-bold uppercase tracking-wider text-white bg-[#df8b53] hover:bg-[#d07b43] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-colors"
                  title="Fly to Route"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore Route</span>
                </button>
              )}
            </div>
          </div>

          {/* Core Body Details */}
          <div className="p-5 pt-2 space-y-4">
            <div>
              <h2 className="font-editorial text-3xl font-bold tracking-wide text-[#232a27] leading-tight">
                {journey.title}
              </h2>
              <p className="text-sm text-[#5d6e64] mt-2 font-normal leading-relaxed">
                {journey.shortDescription}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-[#f0ebd9] rounded-xl border border-[#ded4c3] text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#718279] uppercase font-semibold">
                  <Clock className="w-3 h-3 text-[#df8b53]" />
                  <span>Duration</span>
                </div>
                <div className="text-sm font-bold text-[#232a27] mt-0.5">
                  {journey.durationNights} Nights
                </div>
              </div>

              <div className="border-x border-[#ded4c3]">
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#718279] uppercase font-semibold">
                  <Compass className="w-3 h-3 text-[#df8b53]" />
                  <span>Activity</span>
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={`w-2 h-2 rounded-full ${
                        level <= journey.activityLevel ? 'bg-[#df8b53]' : 'bg-[#cfc4b0]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#718279] uppercase font-semibold">
                  <DollarSign className="w-3 h-3 text-[#df8b53]" />
                  <span>Price</span>
                </div>
                <div className="text-sm font-bold text-[#232a27] mt-0.5">
                  From £{journey.priceFrom.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Dates & Mode */}
            <div className="flex items-center justify-between text-xs py-2 px-3 bg-white/70 rounded-lg border border-[#e8dfcf]">
              <div className="flex items-center gap-2 text-[#46534d]">
                <Calendar className="w-3.5 h-3.5 text-[#df8b53]" />
                <span className="font-semibold">{journey.dates}</span>
              </div>
              <span className="text-[#6d7e75] font-medium">{journey.mode}</span>
            </div>

            {/* Overnight Stays (Red Dot slow travel concept) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-editorial text-lg font-bold text-[#232a27]">
                  Overnight Stays
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#df503b] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#df503b]" />
                  Red Dot stops
                </span>
              </div>
              <div className="space-y-1.5">
                {journey.waypoints
                  .filter((w) => w.isOvernight)
                  .map((wp, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/50 border border-[#e6decb] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#df503b] ring-2 ring-white shadow-xs" />
                        <span className="font-semibold text-[#2c3732]">{wp.name}</span>
                      </div>
                      <span className="text-[11px] text-[#76877e] font-medium">
                        {wp.nights} {wp.nights === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Slow Cyclist Highlights */}
            <div className="pt-2">
              <span className="font-editorial text-lg font-bold text-[#232a27] block mb-2">
                Journey Highlights
              </span>
              <ul className="space-y-2 text-xs text-[#44514a]">
                {journey.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#df8b53] shrink-0 mt-0.5" />
                    <span className="leading-snug">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Switch to List View helper */}
            <div className="pt-2">
              <button
                onClick={onSwitchToList}
                className="w-full py-2 px-3 text-xs font-semibold text-[#46554e] hover:text-[#232a27] bg-[#ede5d6] hover:bg-[#e4dbca] rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View scheduled departures in List View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-4 bg-[#f1ebd9] border-t border-[#ded4c3] flex items-center gap-2.5">
          <button
            onClick={() => setItineraryModalOpen(true)}
            className="flex-1 py-3 px-3 text-center text-xs font-bold uppercase tracking-wider text-[#2b3330] bg-white hover:bg-[#faf7f2] border border-[#cfc4b0] rounded-full transition-colors shadow-xs"
          >
            View Itinerary
          </button>
          <button
            onClick={() => setEnquirySuccess(true)}
            className="flex-1 py-3 px-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#df8b53] hover:bg-[#d07b43] rounded-full transition-colors shadow-sm"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Enquiry Confirmation Toast / Dialog */}
      {enquirySuccess && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#f8f6f0] max-w-sm w-full p-6 rounded-2xl shadow-2xl border border-[#ded4c3] text-center">
            <div className="w-12 h-12 rounded-full bg-[#df8b53]/15 text-[#df8b53] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#232a27]">
              Enquiry Received
            </h3>
            <p className="text-xs text-[#5f6f65] mt-2 leading-relaxed">
              Thank you for your interest in <strong>{journey.title}</strong>. A member of our Oxford travel team will be in touch within 24 hours.
            </p>
            <button
              onClick={() => setEnquirySuccess(false)}
              className="mt-5 w-full py-2.5 bg-[#2b3330] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#1a201e] transition-colors"
            >
              Back to Map
            </button>
          </div>
        </div>
      )}

      {/* Full Itinerary Modal */}
      {itineraryModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#f8f6f0] max-w-2xl w-full max-h-[85vh] rounded-2xl shadow-2xl border border-[#ded4c3] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-[#ded4c3] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#df8b53]">
                  The Slow Cyclist Brochure
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#232a27]">
                  {journey.title} &middot; Day by Day
                </h3>
              </div>
              <button
                onClick={() => setItineraryModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#5e6e65]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#44514a]">
              <p className="text-sm leading-relaxed text-[#232a27]">
                {journey.longDescription}
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-[#e5dcce]">
                  <div className="font-bold text-[#2b3330] text-sm mb-1">
                    Day 1: Arrival & Campo Imperatore
                  </div>
                  <p>Welcome meeting in Rome before private transfer to the dramatic limestone plateau of Campo Imperatore. Gentle warm-up ride to medieval Santo Stefano di Sessanio.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e5dcce]">
                  <div className="font-bold text-[#2b3330] text-sm mb-1">
                    Day 2: The Eagle Fortress of Rocca Calascio
                  </div>
                  <p>Hike up to the 1,460m high citadel of Rocca Calascio. Scenic ridge ride overlooking the Apennines followed by mountain pecorino cheese tasting.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e5dcce]">
                  <div className="font-bold text-[#2b3330] text-sm mb-1">
                    Day 3: Peltuinum & The Frescoes of Bominaco
                  </div>
                  <p>Descend along the ancient tratturi sheep tracks to the Roman amphitheatre of Peltuinum. Afternoon visit to the Oratory of San Pellegrino.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e5dcce]">
                  <div className="font-bold text-[#2b3330] text-sm mb-1">
                    Day 4-5: Into Majella National Park
                  </div>
                  <p>Ride through the thermal valley of Caramanico Terme and hike to the hidden cliffside hermitage of San Bartolomeo in Legio.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e5dcce]">
                  <div className="font-bold text-[#2b3330] text-sm mb-1">
                    Day 6-7: Guardiagrele & Celebration Dinner
                  </div>
                  <p>Cycle past artisan copper workshops to our mountain retreat at Case Catalano. Gala celebration with rare vintages of Montepulciano d'Abruzzo.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#f1ebd9] border-t border-[#ded4c3] flex justify-end">
              <button
                onClick={() => setItineraryModalOpen(false)}
                className="px-6 py-2.5 bg-[#df8b53] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#d07b43]"
              >
                Close Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
