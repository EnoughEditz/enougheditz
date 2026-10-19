import React, { useState } from 'react';
import { X, Database, Check, Copy, RefreshCw, AlertCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { APPS_SCRIPT_TEMPLATE } from '../data/portfolioData';

interface DriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSaveUrl: (url: string) => Promise<boolean>;
  onResetDefault: () => void;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  errorMessage?: string;
}

export const DriveSyncModal: React.FC<DriveSyncModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  onSaveUrl,
  onResetDefault,
  syncStatus,
  errorMessage
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'script'>('settings');
  const [testing, setTesting] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSaveAndTest = async () => {
    setTesting(true);
    await onSaveUrl(urlInput.trim());
    setTesting(false);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative z-[230] w-full max-w-[640px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white rounded-[32px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold leading-snug">Google Drive Sync Center</h3>
              <p className="text-[12px] text-[#86868b]">Sync your portfolio videos directly from your Google Drive folder</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-6 pt-3 gap-2 border-b border-black/[0.05] dark:border-white/[0.05] text-[13px] font-semibold">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#0071e3] text-[#0071e3]'
                : 'border-transparent text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            Connection Setup
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'border-[#0071e3] text-[#0071e3]'
                : 'border-transparent text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
            }`}
          >
            <span>Google Apps Script Code</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Ready</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'settings' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2">
                  Google Apps Script Web App URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-mono text-[#1d1d1f] dark:text-white placeholder:text-[#86868b]"
                  />
                </div>
                <p className="text-[12px] text-[#86868b] mt-1.5">
                  Paste the deployment URL of your Apps Script. Leave blank to use the high-quality built-in showreel items.
                </p>
              </div>

              {/* Status Banner */}
              {syncStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-start gap-3 text-[13px]">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
                  <div>
                    <p className="font-semibold">Successfully connected to Google Drive!</p>
                    <p className="text-[12px] opacity-80 mt-0.5">Your video folders and files are actively synced into the portfolio.</p>
                  </div>
                </div>
              )}

              {syncStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 flex items-start gap-3 text-[13px]">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <p className="font-semibold">Failed to fetch from Apps Script</p>
                    <p className="text-[12px] opacity-80 mt-0.5">
                      {errorMessage || "Make sure the Apps Script deployment access is set to 'Anyone', and CORS is enabled."}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick 3-Step Guide */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <h4 className="text-[13px] font-bold flex items-center gap-1.5 text-[#1d1d1f] dark:text-white">
                  <HelpCircle className="w-4 h-4 text-[#0071e3]" /> How to deploy in 2 minutes:
                </h4>
                <ol className="text-[12px] text-[#86868b] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Go to <strong>script.google.com</strong> and create a new project.</li>
                  <li>Copy our prepared script from the tab above and insert your Drive folder ID.</li>
                  <li>Click <strong>Deploy &gt; New deployment &gt; Web app</strong>. Set <em>Who has access</em> to <strong>Anyone</strong>.</li>
                  <li>Copy the provided web app URL and paste it here!</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">
                  Google Apps Script Template
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3] text-white text-[12px] font-medium hover:bg-[#0077ed] transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied to Clipboard!" : "Copy Full Script"}</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black p-4 text-[12px] font-mono text-emerald-400 max-h-[300px] overflow-y-auto border border-white/10">
                <pre>{APPS_SCRIPT_TEMPLATE}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
          <button
            onClick={() => {
              setUrlInput('');
              onResetDefault();
            }}
            className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white font-medium"
          >
            Reset to Built-in Showcase
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/5"
            >
              Close
            </button>
            <button
              onClick={handleSaveAndTest}
              disabled={testing}
              className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-medium flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save &amp; Sync</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
