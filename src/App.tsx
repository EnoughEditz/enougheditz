import React, { useState, useEffect, useRef, useCallback, TouchEvent as ReactTouchEvent } from 'react';
import { 
  INITIAL_DRIVE_CATEGORIES, 
  GDRIVE_ROOT_FOLDER_URL,
  DriveCategory,
  DriveVideo
} from './data/drivePortfolio';
import { AdityaAvatar } from './components/AdityaAvatar';

// Software Used Suite matching the user's software (After Effects, Premiere Pro, Photoshop, DaVinci Resolve)
const SOFTWARE_USED = [
  {
    name: "After Effects",
    role: "GeoLayers 3 & Motion",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
    url: "https://www.adobe.com/products/aftereffects.html"
  },
  {
    name: "Premiere Pro",
    role: "Pacing & Assembly",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    url: "https://www.adobe.com/products/premiere.html"
  },
  {
    name: "Photoshop",
    role: "Asset Design",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    url: "https://www.adobe.com/products/photoshop.html"
  },
  {
    name: "DaVinci Resolve",
    role: "Color & Sound",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    url: "https://www.blackmagicdesign.com/products/davinciresolve"
  }
];

// Helper to extract Google Drive file or folder ID
const gid = (url?: string): string | null => {
  if (!url) return null;
  const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD) return matchD[1];
  const matchFolders = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (matchFolders) return matchFolders[1];
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(url.trim())) return url.trim();
  return null;
};

// Generate multiple thumbnail URL candidates for Google Drive files
// Tries multiple known endpoints to maximize loading success
const getDriveThumbnailUrls = (fileId: string): string[] => [
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
  `https://lh3.googleusercontent.com/d/${fileId}=w800`,
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
];

// SVG Icon Helper
interface IconProps {
  c?: string;
  fill?: boolean;
  d: string | React.ReactNode;
}

