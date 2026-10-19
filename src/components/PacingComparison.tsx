import React, { useState } from 'react';
import { Sparkles, Zap, Volume2, Move, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const PacingComparison: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'after' | 'before'>('after');
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      title: "3D GeoLayers Map Flyover",
      standard: "Flat static screenshot of a Google map or basic 2D image.",
      enoughEditz: "Dynamic 3D terrain elevation, satellite textures, animated border conquest lines, and camera fly-ins with tilt-shift depth of field.",
      retentionGain: "+32% on historical / geopolitical chapters",
      icon: Layers,
      previewBg: "from-blue-600/30 to-indigo-900/40"
    },
    {
      title: "Micro-Pacing & Pattern Interrupts",
      standard: "Continuous uninterrupted talking head that causes viewer eye fatigue after 4 seconds.",
      enoughEditz: "Every 2.5–3.8 seconds: subtle camera push-ins, visual b-roll collages, paper cutout textures, and split-screen asset framing.",
      retentionGain: "Eliminates the 10-second drop-off cliff",
      icon: Zap,
      previewBg: "from-amber-600/30 to-orange-900/40"
    },
    {
      title: "Tactile Multi-Stem Sound Design",
      standard: "Generic background royalty-free lo-fi track with zero sync to narrative beats.",
      enoughEditz: "Layered foley, cinematic sub-bass braams, air swooshes on zooms, paper crinkles, and vocal compression calibrated for smartphone speakers.",
      retentionGain: "Creates physiological dopamine triggers",
      icon: Volume2,
      previewBg: "from-emerald-600/30 to-teal-900/40"
    },
    {
      title: "Kinetic Typography & Highlighting",
      standard: "Default white subtitles centered at the bottom that viewers tune out.",
      enoughEditz: "Hand-curated typography with micro-bounce, keyword color highlights, animated stroke underlines, and bespoke layout positioning.",
      retentionGain: "+25% increase in mute-view completion rate",
      icon: Sparkles,
      previewBg: "from-purple-600/30 to-pink-900/40"
    }
  ];

  return (
    <section id="pacing" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[12px] uppercase tracking-widest text-[#86868b] font-semibold mb-2">
          The Science of Watch Time
        </p>
        <h2 className="text-[32px] md:text-[44px] font-bold text-[#1d1d1f] dark:text-white tracking-tight leading-tight">
          How we turn drop-offs<br className="hidden sm:block"/> into 70%+ retention.
        </h2>
        <p className="mt-4 text-[17px] text-[#86868b]">
          Modern algorithms reward videos that hold attention past the 30-second mark. Here is the exact difference between amateur timeline cuts and Enough Editz engineering.
        </p>
      </div>

      {/* Interactive Toggle Switch */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center p-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08]">
          <button
            onClick={() => setActiveMode('before')}
            className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
              activeMode === 'before'
                ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            Standard Video Cut
          </button>
          <button
            onClick={() => setActiveMode('after')}
            className={`px-6 py-2 rounded-full text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'after'
                ? 'bg-[#0071e3] text-white shadow-md'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enough Editz Polish</span>
          </button>
        </div>
      </div>

      {/* Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#161617] rounded-[36px] p-6 md:p-10 border border-black/[0.06] dark:border-white/[0.08] shadow-lg">
        {/* Visual Mockup Card (Left/Center) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            className={`relative w-full max-w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden border transition-all duration-500 shadow-xl ${
              activeMode === 'after'
                ? 'border-[#0071e3]/40 ring-4 ring-[#0071e3]/10 dark:ring-[#0071e3]/20 bg-gradient-to-br from-black via-[#0d1527] to-[#040814]'
                : 'border-black/10 dark:border-white/10 bg-[#1a1a1a]'
            }`}
          >
            {/* Background Texture & Visual elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
              {activeMode === 'after' ? (
                <>
                  {/* High Retention Polish Mockup */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Dynamic Map Lines simulation */}
                  <div className="absolute top-8 inset-x-6 z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0071e3] text-white flex items-center gap-1 shadow-md">
                      <Zap className="w-3 h-3" /> 3D GeoLayers
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/90 text-white font-bold">
                      78% Retention
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto text-left w-full space-y-3 pb-4">
                    {/* Subtitle with highlight */}
                    <div className="p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15">
                      <p className="text-[11px] text-white/60 uppercase font-bold tracking-wider">
                        Kinetic Subtitles
                      </p>
                      <p className="text-[14px] font-extrabold text-white mt-1 leading-snug">
                        "The army crossed the <span className="text-amber-400 underline decoration-2">Gibraltar Strait</span> in 711 AD."
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-white/80 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                      <Volume2 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Cinematic Risers + Foley Synced</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Raw Standard Video Mockup */}
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-white/40 text-xs font-mono">RAW</span>
                  </div>
                  <h4 className="text-[16px] font-semibold text-white/80">
                    Static Uncut Recording
                  </h4>
                  <p className="text-[12px] text-white/40 mt-2 max-w-[200px]">
                    Single camera angle, default boring captions, no sound cues, 50% drop-off by second 15.
                  </p>
                  <div className="mt-8 px-3 py-1 rounded-full text-[11px] bg-rose-500/20 text-rose-300 font-medium border border-rose-500/30">
                    High Viewer Churn
                  </div>
                </>
              )}
            </div>

            {/* Mode badge bottom */}
            <div className="absolute bottom-2.5 inset-x-4 flex justify-center z-20">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                activeMode === 'after'
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-black/80 text-white/70'
              }`}>
                {activeMode === 'after' ? 'Enough Editz Treatment' : 'Standard Raw Cut'}
              </span>
            </div>
          </div>
        </div>

        {/* Feature List (Right) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {features.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeFeature === idx;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black/[0.02] dark:bg-white/[0.04] border-[#0071e3]/40 shadow-sm'
                      : 'border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0071e3] text-white'
                          : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#86868b]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[16px] font-bold text-[#1d1d1f] dark:text-white">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {item.retentionGain}
                        </span>
                      </div>

                      <p className="text-[13px] text-[#86868b] mt-1.5 leading-relaxed">
                        {activeMode === 'after' ? item.enoughEditz : item.standard}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.08] text-[13px]">
            <span className="text-[#86868b]">
              Ready to elevate your watch time?
            </span>
            <a
              href="#contact"
              className="font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
            >
              Get a custom sample cut <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
