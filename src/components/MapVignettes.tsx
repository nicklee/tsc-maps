import React from 'react';

interface VignetteProps {
  type: string;
  className?: string;
  size?: number;
}

export const MapVignette: React.FC<VignetteProps> = ({ type, className = '', size = 38 }) => {
  switch (type) {
    case 'mountain':
      return (
        <svg
          width={size * 1.5}
          height={size}
          viewBox="0 0 60 40"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Back peak - soft slate green */}
          <polygon points="10,36 28,10 46,36" fill="#758c73" opacity="0.85" />
          <polygon points="28,10 23,20 29,18 34,22" fill="#f8faf6" opacity="0.95" />
          <path d="M28,10 L30,36" stroke="#485b46" strokeWidth="1" strokeDasharray="2 2" />

          {/* Front Craggy Peak - earthy moss green with hand-drawn ink hatching */}
          <polygon points="2,38 22,12 40,38" fill="#586f56" />
          {/* Snow cap */}
          <polygon points="22,12 16,22 23,20 28,24" fill="#ffffff" />
          {/* Rock face shading / ink hatching */}
          <path d="M12,28 L17,32 M24,22 L28,30 M28,30 L32,36" stroke="#374836" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M22,12 L24,38" stroke="#374836" strokeWidth="1.2" />

          {/* Small side ridge */}
          <polygon points="34,38 46,20 58,38" fill="#6c826a" />
          <polygon points="46,20 42,26 47,25 50,28" fill="#fbfdfa" />
          <path d="M46,20 L48,38" stroke="#455743" strokeWidth="1" />
        </svg>
      );

    case 'castle':
      // Rocca Calascio hilltop fortress - Abruzzo signature landmark
      return (
        <svg
          width={size * 1.4}
          height={size * 1.1}
          viewBox="0 0 52 42"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Mountain Ridge Outcrop */}
          <path d="M2,38 Q26,30 50,38 L48,42 L4,42 Z" fill="#6d8366" />
          <ellipse cx="26" cy="35" rx="22" ry="4" fill="#586d52" opacity="0.6" />

          {/* Main Central Keep */}
          <rect x="18" y="12" width="16" height="22" rx="1.5" fill="#dfd6c2" stroke="#685d4c" strokeWidth="1.2" />
          {/* Keep Crenellations */}
          <path
            d="M18,12 L18,9 L21,9 L21,12 L23,12 L23,9 L26,9 L26,12 L29,12 L29,9 L31,9 L31,12 L34,12"
            stroke="#685d4c"
            strokeWidth="1.2"
            fill="#dfd6c2"
          />

          {/* Corner Turrets */}
          <rect x="11" y="18" width="8" height="15" rx="1.2" fill="#cdc3ad" stroke="#685d4c" strokeWidth="1" />
          <path d="M11,18 L11,15 L14,15 L14,18 L16,18 L16,15 L19,15 L19,18" stroke="#685d4c" strokeWidth="0.9" fill="#cdc3ad" />

          <rect x="33" y="18" width="8" height="15" rx="1.2" fill="#c3b9a3" stroke="#685d4c" strokeWidth="1" />
          <path d="M33,18 L33,15 L36,15 L36,18 L38,18 L38,15 L41,15 L41,18" stroke="#685d4c" strokeWidth="0.9" fill="#c3b9a3" />

          {/* Arched windows / Arrow slits */}
          <rect x="25" y="16" width="2" height="4" rx="0.8" fill="#383025" />
          <rect x="24.5" y="24" width="3" height="5" rx="1" fill="#383025" />
          <rect x="14" y="22" width="2" height="3.5" rx="0.5" fill="#383025" />
          <rect x="36" y="22" width="2" height="3.5" rx="0.5" fill="#383025" />
        </svg>
      );

    case 'cypress':
      // Pair of slender Italian cypress trees (Tuscan / Mediterranean landscape)
      return (
        <svg
          width={size * 0.8}
          height={size * 1.3}
          viewBox="0 0 28 44"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Ground shadow */}
          <ellipse cx="14" cy="41" rx="10" ry="2.5" fill="#4d6148" opacity="0.4" />

          {/* Background smaller cypress */}
          <rect x="18" y="32" width="2" height="9" fill="#4e3b2b" />
          <path
            d="M19,8 C23,15 23,26 21,34 C20,35 18,35 17,34 C15,26 15,15 19,8 Z"
            fill="#2c442a"
            stroke="#1c2d1b"
            strokeWidth="0.8"
          />
          <path d="M19,10 C20,16 21,26 19.5,32" stroke="#3b5e39" strokeWidth="0.9" strokeLinecap="round" />

          {/* Foreground primary cypress */}
          <rect x="9" y="30" width="2.5" height="11" fill="#4e3b2b" />
          <path
            d="M10,2 C15,11 16,24 13,33 C12,34 9,34 8,33 C4,24 5,11 10,2 Z"
            fill="#223920"
            stroke="#162515"
            strokeWidth="0.9"
          />
          <path d="M10,5 C12,13 13,24 11,31" stroke="#355832" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'pine':
      // Italian umbrella stone pine (Pinus pinea)
      return (
        <svg
          width={size * 1.1}
          height={size * 1.0}
          viewBox="0 0 40 38"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Curved umber trunk */}
          <path d="M20,36 Q22,26 19,16" stroke="#523d2b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M20,24 Q24,20 26,17" stroke="#523d2b" strokeWidth="1.8" strokeLinecap="round" />
          {/* Umbrella Canopy - multi-tone Mediterranean green */}
          <ellipse cx="20" cy="14" rx="16" ry="7.5" fill="#2d492b" stroke="#1c2e1b" strokeWidth="1" />
          <ellipse cx="19" cy="11.5" rx="12" ry="5.5" fill="#3f633c" />
          <ellipse cx="17" cy="9.5" rx="7" ry="3.5" fill="#527c4f" />
        </svg>
      );

    case 'sheep':
      // Fluffy pastoral sheep grazing on mountain pastures (Abruzzo/Transylvania)
      return (
        <svg
          width={size * 1.1}
          height={size * 0.8}
          viewBox="0 0 40 30"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Grass tuft */}
          <path d="M12,28 L14,24 M15,28 L16,23 M25,28 L27,24" stroke="#486043" strokeWidth="1.2" strokeLinecap="round" />
          {/* Legs */}
          <rect x="13" y="19" width="2" height="9" fill="#2e271f" rx="1" />
          <rect x="17" y="19" width="2" height="9" fill="#2e271f" rx="1" />
          <rect x="25" y="19" width="2" height="9" fill="#2e271f" rx="1" />
          <rect x="29" y="19" width="2" height="9" fill="#2e271f" rx="1" />
          {/* Wool Body with cloud-like outline */}
          <ellipse cx="22" cy="15" rx="12" ry="8.5" fill="#f8f4ea" stroke="#bfb69e" strokeWidth="1.2" />
          <circle cx="16" cy="12" r="4.5" fill="#f8f4ea" />
          <circle cx="27" cy="12" r="4.5" fill="#f8f4ea" />
          {/* Head & dark face */}
          <ellipse cx="10" cy="12" rx="4" ry="3.2" fill="#3a3227" />
          <ellipse cx="12" cy="9.5" rx="1.8" ry="3.5" fill="#3a3227" transform="rotate(35 12 9.5)" />
          {/* Shepherd brass bell */}
          <circle cx="13" cy="16" r="1.8" fill="#df8b53" stroke="#b0632b" strokeWidth="0.6" />
        </svg>
      );

    case 'wine':
      // Italian wine carafe / Chianti bottle & bunch of purple grapes
      return (
        <svg
          width={size * 1.0}
          height={size * 1.0}
          viewBox="0 0 36 36"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Wine Bottle with parchment label */}
          <rect x="6" y="12" width="9" height="21" rx="2" fill="#6d1f27" stroke="#3b0f14" strokeWidth="0.9" />
          <rect x="8.5" y="5" width="4" height="8" fill="#6d1f27" stroke="#3b0f14" strokeWidth="0.9" />
          <rect x="7" y="17" width="7" height="9" rx="0.5" fill="#f6f1e6" stroke="#cebe9e" strokeWidth="0.6" />
          <line x1="8" y1="20" x2="13" y2="20" stroke="#7a6c53" strokeWidth="0.8" />
          <line x1="8" y1="23" x2="12" y2="23" stroke="#7a6c53" strokeWidth="0.6" />

          {/* Bunch of Grapes */}
          <circle cx="21" cy="22" r="2.8" fill="#582a5c" stroke="#351638" strokeWidth="0.6" />
          <circle cx="25" cy="21" r="2.8" fill="#6b3470" stroke="#351638" strokeWidth="0.6" />
          <circle cx="29" cy="22" r="2.8" fill="#582a5c" stroke="#351638" strokeWidth="0.6" />
          <circle cx="23" cy="26" r="2.8" fill="#582a5c" stroke="#351638" strokeWidth="0.6" />
          <circle cx="27" cy="26" r="2.8" fill="#6b3470" stroke="#351638" strokeWidth="0.6" />
          <circle cx="25" cy="30" r="2.5" fill="#4d2251" stroke="#351638" strokeWidth="0.6" />
          {/* Vine Leaf */}
          <path d="M25,18 Q27,13 23,12 Q20,15 25,18 Z" fill="#527d42" stroke="#2e4d22" strokeWidth="0.7" />
        </svg>
      );

    case 'bike':
      // The Slow Cyclist Signature Touring Bicycle
      return (
        <svg
          width={size * 1.4}
          height={size * 0.9}
          viewBox="0 0 50 32"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Ground shadow */}
          <ellipse cx="25" cy="30" rx="20" ry="2" fill="#3c4a40" opacity="0.3" />

          {/* Spoke Wheels */}
          <circle cx="12" cy="20" r="9" stroke="#2c332e" strokeWidth="2" fill="white" fillOpacity="0.4" />
          <circle cx="12" cy="20" r="1.5" fill="#2c332e" />
          <circle cx="38" cy="20" r="9" stroke="#2c332e" strokeWidth="2" fill="white" fillOpacity="0.4" />
          <circle cx="38" cy="20" r="1.5" fill="#2c332e" />

          {/* Terracotta/Ochre Slow Cyclist Steel Frame */}
          <path d="M12,20 L21,9 L34,9 L38,20" stroke="#df8b53" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21,9 L26,20 L12,20" stroke="#df8b53" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Touring Drop Handlebars & Brass Bell */}
          <path d="M34,9 L32,4 L36,4" stroke="#2c332e" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="33" cy="3" r="1.5" fill="#df8b53" />

          {/* Handcrafted Leather Saddle */}
          <path d="M18,6 L24,6" stroke="#4d3b2c" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="21" y1="9" x2="20" y2="6" stroke="#2c332e" strokeWidth="2" />

          {/* Canvas Touring Pannier Bag */}
          <rect x="6" y="11" width="8" height="10" rx="1.5" fill="#586b55" stroke="#313d30" strokeWidth="1" />
          <line x1="6" y1="14" x2="14" y2="14" stroke="#41523f" strokeWidth="1" />
        </svg>
      );

    case 'boat':
      // Traditional Mediterranean wooden fishing barque with ivory sails
      return (
        <svg
          width={size * 1.3}
          height={size * 1.1}
          viewBox="0 0 46 38"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Wake ripple lines on turquoise sea */}
          <path d="M2,33 Q8,31 16,33 Q24,35 32,33 Q40,31 44,33" stroke="#f6f3e6" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <path d="M6,36 Q14,34 22,36 Q30,38 38,36" stroke="#f6f3e6" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />

          {/* Wooden Hull */}
          <path d="M8,26 Q12,33 24,33 Q36,33 40,26 Z" fill="#5a3d28" stroke="#382517" strokeWidth="1.2" />
          <path d="M8,26 L40,26" stroke="#df8b53" strokeWidth="1.5" />

          {/* Mast */}
          <line x1="24" y1="6" x2="24" y2="26" stroke="#382517" strokeWidth="1.8" />

          {/* Ivory Billowing Sails */}
          <path d="M24,7 Q34,14 35,24 L24,24 Z" fill="#fdfbf5" stroke="#d5cbba" strokeWidth="1" />
          <path d="M24,9 Q15,16 13,24 L24,24 Z" fill="#f3eee0" stroke="#d5cbba" strokeWidth="1" />

          {/* Red pennant flag */}
          <polygon points="24,6 20,4 24,2" fill="#df503b" />
        </svg>
      );

    case 'church':
      // Whitewashed stone country chapel with terracotta / blue roof & bell
      return (
        <svg
          width={size * 1.1}
          height={size * 1.0}
          viewBox="0 0 38 36"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Stone base */}
          <rect x="8" y="14" width="22" height="18" rx="1" fill="#f7f4ea" stroke="#685d4c" strokeWidth="1.2" />
          {/* Terracotta/Blue pitched roof */}
          <polygon points="6,14 19,4 32,14" fill="#c4623e" stroke="#7e371d" strokeWidth="1.2" />
          {/* Arched Doorway */}
          <path d="M16,32 L16,23 Q19,20 22,23 L22,32 Z" fill="#4d3b2c" stroke="#2e2218" strokeWidth="1" />
          {/* Bell Gable / Cross */}
          <rect x="17" y="1" width="4" height="4" fill="#f7f4ea" stroke="#685d4c" strokeWidth="0.8" />
          <line x1="19" y1="0" x2="19" y2="4" stroke="#685d4c" strokeWidth="1.2" />
          <line x1="17.5" y1="1.5" x2="20.5" y2="1.5" stroke="#685d4c" strokeWidth="1" />
          {/* Small rose window */}
          <circle cx="19" cy="11" r="2.2" fill="#4d3b2c" stroke="#685d4c" strokeWidth="0.6" />
        </svg>
      );

    case 'lemon':
      // Branch of Mediterranean lemons with green foliage
      return (
        <svg
          width={size * 0.9}
          height={size * 0.9}
          viewBox="0 0 32 32"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Branch twig */}
          <path d="M6,8 Q14,12 26,10" stroke="#5d4734" strokeWidth="1.8" strokeLinecap="round" />
          {/* Dark green leaves */}
          <path d="M10,9 Q8,2 15,4 Q16,9 10,9 Z" fill="#395834" stroke="#1f331c" strokeWidth="0.8" />
          <path d="M20,10 Q24,4 28,8 Q24,14 20,10 Z" fill="#4a6e44" stroke="#1f331c" strokeWidth="0.8" />
          {/* Bright yellow lemons */}
          <ellipse cx="14" cy="18" rx="6.5" ry="8" fill="#f7cf3e" stroke="#bda02b" strokeWidth="1" transform="rotate(-15 14 18)" />
          <ellipse cx="22" cy="20" rx="5" ry="6.5" fill="#f3c62f" stroke="#bda02b" strokeWidth="0.9" transform="rotate(25 22 20)" />
          {/* White citrus blossom */}
          <circle cx="10" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      );

    case 'compass':
      // Hand-lettered Antique Cartographic Compass Rose
      return (
        <svg
          width={size * 1.3}
          height={size * 1.3}
          viewBox="0 0 54 54"
          fill="none"
          className={`drop-shadow-sm select-none ${className}`}
        >
          {/* Concentric rings */}
          <circle cx="27" cy="27" r="24" stroke="#485c52" strokeWidth="1.2" fill="#faf7ee" fillOpacity="0.85" />
          <circle cx="27" cy="27" r="21" stroke="#485c52" strokeWidth="0.6" strokeDasharray="1.5 2" />
          <circle cx="27" cy="27" r="4.5" fill="#2b3832" />

          {/* 8-Point Compass Star */}
          {/* North Point (Fleur-de-lis styled tip) */}
          <polygon points="27,6 29.5,23 27,27 24.5,23" fill="#df503b" />
          <polygon points="27,6 27,27 24.5,23" fill="#c03e2a" />
          {/* South Point */}
          <polygon points="27,48 29.5,31 27,27 24.5,31" fill="#485c52" />
          <polygon points="27,48 27,27 24.5,31" fill="#2d3b34" />
          {/* East Point */}
          <polygon points="48,27 31,29.5 27,27 31,24.5" fill="#485c52" />
          <polygon points="48,27 27,27 31,24.5" fill="#2d3b34" />
          {/* West Point */}
          <polygon points="6,27 23,29.5 27,27 23,24.5" fill="#485c52" />
          <polygon points="6,27 27,27 23,24.5" fill="#2d3b34" />

          {/* Lettering N */}
          <text x="27" y="16" textAnchor="middle" className="font-editorial text-[9px] font-bold fill-[#df503b] select-none">
            N
          </text>
        </svg>
      );

    default:
      return null;
  }
};
