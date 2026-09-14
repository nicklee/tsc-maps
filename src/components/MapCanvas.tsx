import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw, Compass, ChevronDown, ChevronUp, ArrowRight, X, Info, Clock, MapPin, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { DESTINATION_COUNTRIES, JOURNEYS } from '../data/destinations';
import {
  EUROPE_LANDMASSES,
  ABRUZZO_REGION_POLYGON,
  CURATED_ROADS,
  SEA_LABELS,
  EUROPE_RIVERS,
  MOUNTAIN_RANGES,
  MAP_CANVAS_LABELS,
  ILLUSTRATED_LANDMARKS,
} from '../data/geoPolygons';
import { DestinationCountry, Region, Journey, Waypoint } from '../types';
import { MapVignette } from './MapVignettes';

interface MapCanvasProps {
  selectedCountryId: string | null;
  selectedRegionId: string | null;
  selectedJourneyId: string | null;
  onSelectCountry: (countryId: string | null) => void;
  onSelectRegion: (regionId: string | null) => void;
  onSelectJourney: (journey: Journey | null) => void;
}

// Helper to get natural dimensions for map vignettes in SVG
const getVignetteDims = (type: string, size: number): [number, number] => {
  switch (type) {
    case 'mountain': return [size * 1.5, size];
    case 'castle': return [size * 1.4, size * 1.1];
    case 'cypress': return [size * 0.8, size * 1.3];
    case 'pine': return [size * 1.1, size * 1.0];
    case 'sheep': return [size * 1.1, size * 0.8];
    case 'wine': return [size * 1.0, size * 1.0];
    case 'bike': return [size * 1.4, size * 0.9];
    case 'boat': return [size * 1.3, size * 1.1];
    case 'church': return [size * 1.1, size * 1.2];
    case 'lemon': return [size * 0.9, size * 1.1];
    case 'compass': return [size * 1.2, size * 1.2];
    default: return [size, size];
  }
};

