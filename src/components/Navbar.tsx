import React, { useState } from 'react';
import { Sun, Moon, Database, ExternalLink, Menu, X, Sparkles, Send } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';

interface NavbarProps {
  dark: boolean;
  toggleTheme: () => void;
  onOpenDriveSync: () => void;
  isDriveSynced: boolean;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dark,
  toggleTheme,
  onOpenDriveSync,
  isDriveSynced,
  onOpenInquiry
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] glass bg-white/80 dark:bg-[#161617]/85 border-b border-black/[.08] dark:border-white/[.08] transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto h-14 px-5 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm ring-1 ring-black/10 dark:ring-white/20 transition-transform group-hover:scale-105">
            <span className="bg-gradient-to-tr from-[#0071e3] to-cyan-400 text-transparent bg-clip-text">EE</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-none">
              Enough Editz
            </span>
            <span className="text-[10px] text-[#86868b] font-medium tracking-wide leading-tight mt-0.5">
              Motion Design Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-[13px] text-[#86868b] font-medium">
          <a href="#work" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Work
          </a>
          <a href="#pacing" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Retention Secret
          </a>
          <a href="#tools" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Tools
          </a>
          <a href="#workflow" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#about" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="link-ul hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Drive Sync Status Button */}
          <button
            onClick={onOpenDriveSync}
            title={isDriveSynced ? "Connected to Google Drive" : "Connect Google Drive Portfolio"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 border ${
              isDriveSynced
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-black/[0.03] dark:bg-white/[0.06] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white border-black/[0.08] dark:border-white/[0.1]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isDriveSynced ? "Drive Live" : "Drive Sync"}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isDriveSynced ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-[30px] w-[52px] items-center rounded-full p-[3px] transition-colors duration-300 bg-black/[.08] dark:bg-white/[.12] hover:opacity-90"
          >
            <span
              className={`h-[24px] w-[24px] rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${
                dark ? 'translate-x-[22px] bg-[#1d1d1f]' : 'translate-x-0'
              }`}
            >
              {dark ? (
                <Moon className="h-3.5 w-3.5 text-[#0071e3]" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              )}
            </span>
          </button>

          {/* CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] text-white text-[12px] font-medium px-3.5 py-1.5 hover:bg-[#0077ed] active:scale-[.97] transition-all shadow-sm"
          >
            <Send className="w-3 h-3" />
            <span>Book Edit</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass bg-white/95 dark:bg-[#161617]/95 border-b border-black/[.08] dark:border-white/[.08] px-6 py-5 flex flex-col gap-4 text-[15px] font-medium">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            Work Showcase
          </a>
          <a
            href="#pacing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            Retention & Pacing
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            Professional Tools
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            5-Step Workflow
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            About Aditya
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1d1d1f] dark:text-white hover:text-[#0071e3]"
          >
            Contact & Inquiry
          </a>
          <div className="pt-2 border-t border-black/10 dark:border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="flex-1 py-2.5 rounded-full bg-[#0071e3] text-white text-center text-sm font-semibold"
            >
              Start Project Inquiry
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDriveSync();
              }}
              className="px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              <Database className="w-4 h-4" /> Drive
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
