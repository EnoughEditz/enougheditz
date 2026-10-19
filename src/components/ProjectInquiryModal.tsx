import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Check, Copy, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';
import { VideoItem } from '../types';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVideo?: VideoItem | null;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedVideo
}) => {
  const [projectType, setProjectType] = useState<string>('3D GeoLayers Map Animation');
  const [videoLength, setVideoLength] = useState<string>('1 - 3 Minutes');
  const [timeline, setTimeline] = useState<string>('Standard (3 - 7 days)');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [channelUrl, setChannelUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedVideo) {
      if (preselectedVideo.category === 'maps') {
        setProjectType('3D GeoLayers Map Animation');
      } else if (preselectedVideo.category === 'retention') {
        setProjectType('High-Retention YouTube Longform Cut');
      } else if (preselectedVideo.category === 'reels') {
        setProjectType('Viral Short-Form / Reel (9:16)');
      }
      setNotes(`Interested in a style similar to: "${preselectedVideo.title}".`);
    }
  }, [preselectedVideo]);

  if (!isOpen) return null;

  const emailSubject = encodeURIComponent(`Project Inquiry: ${projectType} — ${clientName || 'Creator'}`);
  const emailBodyText = `Hi Aditya,

I'm reaching out through your Enough Editz portfolio to discuss a new video project.

--- PROJECT DETAILS ---
• Style/Format: ${projectType}
• Video Length: ${videoLength}
• Target Delivery: ${timeline}
• Client/Channel: ${channelUrl || 'Not specified'}

--- PROJECT OVERVIEW & NOTES ---
${notes || 'Looking for high-retention motion design and editing.'}

Best regards,
${clientName || 'Prospective Client'}
${clientEmail ? `Contact Email: ${clientEmail}` : ''}
`;

  const mailtoUrl = `mailto:${STUDIO_INFO.email}?subject=${emailSubject}&body=${encodeURIComponent(emailBodyText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[230] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative z-[240] w-full max-w-[620px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white rounded-[32px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold">Start a Video Project</h3>
              <p className="text-[12px] text-[#86868b]">Fast estimate &amp; direct direct collaboration with Aditya Anil Khekade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-[13px]">
          {/* Project Type */}
          <div>
            <label className="block font-semibold mb-2 text-[#1d1d1f] dark:text-white">
              What kind of motion work do you need?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                '3D GeoLayers Map Animation',
                'High-Retention YouTube Longform Cut',
                'Viral Short-Form / Reel (9:16)',
                'Motion Graphics & Explainer'
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    projectType === type
                      ? 'border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3] font-semibold'
                      : 'border-black/10 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.04] text-[#86868b]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Length & Timeline in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-[#1d1d1f] dark:text-white">
                Expected Video Length
              </label>
              <select
                value={videoLength}
                onChange={(e) => setVideoLength(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              >
                <option value="Under 60 seconds (Short/Reel)">Under 60 seconds (Short/Reel)</option>
                <option value="1 - 3 Minutes (Segment/Map Flyover)">1 - 3 Minutes (Segment/Map)</option>
                <option value="5 - 10 Minutes (Standard Longform)">5 - 10 Minutes (Standard Longform)</option>
                <option value="10 - 20+ Minutes (Deep Dive Documentary)">10 - 20+ Minutes (Documentary)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1.5 text-[#1d1d1f] dark:text-white">
                Turnaround Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              >
                <option value="Rush / Urgent (24 - 48 Hours)">Rush / Urgent (24 - 48 Hours)</option>
                <option value="Standard (3 - 7 days)">Standard (3 - 7 days)</option>
                <option value="Monthly Retainer (Ongoing)">Monthly Retainer (Ongoing)</option>
                <option value="Flexible Timeline">Flexible Timeline</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-[#1d1d1f] dark:text-white">
                Your Name or Brand
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Marcus / Apex History"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-[#1d1d1f] dark:text-white">
                YouTube Channel / Website / Social
              </label>
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="youtube.com/@yourchannel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              />
            </div>
          </div>

          {/* Notes / Links */}
          <div>
            <label className="block font-semibold mb-1.5 text-[#1d1d1f] dark:text-white">
              Project Brief or Reference Links
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell me about the storyline, map locations, or link to a Google Doc / raw footage folder..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
          <button
            type="button"
            onClick={handleCopy}
            className="text-[12px] font-medium text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Inquiry" : "Copy Brief Text"}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-[13px] font-medium"
            >
              Cancel
            </button>
            <a
              href={mailtoUrl}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email Directly</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