const I = ({ d, c = "w-5 h-5", fill = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={c}
  >
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);

const PlayI  = ({ c }: { c?: string }) => <I c={c} fill d="M8 5v14l11-7z" />;
const XI     = ({ c }: { c?: string }) => <I c={c} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const LeftI  = ({ c }: { c?: string }) => <I c={c} d={<polyline points="15 18 9 12 15 6"/>} />;
const RightI = ({ c }: { c?: string }) => <I c={c} d={<polyline points="9 18 15 12 9 6"/>} />;
const SunI   = ({ c }: { c?: string }) => <I c={c} d={<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>} />;
const MoonI  = ({ c }: { c?: string }) => <I c={c} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const MailI  = ({ c }: { c?: string }) => <I c={c} d={<><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="22,7 12,14 2,7"/></>} />;
const PinI   = ({ c }: { c?: string }) => <I c={c} d={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>} />;
const ArrowI = ({ c }: { c?: string }) => <I c={c} d={<><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>} />;
const MenuI  = ({ c }: { c?: string }) => <I c={c} d={<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>} />;

// Image component with fallback chain for Google Drive thumbnails
const DriveThumb = ({ 
  video, 
  className = "" 
}: { 
  video: DriveVideo; 
  className?: string;
}) => {
  const fileId = gid(video.url) || gid(video.id);
  const urls = fileId ? getDriveThumbnailUrls(fileId) : [];
  const [urlIdx, setUrlIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Reset state when video changes
  useEffect(() => {
    setUrlIdx(0);
    setLoaded(false);
    setFailed(false);
  }, [video.id]);

  const handleError = () => {
    if (urlIdx < urls.length - 1) {
      setUrlIdx(prev => prev + 1);
    } else {
      setFailed(true);
    }
  };

  const currentUrl = video.thumb || urls[urlIdx] || null;

  if (failed || !currentUrl) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white/70 ${className}`}>
        <div className="text-center p-3">
          <PlayI c="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-xs font-medium leading-tight">{video.title}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}
      <img
        src={currentUrl}
        alt={video.title}
        className={`${className} transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </>
  );
};

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('vis');
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

// High-fidelity Apple Theme Toggle
const ThemeToggle = ({ dark, toggle }: { dark: boolean; toggle: () => void }) => (
  <button
    type="button"
    onClick={toggle}
    aria-label={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    className="relative flex h-[32px] w-[58px] items-center rounded-full p-[3px] transition-all duration-300 bg-black/[.08] dark:bg-white/[.15] border border-black/[.08] dark:border-white/[.15] cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
  >
    <span
      className={`h-[26px] w-[26px] rounded-full bg-white dark:bg-[#2c2c2e] shadow-sm flex items-center justify-center transition-transform duration-300 ${
        dark ? 'translate-x-[26px]' : 'translate-x-0'
      }`}
    >
      {dark ? <MoonI c="h-3.5 w-3.5 text-apple-blue" /> : <SunI c="h-3.5 w-3.5 text-amber-500" />}
    </span>
  </button>
);

const Pill = ({
  category,
  active,
  onClick
}: {
  category: DriveCategory;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    data-cat-id={category.id}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-full text-caption font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer select-none px-4 py-2 sm:px-5 sm:py-2.5 capitalize gap-1.5 sm:gap-2 ${
      active
        ? 'bg-apple-black text-white dark:bg-white dark:text-apple-black shadow-lg scale-105 ring-2 ring-black/10 dark:ring-white/30'
        : 'text-apple-gray hover:text-apple-black dark:hover:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.1]'
    }`}
    style={{ scrollSnapAlign: 'center' }}
  >
    <span className="text-[13px] sm:text-[14px]">{category.label}</span>
    <span className={`text-[11px] sm:text-[12px] opacity-80 ${active ? 'text-white/90 dark:text-black/80 font-bold' : 'text-apple-gray'}`}>
      ({category.videos?.length || 0})
    </span>
  </button>
);

const BtnP = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-apple-blue text-white text-[15px] sm:text-body font-medium px-5 py-2.5 sm:px-7 sm:py-3 hover:bg-[#0077ED] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[.97] transition-all duration-200 ${className}`}
  >
    {children}
  </a>
);

const BtnS = ({
  href,
  children,
  className = '',
  target
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}) => (
  <a
    href={href}
    target={target || (href?.startsWith('http') ? '_blank' : undefined)}
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full border border-black/[.15] dark:border-white/[.2] text-apple-black dark:text-white text-[15px] sm:text-body font-medium px-5 py-2.5 sm:px-7 sm:py-3 hover:bg-black/[.04] dark:hover:bg-white/[.06] active:scale-[.97] transition-all duration-200 ${className}`}
  >
    {children}
  </a>
);

// Responsive Coverflow with touch swipe support
const Coverflow = ({
  videos,
  onPlay,
  folderName,
  isTransitioning,
  catId
}: {
  videos: DriveVideo[];
  onPlay: (v: DriveVideo) => void;
  folderName: string;
  isTransitioning: boolean;
  catId: string;
}) => {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    setIdx(0);
  }, [videos, catId]);

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: ReactTouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) {
        go(1); // swipe left = next
      } else {
        go(-1); // swipe right = prev
      }
    }
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="h-[300px] sm:h-[380px] flex flex-col items-center justify-center text-apple-gray max-w-md mx-auto text-center px-4 animate-carousel-switch">
        <div className="w-12 h-12 rounded-2xl bg-black/[.03] dark:bg-white/[.05] flex items-center justify-center mb-3">
          <PlayI c="w-6 h-6 opacity-30 text-apple-black dark:text-white" />
        </div>
        <p className="text-body font-semibold text-apple-black dark:text-white">
          No videos found in "{folderName}"
        </p>
        <p className="text-caption text-apple-gray mt-1">
          Upload video files into this Google Drive folder to showcase them here.
        </p>
      </div>
    );
  }

  const go = (d: number) => setIdx((i) => (i + d + videos.length) % videos.length);

  return (
    <div 
      key={catId}
      className={`relative w-full max-w-2xl mx-auto h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none animate-carousel-switch transition-all duration-300 ${
        isTransitioning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Nav arrows - tight to the cards */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous video"
        className="hidden sm:flex absolute left-0 md:left-2 z-50 w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 glass items-center justify-center text-apple-black dark:text-white hover:scale-110 active:scale-95 transition-transform shadow-md cursor-pointer"
      >
        <LeftI c="w-[18px] h-[18px]" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next video"
        className="hidden sm:flex absolute right-0 md:right-2 z-50 w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 glass items-center justify-center text-apple-black dark:text-white hover:scale-110 active:scale-95 transition-transform shadow-md cursor-pointer"
      >
        <RightI c="w-[18px] h-[18px]" />
      </button>

      {/* Mobile swipe hint dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 flex sm:hidden gap-1.5">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              i === idx 
                ? 'w-6 h-2 bg-apple-blue' 
                : 'w-2 h-2 bg-black/20 dark:bg-white/20'
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] h-full flex items-center justify-center">
        {videos.map((v, i) => {
          let diff = i - idx;
          const n = videos.length;
          if (diff > n / 2) diff -= n;
          if (diff < -n / 2) diff += n;
          const ctr = diff === 0;
          const abs = Math.abs(diff);

          // Responsive offset - tighter on mobile
          const offsetPercent = typeof window !== 'undefined' && window.innerWidth < 640 ? 70 : 85;

          return (
            <div
              key={v.id || i}
              onClick={() => (ctr ? onPlay(v) : setIdx(i))}
              className={`absolute top-1/2 left-1/2 w-[180px] sm:w-[210px] md:w-[240px] lg:w-[260px] aspect-[9/16] rounded-[18px] sm:rounded-[22px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                ctr
                  ? 'shadow-[0_20px_60px_rgba(0,0,0,.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,.6)] ring-1 ring-black/5 dark:ring-white/15'
                  : 'shadow-md hover:brightness-50'
              }`}
              style={{
                transform: `translate(-50%,-50%) translateX(${diff * offsetPercent}%) scale(${ctr ? 1 : 0.82})`,
                zIndex: 40 - abs,
                opacity: abs > 1 ? 0 : 1,
                filter: ctr ? 'brightness(1)' : 'brightness(.35)',
                pointerEvents: abs > 1 ? 'none' : 'auto',
              }}
            >
              <div className="absolute inset-0 bg-apple-card dark:bg-[#1c1c1e] overflow-hidden">
                <DriveThumb
                  video={v}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-300 ${
                  ctr ? 'opacity-75' : 'opacity-90'
                }`}
              />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-3 sm:p-5 text-center">
                {ctr && (
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center mb-3 sm:mb-4 shadow-xl backdrop-blur-sm hover:scale-110 active:scale-95 transition-transform group">
                    <PlayI c="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 text-black" />
                  </div>
                )}
                <h4 className="text-[14px] sm:text-[17px] font-semibold tracking-[-0.022em] text-white leading-tight line-clamp-2">
                  {v.title}
                </h4>
                <p className="text-[10px] sm:text-mini text-white/60 mt-1 font-medium">Enough Editz</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  // Real Google Drive categories and videos from the fixed Google Drive portfolio folder
  const categories = INITIAL_DRIVE_CATEGORIES;
  const [cat, setCat] = useState<string>(INITIAL_DRIVE_CATEGORIES[0]?.id || "1yrenEvYv5eLezcsf0nUl5pq4SxYb4oUX");
  const [playing, setPlaying] = useState<DriveVideo | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark/Light Mode state with persistence and system preference check
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  // Close mobile menu on nav click
  const navClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
  };

  // Step Category by Carousel Buttons and center it
  const stepCategory = (direction: number) => {
    const currentIdx = categories.findIndex((c) => c.id === cat);
    const nextIdx = (currentIdx + direction + categories.length) % categories.length;
    const nextCat = categories[nextIdx];
    if (nextCat) {
      handleSelectCategory(nextCat.id);
    }
  };

  // Smooth Category Select with reactive loading state
  const handleSelectCategory = (newCatId: string) => {
    if (newCatId === cat) return;
    setIsTransitioning(true);
    setCat(newCatId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  // Horizontal Filter Scroll Ref
  const filterScrollRef = useRef<HTMLDivElement>(null);

  // Center active category pill in the exact middle of the screen/container
  const centerActivePill = () => {
    const container = filterScrollRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-cat-id="${cat}"]`) as HTMLElement | null;
    if (activeEl) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const currentDiff = (elRect.left + elRect.width / 2) - (containerRect.left + containerRect.width / 2);
      if (Math.abs(currentDiff) > 1) {
        container.scrollBy({
          left: currentDiff,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    centerActivePill();
    const t = setTimeout(centerActivePill, 60);
    return () => clearTimeout(t);
  }, [cat]);

  const refWork = useReveal();
  const refTools = useReveal();
  const refAbout = useReveal();
  const refContact = useReveal();

  useEffect(() => {
    document.body.style.overflow = playing || menuOpen ? 'hidden' : '';
  }, [playing, menuOpen]);

  // Apply dark class and data-theme to both html and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (dark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCategory = categories.find((c) => c.id === cat) || categories[0];
  const vids = activeCategory?.videos ?? [];

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // Already a preview URL
    if (url.includes('/preview')) return url;
    // Convert view to preview
    if (url.includes('drive.google.com') && url.includes('/view')) {
      return url.replace('/view', '/preview');
    }
    // Extract drive ID and make preview URL
    const driveId = gid(url);
    if (driveId && !url.includes('youtube') && !url.includes('vimeo')) {
      return `https://drive.google.com/file/d/${driveId}/preview`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-apple-bg text-apple-black dark:bg-black dark:text-[#f5f5f7] transition-colors duration-500">
      {/* Top Navbar - responsive with hamburger on mobile */}
      <nav className="fixed top-0 inset-x-0 z-[100] glass bg-white/85 dark:bg-[#1d1d1f]/85 border-b border-black/[.08] dark:border-white/[.08] transition-colors duration-300">
        <div className="max-w-[980px] mx-auto h-12 px-4 sm:px-5 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 text-caption font-semibold tracking-tight text-apple-black dark:text-white hover:opacity-80 transition-opacity"
          >
            <AdityaAvatar className="w-7 h-7" showRing={false} />
            <span className="font-bold tracking-tight">Enough Editz</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6 text-mini text-apple-gray">
            <a href="#work" className="link-ul hover:text-apple-black dark:hover:text-white transition-colors">
              Categories
            </a>
            <a href="#about" className="link-ul hover:text-apple-black dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#tools" className="link-ul hover:text-apple-black dark:hover:text-white transition-colors">
              Tools
            </a>
            <a href="#contact" className="link-ul hover:text-apple-black dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle dark={dark} toggle={toggleTheme} />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <ThemeToggle dark={dark} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {menuOpen ? <XI c="w-5 h-5" /> : <MenuI c="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-black/[.08] dark:border-white/[.08] bg-white/95 dark:bg-[#1d1d1f]/95 glass animate-slideDown">
            <div className="flex flex-col px-5 py-3 gap-1">
              {[
                { href: '#work', label: 'Categories' },
                { href: '#about', label: 'About' },
                { href: '#tools', label: 'Tools' },
                { href: '#contact', label: 'Contact' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={navClick}
                  className="py-2.5 px-3 text-[15px] font-medium text-apple-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="pt-[100px] sm:pt-[120px] md:pt-[135px] pb-4 sm:pb-6 px-4 sm:px-6 text-center max-w-[980px] mx-auto">
        {/* Available for Work Pill Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white dark:bg-[#1c1c1e] text-apple-black dark:text-white border border-black/10 dark:border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] mb-5 sm:mb-6 hover:scale-105 active:scale-95 transition-all duration-300 anim-hero cursor-default">
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
            <AdityaAvatar className="w-5 h-5 sm:w-6 sm:h-6" showRing={false} />
          </div>
          <span className="font-bold text-[12px] sm:text-[13px] tracking-tight text-apple-black dark:text-white">
            EnoughEditz
          </span>
          <span className="text-black/25 dark:text-white/30 text-[10px]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-medium text-apple-gray dark:text-neutral-300">
              Available for Work
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-title-2 sm:text-title-1 lg:text-display anim-hero text-apple-black dark:text-white">
          Motion made to <br className="hidden sm:block" />
          <span className="text-apple-gray">hold attention.</span>
        </h1>
        <p className="mt-4 sm:mt-5 text-[16px] sm:text-body-l text-apple-gray max-w-2xl mx-auto anim-hero anim-d1 px-2">
          High-retention edits, immersive 3D maps, and precision sound design — built for creators who demand the best.
        </p>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap anim-hero anim-d2">
          <BtnP href="#work">Explore Categories</BtnP>
          <BtnS href="#contact">Get in Touch</BtnS>
        </div>
      </header>

      {/* Categories Section with Centered Filter Bar */}
      <section id="work" ref={refWork} className="reveal pt-10 sm:pt-14 pb-14 sm:pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6">
          <h2 className="text-title-3 text-apple-black dark:text-white mb-4 sm:mb-5">Categories</h2>

          {/* Centered Single-Line Carousel Filter with Left & Right Buttons */}
          <div className="relative max-w-4xl mx-auto my-3 px-1 sm:px-6">
            {/* Left Button - hidden on very small screens */}
            <button
              onClick={() => stepCategory(-1)}
              aria-label="Previous category"
              className="hidden sm:flex absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#2c2c2e]/95 shadow-lg border border-black/10 dark:border-white/15 items-center justify-center text-apple-black dark:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <LeftI c="w-4 h-4" />
            </button>

            {/* Centered Scrollable Container */}
            <div
              ref={filterScrollRef}
              className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-sb scroll-smooth py-3 max-w-full"
              style={{
                paddingLeft: 'calc(50% - 80px)',
                paddingRight: 'calc(50% - 80px)',
                scrollSnapType: 'x proximity'
              }}
            >
              {categories.map((c) => (
                <Pill
                  key={c.id}
                  category={c}
                  active={cat === c.id}
                  onClick={() => handleSelectCategory(c.id)}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => stepCategory(1)}
              aria-label="Next category"
              className="hidden sm:flex absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#2c2c2e]/95 shadow-lg border border-black/10 dark:border-white/15 items-center justify-center text-apple-black dark:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <RightI c="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Coverflow Display with Real Google Drive Videos */}
        <Coverflow
          videos={vids}
          onPlay={setPlaying}
          folderName={activeCategory?.label || 'Folder'}
          isTransitioning={isTransitioning}
          catId={cat}
        />
      </section>

      {/* About Section with Nagpur, Maharashtra & Avatar */}
      <section
        id="about"
        ref={refAbout}
        className="reveal py-14 sm:py-20 px-4 sm:px-6 bg-white dark:bg-black border-t border-b border-black/[.06] dark:border-white/[.06]"
      >
        <div className="max-w-[860px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12 md:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center text-center">
            {/* Illustrated Profile Pic */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 p-1">
              <AdityaAvatar className="w-full h-full" showRing={false} />
            </div>
            <h3 className="text-headline text-apple-black dark:text-white">Aditya Anil Khekade</h3>
            <p className="text-caption text-apple-gray mt-1">Video Editor &amp; Motion Designer</p>
            <div className="flex items-center gap-1.5 mt-2.5 text-mini text-apple-gray/70">
              <PinI c="w-3.5 h-3.5 text-orange-500" /> Nagpur, Maharashtra
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-title-2 text-apple-black dark:text-white mb-3 sm:mb-4">
              Ideas set<br className="hidden md:block" /> in motion.
            </h2>
            <p className="text-[15px] sm:text-body text-apple-gray leading-relaxed mb-5 sm:mb-6 max-w-lg mx-auto md:mx-0">
              I turn complex narratives into seamless, scroll-stopping video assets. From geo-animated maps built with GeoLayers to frame-perfect motion graphics — every project is crafted for maximum retention on the modern digital landscape.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <BtnP href="mailto:adityaanilkhekade@gmail.com?subject=Project%20Inquiry">
                <MailI c="w-[18px] h-[18px]" /> Send an Email
              </BtnP>
              <BtnS href="https://www.fiverr.com" target="_blank">
                Fiverr <ArrowI c="w-3.5 h-3.5 opacity-50" />
              </BtnS>
              <BtnS href="https://www.youtube.com/@EnoughEditz" target="_blank">
                YouTube <ArrowI c="w-3.5 h-3.5 opacity-50" />
              </BtnS>
            </div>
          </div>
        </div>
      </section>

      {/* Software Used Section */}
      <section
        id="tools"
        ref={refTools}
        className="reveal py-10 sm:py-14 px-4 sm:px-6 text-center border-b border-black/[.06] dark:border-white/[.06] bg-apple-bg dark:bg-black transition-colors"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-mini uppercase tracking-widest text-apple-gray font-semibold mb-2">Production Suite</p>
          <h3 className="text-title-3 text-apple-black dark:text-white mb-2">Software &amp; Tools</h3>
          <p className="text-caption text-apple-gray mb-6">Click any tool to visit the official product page &amp; download</p>

          {/* Grid layout: 2x2 on mobile, 4-in-a-row on sm+ */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2.5 sm:gap-3 py-2 px-2 sm:px-3 max-w-md sm:max-w-full mx-auto">
            {SOFTWARE_USED.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${app.name} website & download`}
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full bg-white dark:bg-[#1c1c1e] border border-black/[.08] dark:border-white/[.12] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0 group"
              >
                <img src={app.icon} alt={app.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                <span className="text-[12px] sm:text-caption font-semibold text-apple-black dark:text-white whitespace-nowrap group-hover:text-apple-blue transition-colors">
                  {app.name}
                </span>
                <ArrowI c="w-3 h-3 text-apple-gray opacity-40 group-hover:opacity-100 group-hover:text-apple-blue transition-all" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pure Email Contact Section */}
      <section
        id="contact"
        ref={refContact}
        className="reveal py-20 sm:py-28 px-4 sm:px-6 bg-apple-card dark:bg-[#111] text-center"
      >
        <div className="max-w-xl mx-auto">
          <p className="text-mini uppercase tracking-widest text-apple-gray/60 font-semibold mb-2">Get in touch</p>
          <h3 className="text-title-2 text-apple-black dark:text-white mb-3 sm:mb-4">
            Let's create<br />something great.
          </h3>
          <p className="text-[15px] sm:text-body text-apple-gray mb-8 sm:mb-10">Tap below to open your mail app with my address pre-filled.</p>
          <BtnP href="mailto:adityaanilkhekade@gmail.com?subject=Inquiry%20from%20Portfolio" className="text-[14px] sm:text-[17px] px-6 py-3 sm:px-9 sm:py-[14px]">
            <MailI c="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">adityaanilkhekade@gmail.com</span>
            <span className="sm:hidden">Email Me</span>
          </BtnP>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 sm:py-6 bg-white dark:bg-black border-t border-black/[.06] dark:border-white/[.06]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-mini text-apple-gray/60">© 2026 Aditya Anil Khekade</p>
          <div className="flex gap-4 sm:gap-6 text-mini text-apple-gray/60">
            <a href="#work" className="hover:text-apple-black dark:hover:text-white transition-colors">
              Categories
            </a>
            <a href="#tools" className="hover:text-apple-black dark:hover:text-white transition-colors">
              Tools
            </a>
            <a href="#about" className="hover:text-apple-black dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-apple-black dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* 9:16 Video Player Modal - fully responsive */}
      {playing && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4"
          style={{ animation: 'rise .3s ease forwards' }}
        >
          <div
            className="absolute inset-0 bg-white/80 dark:bg-black/80 glass"
            onClick={() => setPlaying(null)}
          />
          <button
            onClick={() => setPlaying(null)}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[210] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/[.06] dark:bg-white/[.1] hover:bg-black/[.1] dark:hover:bg-white/[.2] flex items-center justify-center transition-colors cursor-pointer"
          >
            <XI c="w-[18px] h-[18px] text-apple-black dark:text-white" />
          </button>
          <div
            className="relative z-[210] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]"
            style={{ animation: 'rise .45s cubic-bezier(.25,1,.5,1) forwards' }}
          >
            <div className="w-full aspect-[9/16] bg-black rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              {playing.url ? (
                <iframe
                  src={getEmbedUrl(playing.url)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={playing.title}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-apple-gray">
                  <PlayI c="w-12 h-12 mb-3 opacity-40" />
                  <p className="text-body font-medium text-white">{playing.title}</p>
                </div>
              )}
            </div>
            <p className="text-center mt-4 sm:mt-5 text-[13px] sm:text-caption font-semibold text-apple-black dark:text-white line-clamp-1">
              {playing.title}
            </p>
            <p className="text-center text-[11px] sm:text-mini text-apple-gray mt-0.5">Enough Editz</p>
          </div>
        </div>
      )}
    </div>
  );
}
