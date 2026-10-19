import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, Clock, CheckCircle2, Send, Share2 } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onRequestSimilar: (video: VideoItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onRequestSimilar
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  // Format embed URL for Drive, YouTube or raw
  let embedSrc = video.embedUrl || video.url;
  if (video.url.includes('drive.google.com')) {
    embedSrc = video.url.replace('/view', '/preview');
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Portfolio link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Close button top right */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="fixed top-5 right-5 z-[220] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Card */}
      <div
        className="relative z-[210] w-full max-w-[850px] bg-[#161617] text-white rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left / Top: 9:16 Video Player Container */}
        <div className="md:w-[360px] flex-shrink-0 bg-black flex items-center justify-center relative p-2 sm:p-4">
          <div className="w-full aspect-[9/16] max-h-[70vh] rounded-[24px] overflow-hidden bg-black relative shadow-inner ring-1 ring-white/10">
            {embedSrc ? (
              <iframe
                src={embedSrc}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={video.title}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/60">
                <p>No video embed source available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Project Details & Breakdown */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 overflow-y-auto">
          <div>
            {/* Category & Retention Pill */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/10 text-white/90">
                {video.categoryLabel || video.category}
              </span>
              {video.retentionStat && (
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0071e3] text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {video.retentionStat}
                </span>
              )}
            </div>

            <h3 className="text-[22px] md:text-[24px] font-bold text-white leading-tight">
              {video.title}
            </h3>

            {video.clientOrTheme && (
              <p className="text-[13px] text-[#86868b] mt-1 font-medium">
                Theme / Context: <span className="text-white/80">{video.clientOrTheme}</span>
              </p>
            )}

            <p className="text-[14px] text-white/70 leading-relaxed mt-4">
              {video.description}
            </p>

            {/* Production Specifications */}
            <div className="mt-6 space-y-3 pt-5 border-t border-white/10">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white/40">
                Production Stack & Techniques
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {video.tools?.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-white/5 border border-white/10 text-white/90"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[12px]">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="text-white/40 block">Pacing Duration</span>
                  <span className="font-semibold text-white/90">{video.duration}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="text-white/40 block">Target Ratio</span>
                  <span className="font-semibold text-white/90">9:16 Vertical Master</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestSimilar(video);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-[14px] py-3 px-5 transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Request Similar Edit</span>
            </button>

            {video.url && video.url.includes('drive.google.com') && (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white/90 hover:bg-white/10 text-[14px] font-medium py-3 px-4 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Drive</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