export const MapCanvas: React.FC<MapCanvasProps> = ({
  selectedCountryId,
  selectedRegionId,
  selectedJourneyId,
  onSelectCountry,
  onSelectRegion,
  onSelectJourney,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 750 });
  const [showLegend, setShowLegend] = useState(false);
  // Tray is minimized by default at Europe view to keep the MAP as primary experience
  const [showJourneyCarousel, setShowJourneyCarousel] = useState(false);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [hoveredRouteJourneyId, setHoveredRouteJourneyId] = useState<string | null>(null);
  const [activeWaypoint, setActiveWaypoint] = useState<{ waypoint: Waypoint; journey: Journey } | null>(null);
  const [showRouteBar, setShowRouteBar] = useState(true);

  // Camera viewport state: center in [lon, lat], zoom level
  const [camera, setCamera] = useState<{ center: [number, number]; zoom: number }>({
    center: [12.0, 46.0],
    zoom: 1.0,
  });

  // Target camera for smooth animation
  const animRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; center: [number, number] }>({
    x: 0,
    y: 0,
    center: [12.0, 46.0],
  });

  // Resize observer to ensure responsive dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Convert Web Mercator latitude to spherical Y
  const toMercatorY = (lat: number): number => {
    const latRad = (Math.max(-85, Math.min(85, lat)) * Math.PI) / 180;
    return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  };

  // Convert Web Mercator spherical Y back to latitude in degrees
  const fromMercatorY = (mercY: number): number => {
    const rad = 2 * Math.atan(Math.exp(mercY)) - Math.PI / 2;
    return (rad * 180) / Math.PI;
  };

  // Convert Geographic [lon, lat] coordinates to screen pixel [x, y]
  const project = useCallback(
    ([lon, lat]: [number, number]): [number, number] => {
      const { width, height } = dimensions;
      const { center, zoom } = camera;

      const pixelsPerDegree = (width / 46) * zoom;
      const scaleY = pixelsPerDegree * (180 / Math.PI);

      const x = width / 2 + (lon - center[0]) * pixelsPerDegree;
      const y = height / 2 - (toMercatorY(lat) - toMercatorY(center[1])) * scaleY;

      return [x, y];
    },
    [dimensions, camera]
  );

  // Smooth camera fly-to function
  const flyTo = useCallback(
    (targetCenter: [number, number], targetZoom: number, duration: number = 750) => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }

      const startCenter = camera.center;
      const startZoom = camera.zoom;
      const startTime = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeInOutCubic(progress);

        const curLon = startCenter[0] + (targetCenter[0] - startCenter[0]) * ease;
        const curLat = startCenter[1] + (targetCenter[1] - startCenter[1]) * ease;
        const curZoom = startZoom + (targetZoom - startZoom) * ease;

        setCamera({
          center: [curLon, curLat],
          zoom: curZoom,
        });

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        }
      };

      animRef.current = requestAnimationFrame(step);
    },
    [camera]
  );

  // Sync camera when external selection props change
  useEffect(() => {
    if (selectedRegionId === 'abruzzo') {
      flyTo([13.85, 42.25], 7.5);
      setShowJourneyCarousel(true);
    } else if (selectedRegionId) {
      for (const c of DESTINATION_COUNTRIES) {
        const r = c.regions.find((reg) => reg.id === selectedRegionId);
        if (r) {
          flyTo(r.coords, r.zoomLevel);
          setShowJourneyCarousel(true);
          return;
        }
      }
    } else if (selectedCountryId) {
      const c = DESTINATION_COUNTRIES.find((d) => d.id === selectedCountryId);
      if (c) {
        flyTo(c.coords, c.zoomLevel);
        setShowJourneyCarousel(true);
      }
    } else {
      flyTo([12.0, 46.0], 1.0);
    }
  }, [selectedCountryId, selectedRegionId]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      center: camera.center,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const pixelsPerDegree = (dimensions.width / 46) * camera.zoom;
    const scaleY = pixelsPerDegree * (180 / Math.PI);

    const dLon = -dx / pixelsPerDegree;
    const startMercY = toMercatorY(dragStartRef.current.center[1]);
    const newMercY = startMercY + dy / scaleY;
    const newLat = Math.max(-75, Math.min(75, fromMercatorY(newMercY)));

    setCamera((prev) => ({
      ...prev,
      center: [
        dragStartRef.current.center[0] + dLon,
        newLat,
      ],
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.max(0.75, Math.min(14, camera.zoom * zoomFactor));
    setCamera((prev) => ({ ...prev, zoom: newZoom }));
  };

  // Determine active zoom view state
  const isRegionLevel = camera.zoom >= 4.8;
  const isCountryLevel = camera.zoom >= 2.0 && camera.zoom < 4.8;
  const isEuropeLevel = camera.zoom < 2.0;

  // Active focused journey
  const heroJourney = JOURNEYS.find((j) => j.id === 'untamed-abruzzo')!;
  const activeJourney: Journey =
    JOURNEYS.find((j) => j.id === selectedJourneyId) ||
    (selectedRegionId ? JOURNEYS.find((j) => j.regionId === selectedRegionId) : null) ||
    (selectedCountryId ? JOURNEYS.find((j) => j.countryId === selectedCountryId) : null) ||
    heroJourney;

  // Journeys that have routes rendered on the map
  const visibleJourneys = JOURNEYS.filter((j) => {
    if (j.id === activeJourney.id) return true;
    if (selectedRegionId && j.regionId === selectedRegionId) return true;
    if (selectedCountryId && j.countryId === selectedCountryId) return true;
    if (!selectedCountryId && camera.zoom <= 3.8) return true;
    return false;
  });

  const hoveredRouteJourney = hoveredRouteJourneyId
    ? JOURNEYS.find((j) => j.id === hoveredRouteJourneyId)
    : null;

  // Relevant journeys for tray
  const trayJourneys = selectedRegionId
    ? JOURNEYS.filter((j) => j.regionId === selectedRegionId)
    : selectedCountryId
    ? JOURNEYS.filter((j) => j.countryId === selectedCountryId)
    : JOURNEYS;

  return (
    <div
      ref={containerRef}
      id="slow-cyclist-map-container"
      className="relative w-full h-[76vh] min-h-[640px] max-h-[920px] rounded-2xl overflow-hidden border border-[#d2c6b4] shadow-2xl bg-[#a0c3bc] cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {/* Tactile paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none paper-texture z-0" />

      {/* SVG Vector Map Layer */}
      <svg
        className="w-full h-full absolute inset-0 z-10"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          {/* Subtle soft sea wash */}
          <radialGradient id="sea-wash" cx="48%" cy="52%" r="65%">
            <stop offset="0%" stopColor="#a8cbc4" />
            <stop offset="60%" stopColor="#9ebfb8" />
            <stop offset="100%" stopColor="#92b7b0" />
          </radialGradient>

          {/* Gradients for natural landmasses with subtle tonal variation */}
          <linearGradient id="land-italy" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#8fa76e" />
            <stop offset="60%" stopColor="#97ae76" />
            <stop offset="100%" stopColor="#88a167" />
          </linearGradient>

          <linearGradient id="land-spain" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#8ca36b" />
            <stop offset="100%" stopColor="#95ad74" />
          </linearGradient>

          <linearGradient id="land-france" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#78925c" />
            <stop offset="100%" stopColor="#839d65" />
          </linearGradient>

          <linearGradient id="land-greece" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#91ab70" />
            <stop offset="100%" stopColor="#9bb479" />
          </linearGradient>

          <linearGradient id="land-uk-ireland" x1="0%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#7a9761" />
            <stop offset="50%" stopColor="#85a26a" />
            <stop offset="100%" stopColor="#76915b" />
          </linearGradient>

          <linearGradient id="land-central-europe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#829c62" />
            <stop offset="50%" stopColor="#8ea86d" />
            <stop offset="100%" stopColor="#7b965b" />
          </linearGradient>

          <linearGradient id="land-central" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#829c62" />
            <stop offset="50%" stopColor="#8ea86d" />
            <stop offset="100%" stopColor="#7b965b" />
          </linearGradient>

          <linearGradient id="land-denmark" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7e9a64" />
            <stop offset="100%" stopColor="#88a46e" />
          </linearGradient>

          <linearGradient id="land-scandinavia" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#769363" />
            <stop offset="100%" stopColor="#809e6c" />
          </linearGradient>

          <linearGradient id="land-turkey" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#849f66" />
            <stop offset="100%" stopColor="#8ea86e" />
          </linearGradient>

          <linearGradient id="land-armenia-georgia" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#8ba66e" />
            <stop offset="100%" stopColor="#94af76" />
          </linearGradient>

          <linearGradient id="land-armenia" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#8ba66e" />
            <stop offset="100%" stopColor="#94af76" />
          </linearGradient>

          <linearGradient id="land-north-africa" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#768f56" />
            <stop offset="100%" stopColor="#80995e" />
          </linearGradient>

          {/* Soft shadow for landmass relief */}
          <filter id="land-shadow" x="-5%" y="-5%" width="115%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#1e3e46" floodOpacity="0.22" />
          </filter>

          {/* Glowing cream stroke for selected journey route */}
          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Sea Water Background Rect with gentle watercolor wash */}
        <rect width="100%" height="100%" fill="url(#sea-wash)" />

        {/* 2. Sea Water Wave Motifs (Delicate hand-drawn calligraphy ripples) */}
        <g className="text-white/60 select-none pointer-events-none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
          {[
            [14.8, 42.8], [15.2, 42.4], [13.0, 41.2], [11.2, 40.8], [16.8, 38.8],
            [1.5, 42.0], [5.2, 40.0], [21.5, 36.0], [24.0, 37.0], [31.5, 43.0],
            [-5.0, 45.0], [3.0, 37.5], [18.5, 40.2], [27.0, 39.0]
          ].map(([lon, lat], i) => {
            const [x, y] = project([lon, lat]);
            if (x < -50 || x > dimensions.width + 50 || y < -50 || y > dimensions.height + 50) return null;
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <path d="M-10,0 Q-5,-3 0,0 Q5,3 10,0" />
                <path d="M-6,5 Q-1,2 4,5 Q9,8 14,5" opacity="0.6" />
              </g>
            );
          })}
        </g>

        {/* 3. Sea / Ocean Text Labels (Classic cartographic serif italics) */}
        <g className="font-editorial text-[12.5px] sm:text-[13.5px] tracking-[0.28em] fill-white/60 font-medium select-none pointer-events-none italic">
          {SEA_LABELS.map((sea) => {
            if (camera.zoom < (sea.minZoom || 0) || camera.zoom > (sea.maxZoom || 99)) return null;
            const [x, y] = project(sea.coords);
            return (
              <text
                key={sea.name}
                x={x}
                y={y}
                textAnchor="middle"
                className="transition-opacity duration-300 drop-shadow-xs"
              >
                {sea.name}
              </text>
            );
          })}
        </g>

        {/* 4. European Landmasses with authentic watercolor shoreline wash rings */}
        <g filter="url(#land-shadow)">
          {EUROPE_LANDMASSES.map((country) => {
            const isSelected = selectedCountryId === country.id;
            const gradientId = `land-${country.id}`;

            return (
              <g key={country.id}>
                {country.coordinates.map((ring, ringIdx) => {
                  const pathData = ring.reduce((acc, coord, i) => {
                    const [px, py] = project(coord);
                    return `${acc} ${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
                  }, '') + ' Z';

                  return (
                    <g key={ringIdx}>
                      {/* Outer concentric watercolor wash shelf (subtle turquoise halo) */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#8bb4ad"
                        strokeWidth="11"
                        strokeOpacity="0.25"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      {/* Middle watercolor wash shelf */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#9bc2bb"
                        strokeWidth="5.5"
                        strokeOpacity="0.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      {/* Pale cream/off-white hand-painted shoreline buffer */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#faf6e9"
                        strokeWidth={isSelected ? '2.8' : '2.0'}
                        strokeLinejoin="round"
                      />
                      {/* Base landmass color ensuring it is never transparent or filled with sea */}
                      <path
                        d={pathData}
                        fill={country.fillColor || '#829c62'}
                      />
                      {/* Primary landmass fill with organic tonal gradient */}
                      <path
                        d={pathData}
                        fill={`url(#${gradientId})`}
                        stroke={isSelected ? '#df8b53' : '#faf6e9'}
                        strokeWidth={isSelected ? '1.8' : '0.8'}
                        strokeLinejoin="round"
                        className="transition-colors duration-300 hover:brightness-105"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* 5. Highlighted Region Polygon (Abruzzo high-detail boundary) */}
        {camera.zoom >= 2.8 && (
          <g>
            {(() => {
              const abruzzoPath = ABRUZZO_REGION_POLYGON.reduce((acc, coord, i) => {
                const [px, py] = project(coord);
                return `${acc} ${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
              }, '') + ' Z';

              return (
                <path
                  d={abruzzoPath}
                  fill="#9cb67b"
                  fillOpacity="0.35"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeDasharray={camera.zoom < 6.5 ? '4 3' : 'none'}
                  className="transition-all duration-300"
                />
              );
            })()}
          </g>
        )}

        {/* 6. Major European Rivers (Po, Tiber, Arno, Danube, Douro, Tagus, Rhone, Aterno) */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none" className="pointer-events-none select-none">
          {EUROPE_RIVERS.map((river) => {
            if (camera.zoom < (river.minZoom || 0)) return null;
            const pathData = river.points.reduce((acc, pt, i) => {
              const [px, py] = project(pt);
              return `${acc} ${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
            }, '');
            const midCoord = river.points[Math.floor(river.points.length / 2)];
            const [midX, midY] = project(midCoord);

            return (
              <g key={river.id}>
                {/* Soft outer wash */}
                <path
                  d={pathData}
                  stroke="#8db5ad"
                  strokeWidth={camera.zoom >= 4 ? '3.5' : '2.2'}
                  strokeOpacity="0.35"
                />
                {/* Inner watercolor river ribbon */}
                <path
                  d={pathData}
                  stroke="#6ca198"
                  strokeWidth={camera.zoom >= 4 ? '2.0' : '1.3'}
                  strokeOpacity="0.85"
                />
                {/* River Label */}
                {camera.zoom >= (river.minZoom ? river.minZoom + 0.6 : 2.5) && (
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    className="font-editorial italic text-[10px] fill-[#3f655e] tracking-wider select-none opacity-85 font-semibold"
                  >
                    {river.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* 7. Mountain Ranges & Shaded Relief Peaks */}
        <g className="pointer-events-none select-none">
          {MOUNTAIN_RANGES.map((range) => {
            if (camera.zoom < (range.minZoom || 0) || camera.zoom > (range.maxZoom || 99)) return null;
            const [rx, ry] = project(range.labelCoords);

            return (
              <g key={range.id}>
                {/* Individual craggy peaks with snow caps and ink hatching */}
                {range.peaks.map((p, pi) => {
                  const [px, py] = project(p.coords);
                  if (px < -60 || px > dimensions.width + 60 || py < -60 || py > dimensions.height + 60) return null;
                  const elevationScale = p.height
                    ? Math.min(1.4, Math.max(0.75, p.height / 2500))
                    : p.size === 'large'
                    ? 1.3
                    : p.size === 'small'
                    ? 0.75
                    : 1;
                  const s = (camera.zoom >= 4.5 ? 24 : 16) * elevationScale;

                  return (
                    <g key={pi} transform={`translate(${px}, ${py})`}>
                      {/* Craggy Mountain Silhouette */}
                      <polygon
                        points={`0,${-s} ${-s * 0.95},${s * 0.7} ${s * 0.95},${s * 0.7}`}
                        fill="#5b7159"
                        stroke="#3c4c3b"
                        strokeWidth="0.8"
                      />
                      {/* Snowy peak summit */}
                      <polygon
                        points={`0,${-s} ${-s * 0.38},${-s * 0.3} 0,${-s * 0.42} ${s * 0.38},${-s * 0.3}`}
                        fill="#ffffff"
                        opacity="0.95"
                      />
                      {/* Shaded rock face line */}
                      <path
                        d={`M0,${-s} L${s * 0.22},${s * 0.7}`}
                        stroke="#384737"
                        strokeWidth="1.2"
                      />
                      {/* High-elevation peak name at region zoom */}
                      {camera.zoom >= 4.2 && p.name && (
                        <text
                          x="0"
                          y={s * 0.7 + 11}
                          textAnchor="middle"
                          className="font-editorial text-[9.5px] fill-[#25322a] tracking-wider opacity-90 select-none font-bold"
                        >
                          {p.name} {p.height ? `(${p.height}m)` : ''}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Range Title Label */}
                <text
                  x={rx}
                  y={ry}
                  textAnchor="middle"
                  className="font-editorial font-bold text-[11.5px] sm:text-[13px] tracking-[0.28em] fill-[#314237] select-none uppercase opacity-85"
                >
                  {range.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* 8. Direct Geographic Labels (Country, Region, Natural Landmarks) */}
        <g className="pointer-events-none select-none">
          {MAP_CANVAS_LABELS.map((label) => {
            if (camera.zoom < (label.minZoom || 0) || camera.zoom > (label.maxZoom || 99)) return null;
            const [lx, ly] = project(label.coords);
            if (lx < -50 || lx > dimensions.width + 50 || ly < -50 || ly > dimensions.height + 50) return null;

            const isCountry = label.type === 'country';
            const isRegion = label.type === 'region';

            return (
              <text
                key={label.name}
                x={lx}
                y={ly}
                textAnchor="middle"
                className={`font-editorial select-none transition-opacity duration-300 ${
                  isCountry
                    ? 'text-[15px] sm:text-[17px] font-bold tracking-[0.32em] fill-[#232f28] opacity-85 uppercase'
                    : isRegion
                    ? 'text-[12px] sm:text-[13px] font-bold tracking-[0.24em] fill-[#2a3830] opacity-90 uppercase'
                    : 'text-[10.5px] sm:text-[11.5px] font-medium tracking-[0.2em] fill-[#3d5045] opacity-80 italic uppercase'
                }`}
              >
                {label.name}
              </text>
            );
          })}
        </g>

        {/* 9. Curated Slow Cyclist Road Networks (Thin pale cream ribbons with soft shadow) */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {CURATED_ROADS.map((road) => {
            const pathData = road.points.reduce((acc, pt, i) => {
              const [px, py] = project(pt);
              return `${acc} ${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
            }, '');

            return (
              <g key={road.id}>
                {/* Road under-stroke / subtle earth shadow */}
                <path
                  d={pathData}
                  stroke="#57695d"
                  strokeWidth={camera.zoom >= 6.0 ? '3.8' : '2.0'}
                  strokeOpacity="0.25"
                />
                {/* Main thin pale cream road line */}
                <path
                  d={pathData}
                  stroke="#faf7ee"
                  strokeWidth={camera.zoom >= 6.0 ? '2.6' : '1.4'}
                  strokeOpacity="0.95"
                />
              </g>
            );
          })}
        </g>

        {/* 10. Active & Visible Journey Route Lines */}
        {visibleJourneys.map((j) => {
          if (!j.routeCoordinates || j.routeCoordinates.length < 2) return null;
          const isActive = j.id === activeJourney.id;
          const isHovered = j.id === hoveredRouteJourneyId;
          const routeData = j.routeCoordinates.reduce((acc, pt, i) => {
            const [px, py] = project(pt);
            return `${acc} ${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
          }, '');

          return (
            <g key={`route-${j.id}`} filter={isActive ? 'url(#route-glow)' : undefined}>
              {/* Soft track shadow */}
              <path
                d={routeData}
                stroke={isActive ? '#df8b53' : '#8d9f96'}
                strokeWidth={isActive ? (isHovered ? '8' : '6') : (isHovered ? '5' : '3.5')}
                strokeOpacity={isActive ? '0.35' : '0.25'}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Main Ivory ribbon */}
              <path
                d={routeData}
                stroke="#ffffff"
                strokeWidth={isActive ? (isHovered ? '4.2' : '3.4') : (isHovered ? '3.0' : '2.0')}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Terracotta flow indicator */}
              <path
                d={routeData}
                stroke={isActive ? '#df503b' : '#df8b53'}
                strokeWidth={isActive ? '2.2' : '1.5'}
                strokeDasharray={isActive ? '5 6' : '3 5'}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Transparent Wide Clickable Hit Area */}
              <path
                d={routeData}
                stroke="transparent"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectJourney(j);
                  onSelectCountry(j.countryId);
                  onSelectRegion(j.regionId);
                  setActiveWaypoint(null);
                  setShowRouteBar(true);
                }}
                onMouseEnter={() => setHoveredRouteJourneyId(j.id)}
                onMouseLeave={() => setHoveredRouteJourneyId(null)}
              />
            </g>
          );
        })}

        {/* 11. Waypoints & Signature Overnight Red Dots (Render when zoom >= 3.8) */}
        {camera.zoom >= 3.8 && activeJourney.waypoints && (
          <g>
            {activeJourney.waypoints.map((wp, idx) => {
              const [x, y] = project(wp.coords);
              const isOvernight = wp.isOvernight;
              const isSelected = activeWaypoint?.waypoint.name === wp.name;

              return (
                <g key={`wp-${idx}`} transform={`translate(${x}, ${y})`} className="cursor-pointer group">
                  {/* Generous transparent hit area */}
                  <circle
                    r="22"
                    fill="transparent"
                    className="pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveWaypoint({ waypoint: wp, journey: activeJourney });
                      onSelectJourney(activeJourney);
                      setShowRouteBar(true);
                    }}
                  />

                  {isOvernight ? (
                    <>
                      {/* Slow Cyclist Signature Overnight Red Dot with gentle pulse aura */}
                      <circle
                        r="11"
                        fill="#df503b"
                        fillOpacity="0.25"
                        className="animate-ping"
                      />
                      <circle
                        r="6.5"
                        fill="#df503b"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="shadow-sm transition-transform group-hover:scale-125"
                      />
                      <circle
                        r="2.2"
                        fill="#ffffff"
                      />
                      {/* Handwritten / Editorial Town Name */}
                      <text
                        x="11"
                        y="4"
                        className="font-editorial font-bold text-[13px] tracking-wide fill-[#232f28] drop-shadow-sm select-none pointer-events-none"
                      >
                        {wp.name}
                        {wp.nights ? ` (${wp.nights}n)` : ''}
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Standard town settlement point */}
                      <circle
                        r="4.5"
                        fill="#ffffff"
                        stroke="#33423b"
                        strokeWidth="1.5"
                        className="shadow-xs"
                      />
                      <text
                        x="9"
                        y="3.5"
                        className="font-editorial font-bold text-[12px] tracking-wide fill-[#2c3732] drop-shadow-sm select-none opacity-90 pointer-events-none"
                      >
                        {wp.name}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* 12. Illustrated Landmarks & Cultural Vignettes in SVG for rock-solid spatial lock */}
        <g className="select-none">
          {ILLUSTRATED_LANDMARKS.map((item) => {
            if (camera.zoom < (item.minZoom || 0) || camera.zoom > (item.maxZoom || 99)) return null;
            const [x, y] = project(item.coords);
            if (x < -80 || x > dimensions.width + 80 || y < -80 || y > dimensions.height + 80) return null;

            const baseSize = item.scale ? Math.round(36 * item.scale) : 36;
            const [w, h] = getVignetteDims(item.type, baseSize);

            return (
              <g
                key={item.id}
                transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)})`}
                className="pointer-events-auto cursor-help group"
              >
                <g transform={`translate(-${(w / 2).toFixed(1)}, -${(h / 2).toFixed(1)})`}>
                  <MapVignette type={item.type} size={baseSize} />
                </g>
                {item.label && (
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <rect
                      x={-Math.round(item.label.length * 3.4 + 9)}
                      y={Math.round(h / 2 + 4)}
                      width={Math.round(item.label.length * 6.8 + 18)}
                      height={18}
                      rx={4}
                      fill="#fcf9f2"
                      stroke="#ddd3c1"
                      strokeWidth={1}
                    />
                    <text
                      x={0}
                      y={Math.round(h / 2 + 16.5)}
                      textAnchor="middle"
                      className="font-editorial text-[9.5px] font-bold fill-[#222c27] select-none"
                    >
                      {item.label}
                    </text>
                  </g>
                )}
                <title>{item.label || item.type}</title>
              </g>
            );
          })}

          {/* High-zoom Abruzzo journey custom vignettes */}
          {camera.zoom >= 5.8 &&
            heroJourney.vignettes?.map((v) => {
              const [x, y] = project(v.coords);
              if (x < -80 || x > dimensions.width + 80 || y < -80 || y > dimensions.height + 80) return null;

              const vSize = v.type === 'mountain' ? 52 : 36;
              const [w, h] = getVignetteDims(v.type, vSize);

              return (
                <g
                  key={v.id}
                  transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)})`}
                  className="pointer-events-auto cursor-help group"
                >
                  <g transform={`translate(-${(w / 2).toFixed(1)}, -${(h / 2).toFixed(1)})`}>
                    <MapVignette type={v.type} size={vSize} />
                  </g>
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <rect
                      x={-Math.round(v.name.length * 3.4 + 9)}
                      y={Math.round(h / 2 + 4)}
                      width={Math.round(v.name.length * 6.8 + 18)}
                      height={18}
                      rx={4}
                      fill="#fcf9f2"
                      stroke="#ddd3c1"
                      strokeWidth={1}
                    />
                    <text
                      x={0}
                      y={Math.round(h / 2 + 16.5)}
                      textAnchor="middle"
                      className="font-editorial text-[9.5px] font-bold fill-[#202925] select-none"
                    >
                      {v.name}
                    </text>
                  </g>
                  <title>{v.name}</title>
                </g>
              );
            })}
        </g>
      </svg>

      {/* 13. Progressive Disclosure Destination Markers */}

      {/* 13A. Europe Level Markers (Understated, elegant cartographic pins without thumbnail images) */}
      {isEuropeLevel && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {DESTINATION_COUNTRIES.map((country) => {
            const [x, y] = project(country.coords);
            if (x < -40 || x > dimensions.width + 40 || y < -40 || y > dimensions.height + 40) return null;

            const isHovered = hoveredCountryId === country.id;

            return (
              <div
                key={country.id}
                style={{
                  transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`,
                  transition: 'none',
                }}
                className="absolute pointer-events-auto group focus:outline-none select-none"
                onMouseEnter={() => setHoveredCountryId(country.id)}
                onMouseLeave={() => setHoveredCountryId(null)}
              >
                {/* Quieter, understated destination marker using typography & settlement/overnight dots */}
                <button
                  onClick={() => {
                    const countryJourney = JOURNEYS.find((j) => j.countryId === country.id);
                    onSelectCountry(country.id);
                    onSelectRegion(null);
                    if (countryJourney) {
                      onSelectJourney(countryJourney);
                    }
                    flyTo(country.coords, country.zoomLevel);
                  }}
                  className="flex items-center gap-2 bg-[#fcf9f1]/95 hover:bg-white text-[#2b3330] px-3 py-1.5 rounded-full shadow-md border border-[#cfc3af] hover:border-[#df8b53] hover:shadow-xl transition-transform duration-150 hover:scale-105"
                >
                  {/* Pair of settlement white dot & red overnight dot */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white border-[1.5px] border-[#36443c] shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#df503b] ring-1 ring-white shadow-xs" />
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-editorial text-sm font-bold tracking-widest text-[#232a27] uppercase">
                      {country.name}
                    </span>
                    <span className="text-[10px] text-[#6d7e75] font-medium">
                      &middot; {country.journeyCount} {country.journeyCount === 1 ? 'journey' : 'journeys'}
                    </span>
                  </div>
                </button>

                {/* Subtle Hover Card Preview */}
                {isHovered && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-[#fcfaf3] p-2.5 rounded-xl shadow-2xl border border-[#ded4c3] z-50 pointer-events-none animate-in fade-in duration-200">
                    <p className="font-editorial text-xs font-bold text-[#232a27] mb-1">
                      {country.name} Discovery
                    </p>
                    <p className="text-[10.5px] text-[#55665d] leading-snug">
                      Explore {country.regions.map((r) => r.name).join(', ')}.
                    </p>
                    <div className="mt-1.5 text-[9.5px] font-bold text-[#df8b53] uppercase tracking-wider flex items-center gap-1">
                      <span>Zoom in to explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 13B. Country Level Markers (Regional clusters with parchment pills & overnight dots) */}
      {isCountryLevel && selectedCountryId && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {(() => {
            const country = DESTINATION_COUNTRIES.find((c) => c.id === selectedCountryId);
            if (!country) return null;

            return country.regions.map((reg) => {
              const [x, y] = project(reg.coords);
              const isAbruzzo = reg.id === 'abruzzo';

              return (
                <div
                  key={reg.id}
                  style={{
                    transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`,
                    transition: 'none',
                  }}
                  className="absolute pointer-events-auto select-none"
                >
                  <button
                    onClick={() => {
                      const regJourney = JOURNEYS.find((j) => j.regionId === reg.id);
                      onSelectRegion(reg.id);
                      if (regJourney) {
                        onSelectJourney(regJourney);
                      }
                      flyTo(reg.coords, Math.min(reg.zoomLevel, 6.8));
                    }}
                    className="group focus:outline-none transition-transform duration-150 hover:scale-105"
                  >
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-md transition-all ${
                        isAbruzzo
                          ? 'bg-[#fcf9f1] border-2 border-[#df8b53] ring-2 ring-[#df8b53]/20 shadow-lg'
                          : 'bg-[#fcf9f1]/95 hover:bg-white border border-[#cfc3af]'
                      }`}
                    >
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#36443c]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#df503b] ring-1 ring-white" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-editorial text-sm font-bold tracking-wider text-[#232a27] uppercase">
                          {reg.name}
                        </span>
                        <span className="text-[10px] text-[#718278] font-medium">
                          &middot; {reg.journeyCount} {reg.journeyCount === 1 ? 'trip' : 'trips'}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* 13C. Region Level Journey Pins (Rich Journey Badge with photo, duration, & pricing) */}
      {isRegionLevel && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {(() => {
            const activeViewJourneys = JOURNEYS.filter((j) => {
              if (selectedRegionId) return j.regionId === selectedRegionId;
              if (selectedCountryId) return j.countryId === selectedCountryId;
              return j.id === activeJourney.id;
            });

            return activeViewJourneys.map((j) => {
              const startCoords = j.routeCoordinates?.[0] || j.waypoints?.[0]?.coords;
              if (!startCoords) return null;
              const [x, y] = project(startCoords);
              if (x < -50 || x > dimensions.width + 50 || y < -50 || y > dimensions.height + 50) return null;

              const isCurrent = j.id === activeJourney.id;

              return (
                <div
                  key={`pin-${j.id}`}
                  style={{
                    transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -120%)`,
                    transition: 'none',
                  }}
                  className="absolute pointer-events-auto select-none"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectJourney(j);
                      onSelectCountry(j.countryId);
                      onSelectRegion(j.regionId);
                      setShowRouteBar(true);
                    }}
                    className="group focus:outline-none transition-transform duration-150 hover:scale-105"
                  >
                    <div
                      className={`flex items-center gap-3 p-2 pr-4 rounded-2xl shadow-2xl transition-all ${
                        isCurrent
                          ? 'bg-[#2b3330] hover:bg-[#1f2523] text-white border-2 border-[#df8b53] ring-4 ring-[#df8b53]/20'
                          : 'bg-[#fcf9f1] hover:bg-white text-[#2b3330] border-2 border-[#cfc4b0]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#df8b53]/70 shadow-xs shrink-0">
                        <img
                          src={j.heroImage}
                          alt={j.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-editorial text-base sm:text-lg font-bold tracking-wide leading-none ${
                              isCurrent ? 'text-white' : 'text-[#232a27]'
                            }`}
                          >
                            {j.title}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#df8b53] bg-[#df8b53]/20 px-1.5 py-0.5 rounded">
                            {j.category}
                          </span>
                        </div>
                        <span
                          className={`text-[10.5px] mt-0.5 ${
                            isCurrent ? 'text-[#cfd8d3]' : 'text-[#62736b]'
                          }`}
                        >
                          {j.durationNights} nights &middot; From £{j.priceFrom.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {/* Pointer tip */}
                    <div
                      className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] mx-auto -mt-0.5 ${
                        isCurrent ? 'border-t-[#df8b53]' : 'border-t-[#cfc4b0]'
                      }`}
                    />
                  </button>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* 14. Floating Header Controls & Breadcrumbs (Top-Left of Map) */}
      <div className="absolute top-4 left-4 z-40 flex flex-wrap items-center gap-2">
        <div className="bg-[#fcf9f1]/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#ded4c3] flex items-center gap-2 text-xs font-medium text-[#46534d]">
          <button
            onClick={() => {
              onSelectCountry(null);
              onSelectRegion(null);
              onSelectJourney(null);
              flyTo([12.0, 46.0], 1.0);
            }}
            className="hover:text-[#df8b53] transition-colors"
          >
            All Destinations
          </button>

          {selectedCountryId && (
            <>
              <span className="text-[#9ea9a2]">/</span>
              <button
                onClick={() => {
                  onSelectRegion(null);
                  onSelectJourney(null);
                  const c = DESTINATION_COUNTRIES.find((d) => d.id === selectedCountryId);
                  if (c) flyTo(c.coords, c.zoomLevel);
                }}
                className="font-bold text-[#232a27] hover:text-[#df8b53] transition-colors capitalize"
              >
                {selectedCountryId}
              </button>
            </>
          )}

          {selectedRegionId && (
            <>
              <span className="text-[#9ea9a2]">/</span>
              <span className="font-bold text-[#df8b53] capitalize">
                {selectedRegionId}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 15. In-Map Active Route Quick Bar (Top of Map when Journey selected) */}
      {activeJourney && showRouteBar && (
        <div className="absolute top-16 left-4 right-4 sm:right-auto sm:max-w-lg z-30 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="bg-[#2b3330]/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-[#df8b53]/60 pointer-events-auto flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3 overflow-hidden cursor-pointer"
              onClick={() => onSelectJourney(activeJourney)}
            >
              <img
                src={activeJourney.heroImage}
                alt={activeJourney.title}
                className="w-11 h-11 rounded-xl object-cover border border-[#df8b53]/70 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#df8b53]">
                    {activeJourney.regionName}, {activeJourney.countryName}
                  </span>
                  <span className="text-white/40">&middot;</span>
                  <span className="text-[10px] text-[#cfdad4]">{activeJourney.mode}</span>
                </div>
                <h3 className="font-editorial text-base font-bold truncate leading-tight">
                  {activeJourney.title}
                </h3>
                <div className="flex items-center gap-2 text-[10.5px] text-[#b4c4bc] mt-0.5">
                  <span>{activeJourney.durationNights} nights</span>
                  <span>&middot;</span>
                  <span>From £{activeJourney.priceFrom.toLocaleString()}</span>
                  <span>&middot;</span>
                  <span className="text-[#df8b53] font-semibold">{activeJourney.activityLevel}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onSelectJourney(activeJourney)}
                className="bg-[#df8b53] hover:bg-[#c9753d] text-white p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                title="View full journey dossier"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowRouteBar(false)}
                className="text-white/50 hover:text-white p-1"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 16. Waypoint Details Popover Card (when an overnight or town is clicked) */}
      {activeWaypoint && (
        <div className="absolute top-20 right-4 z-40 max-w-xs w-full animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-[#fcfaf3] p-4 rounded-2xl shadow-2xl border-2 border-[#df8b53] text-[#2b3330]">
            <div className="flex items-start justify-between gap-2 border-b border-[#e5dcce] pb-2 mb-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeWaypoint.waypoint.isOvernight ? 'bg-[#df503b] ring-2 ring-white' : 'bg-[#2b3330]'
                    }`}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#df8b53]">
                    {activeWaypoint.waypoint.isOvernight
                      ? `Overnight Stay (${activeWaypoint.waypoint.nights} Night${activeWaypoint.waypoint.nights! > 1 ? 's' : ''})`
                      : 'Scenic Waypoint'}
                  </span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#232a27] leading-tight mt-0.5">
                  {activeWaypoint.waypoint.name}
                </h4>
              </div>
              <button
                onClick={() => setActiveWaypoint(null)}
                className="text-[#84948b] hover:text-[#2b3330] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#52635a] leading-relaxed mb-3">
              {activeWaypoint.waypoint.description}
            </p>

            <div className="pt-2 border-t border-[#e5dcce] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#718278]">
                Part of {activeWaypoint.journey.title}
              </span>
              <button
                onClick={() => {
                  onSelectJourney(activeWaypoint.journey);
                }}
                className="text-[11px] font-bold text-[#df8b53] hover:text-[#b86128] flex items-center gap-1"
              >
                <span>Full Trip</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17. Hover Route Indicator Badge */}
      {hoveredRouteJourney && hoveredRouteJourney.id !== activeJourney.id && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in duration-200">
          <div className="bg-[#2b3330]/90 text-white px-3 py-1.5 rounded-full shadow-lg text-xs flex items-center gap-2 border border-[#df8b53]/40">
            <span className="w-2 h-2 rounded-full bg-[#df8b53]" />
            <span className="font-editorial font-bold">{hoveredRouteJourney.title}</span>
            <span className="text-white/60">&middot; Click route to focus</span>
          </div>
        </div>
      )}

      {/* 18. Zoom & Map Controls (Bottom-Right of Map) */}
      <div className="absolute bottom-6 right-4 z-40 flex flex-col items-end gap-2">
        <div className="bg-[#fcfaf3]/95 backdrop-blur-md rounded-xl shadow-lg border border-[#ded4c3] overflow-hidden flex flex-col">
          <button
            onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.min(14, prev.zoom * 1.35) }))}
            className="p-2.5 text-[#33423a] hover:bg-[#ece5d5] hover:text-black transition-colors"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-[#ded4c3] w-full" />
          <button
            onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.max(0.75, prev.zoom * 0.74) }))}
            className="p-2.5 text-[#33423a] hover:bg-[#ece5d5] hover:text-black transition-colors"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-[#ded4c3] w-full" />
          <button
            onClick={() => {
              onSelectCountry(null);
              onSelectRegion(null);
              onSelectJourney(null);
              flyTo([12.0, 46.0], 1.0);
            }}
            className="p-2.5 text-[#33423a] hover:bg-[#ece5d5] hover:text-black transition-colors"
            title="Reset to Europe overview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 19. Refined, Quieter Featured Journeys Tray (Bottom Center) */}
      <div className="absolute bottom-4 left-4 right-4 z-40 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-3xl pointer-events-auto">
          <div className="bg-[#fcfaf3]/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#ded4c3] overflow-hidden">
            {/* Minimal Header Toggle Bar */}
            <div className="px-3 py-1.5 border-b border-[#e8dfd2] flex items-center justify-between text-xs">
              <button
                onClick={() => setShowJourneyCarousel(!showJourneyCarousel)}
                className="flex items-center gap-2 text-left hover:text-[#df8b53] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#df503b]" />
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#232a27]">
                  {(() => {
                    const country = DESTINATION_COUNTRIES.find((d) => d.id === selectedCountryId);
                    const region = country?.regions.find((r) => r.id === selectedRegionId);
                    if (region) return `${region.name} Journeys (${trayJourneys.length})`;
                    if (country) return `${country.name} Journeys (${trayJourneys.length})`;
                    return `All Journeys (${trayJourneys.length})`;
                  })()}
                </span>
                <span className="text-[10px] text-[#788880] hidden sm:inline">
                  &middot; Click to fly to route
                </span>
                {showJourneyCarousel ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#788880]" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5 text-[#788880]" />
                )}
              </button>

              <button
                onClick={() => setShowLegend(!showLegend)}
                className="text-[10px] font-semibold text-[#57685f] hover:text-[#232a27] px-2 py-0.5 rounded bg-black/5 hover:bg-black/10 transition-colors"
              >
                {showLegend ? 'Hide Key' : 'Map Key'}
              </button>
            </div>

            {/* Compact Horizontal Photo Strip */}
            {showJourneyCarousel && (
              <div className="p-2 overflow-x-auto flex items-center gap-2 scrollbar-none animate-in fade-in duration-200">
                {trayJourneys.map((j) => {
                  const isCurrent = selectedJourneyId === j.id;

                  return (
                    <button
                      key={j.id}
                      onClick={() => {
                        onSelectJourney(j);
                        onSelectCountry(j.countryId);
                        onSelectRegion(j.regionId);

                        if (j.id === 'untamed-abruzzo') {
                          flyTo([13.85, 42.25], 7.5);
                        } else {
                          const c = DESTINATION_COUNTRIES.find((d) => d.id === j.countryId);
                          const r = c?.regions.find((reg) => reg.id === j.regionId);
                          if (r) {
                            flyTo(r.coords, r.zoomLevel);
                          } else if (c) {
                            flyTo(c.coords, c.zoomLevel);
                          }
                        }
                      }}
                      className={`flex items-center gap-2 p-1 pr-2.5 rounded-xl transition-all duration-200 shrink-0 text-left ${
                        isCurrent
                          ? 'bg-[#2b3330] text-white shadow-sm ring-2 ring-[#df8b53]'
                          : 'bg-white hover:bg-[#faf7f0] text-[#2b3330] border border-[#e5dcce]'
                      }`}
                    >
                      <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0 border border-white/40">
                        <img
                          src={j.heroImage}
                          alt={j.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-[110px]">
                        <span
                          className={`text-[8.5px] font-bold uppercase tracking-wider ${
                            isCurrent ? 'text-[#df8b53]' : 'text-[#87978e]'
                          }`}
                        >
                          {j.regionName}
                        </span>
                        <span className="font-editorial text-[11px] font-bold leading-tight line-clamp-1">
                          {j.title}
                        </span>
                        <span
                          className={`text-[9.5px] ${
                            isCurrent ? 'text-[#d0ded7]' : 'text-[#67776f]'
                          }`}
                        >
                          {j.durationNights}n &middot; £{j.priceFrom.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 20. Cartographic Map Key / Legend Dialog */}
      {showLegend && (
        <div className="absolute bottom-20 left-4 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#fcfaf3]/95 backdrop-blur-md p-3.5 rounded-xl shadow-2xl border border-[#ded4c3] text-xs max-w-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5dcce] mb-2">
              <span className="font-editorial text-sm font-bold tracking-wide uppercase text-[#2b3330]">
                Slow Cyclist Cartography
              </span>
              <button
                onClick={() => setShowLegend(false)}
                className="text-[#84948b] hover:text-[#2b3330] text-[11px]"
              >
                Close
              </button>
            </div>
            <div className="space-y-1.5 text-[#46534d]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#df503b] ring-1 ring-white" />
                <span className="font-medium">Red dot = Overnight stay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-white border-t border-b border-[#df8b53]" />
                <span className="font-medium">Ivory line = Journey route</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#44554c]" />
                <span className="font-medium">White dot = Historic town or pass</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#6ca198]" />
                <span className="font-medium">Blue line = European river</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
