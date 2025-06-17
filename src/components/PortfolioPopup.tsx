
import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface PortfolioPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioPopup: React.FC<PortfolioPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-green-400 rounded-lg shadow-2xl w-full max-w-6xl h-[80vh] animate-scale-in">
        {/* Terminal-style header */}
        <div className="bg-gray-800 border-b border-green-400 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-green-400 font-mono">portfolio.showcase</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="text-green-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-gray-700"
              aria-label="Close portfolio"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-full">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-green-400 font-mono text-lg">$ portfolio --showcase</h2>
            <a
              href="https://airtable.com/appPj2wSAZlpvqiuZ/shr2EGmprMYUnISjx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors font-mono text-sm"
            >
              <ExternalLink size={16} />
              <span>Open in new tab</span>
            </a>
          </div>
          
          {/* Airtable embed */}
          <div className="border border-green-400/30 rounded bg-black h-[calc(100%-3rem)]">
            <iframe
              className="w-full h-full rounded"
              src="https://airtable.com/embed/appPj2wSAZlpvqiuZ/shr2EGmprMYUnISjx?viewControls=on"
              frameBorder="0"
              style={{ background: 'transparent' }}
              title="Alyssa Gable's Portfolio"
            />
          </div>
        </div>

        {/* Terminal-style footer */}
        <div className="border-t border-green-400/30 px-4 py-2 bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
            <span>Greatness loaded successfully</span>
            <span>Press ESC or click X to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
