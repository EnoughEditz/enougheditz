import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, LayoutGrid, Eye, Sparkles, Clock, Layers } from 'lucide-react';
import { VideoItem } from '../types';

interface CoverflowProps {
  videos: VideoItem[];
  onPlay: (video: VideoItem) => void;
  viewMode: 'coverflow' | 'grid';
  setViewMode: (mode: 'coverflow' | 'grid') => void;
}

export const Coverflow: React.FC<CoverflowProps> = ({
  videos,
  onPlay,
  viewMode,
  setViewMode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [videos]);

  const total = videos.length;

  const navigate = (step: number) => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + step + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'coverflow') return;
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (videos[currentIndex]) {
          onPlay(videos[currentIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos, viewMode]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      navigate(diff > 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="h-[360px] flex flex-col items-center justify-center text-[#86868b] border border-dashed border-black/10 dark:border-white/10 rounded-3xl p-8 max-w-md mx-auto text-center">
        <Sparkles className="w-8 h-8 mb-3 opacity-40 text-[#0071e3]" />
        <p className="text-[17px] font-medium text-[#1d1d1f] dark:text-white">No videos in this category</p>
        <p className="text-[14px] mt-1 text-[#86868b]">Select another category above or sync your Google Drive folder.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* View Mode Toggle & Status */}
      <div className="flex items-center justify-between max-w-4xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0071e3]" />
          <span>Showing <strong>{videos.length}</strong> motion edits</span>
        </div>

        <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.08] p-1 rounded-full text-[12px] font-medium">
          <button
            onClick={() => setViewMode('coverflow')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === 'coverflow'
                ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Coverflow</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {viewMode === 'coverflow' ? (
        /* 3D Coverflow Stage */
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[450px] md:h-[530px] flex items-center justify-center select-none overflow-hidden py-4"
        >
          {/* Nav Buttons */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous edit"
            className="absolute left-4 md:left-12 z-50 w-11 h-11 rounded-full bg-white/80 dark:bg-[#2c2c2e]/80 glass flex items-center justify-center text-[#1d1d1f] dark:text-white hover:scale-105 active:scale-95 transition-transform shadow-md border border-black/5 dark:border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            aria-label="Next edit"
            className="absolute right-4 md:right-12 z-50 w-11 h-11 rounded-full bg-white/80 dark:bg-[#2c2c2e]/80 glass flex items-center justify-center text-[#1d1d1f] dark:text-white hover:scale-105 active:scale-95 transition-transform shadow-md border border-black/5 dark:border-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Carousel */}
          <div className="relative w-full max-w-[280px] h-full flex items-center justify-center">
            {videos.map((v, i) => {
              let diff = i - currentIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const absDiff = Math.abs(diff);

              // Don't render cards that are too far away
              if (absDiff > 2) return null;

              const translateX = diff * 92; // percentage spacing
              const scale = isCenter ? 1 : 0.82;
              const opacity = absDiff > 1 ? 0.35 : 1;
              const brightness = isCenter ? 'brightness(1)' : 'brightness(0.4)';
              const zIndex = 50 - absDiff * 10;

              return (
                <div
                  key={v.id || i}
                  onClick={() => (isCenter ? onPlay(v) : setCurrentIndex(i))}
                  className={`absolute top-1/2 left-1/2 w-[220px] sm:w-[260px] aspect-[9/16] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isCenter
                      ? 'shadow-[0_24px_70px_rgba(0,0,0,0.22)] dark:shadow-[0_30px_90px_rgba(0,113,227,0.2)] ring-2 ring-[#0071e3]/30 dark:ring-white/20'
                      : 'shadow-lg hover:brightness-75'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: brightness,
                    pointerEvents: absDiff > 1 ? 'none' : 'auto',
                  }}
                >
                  {/* Poster / Thumbnail */}
                  <div className="absolute inset-0 bg-[#1c1c1e]">
                    <img
                      src={v.thumb || `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80`}
                      alt={v.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between gap-1 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-black/60 text-white backdrop-blur-md">
                      {v.categoryLabel || v.category}
                    </span>
                    {v.retentionStat && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0071e3]/90 text-white backdrop-blur-md">
                        {v.retentionStat}
                      </span>
                    )}
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 transition-opacity duration-300 ${
                      isCenter ? 'opacity-80' : 'opacity-90'
                    }`}
                  />

                  {/* Center Content & Play Action */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-5 text-center">
                    {isCenter && (
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mb-4 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 transition-transform duration-200 group">
                        <Play className="w-6 h-6 ml-1 text-black fill-black" />
                      </div>
                    )}

                    <h4 className="text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-2">
                      {v.title}
                    </h4>

                    {/* Tools & Details */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
                      {v.tools?.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/15 text-white/90"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 mt-3 text-[11px] text-white/60 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {v.duration}
                      </span>
                      {v.views && <span>{v.views} views</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-1 inset-x-0 flex items-center justify-center gap-1.5 z-40 pointer-events-none">
            {videos.slice(0, 10).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-[#0071e3]'
                    : 'w-1.5 bg-black/20 dark:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Bento Grid Mode */
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((v) => (
            <div
              key={v.id}
              onClick={() => onPlay(v)}
              className="group relative bg-white dark:bg-[#1c1c1e] rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Media Container (9:16 aspect ratio) */}
              <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

                {/* Top stats */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-black/60 text-white backdrop-blur-md">
                    {v.categoryLabel || v.category}
                  </span>
                  {v.retentionStat && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0071e3] text-white">
                      {v.retentionStat}
                    </span>
                  )}
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-black" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[10px] bg-black/70 text-white/90">
                  {v.duration}
                </div>
              </div>

              {/* Info Details */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white line-clamp-2 group-hover:text-[#0071e3] transition-colors leading-snug">
                    {v.title}
                  </h4>
                  <p className="text-[12px] text-[#86868b] mt-1.5 line-clamp-2">
                    {v.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {v.tools?.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-[#86868b]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#0071e3] flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Watch
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
