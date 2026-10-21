import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { WHATSAPP_INT_NUMBER } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'Assalam-o-Alaikum, I need help placing an order.',
    'Is Cash on Delivery available in my city?',
    'Can I get custom dimensions for the brass mirror?',
    'What is the delivery timeline for Lahore / Karachi?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || customMsg || 'Assalam-o-Alaikum Dastoor Home!';
    const url = `https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Quick Help Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-[#EAE2D8] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Card Header */}
          <div className="bg-[#1C1917] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Dastoor WhatsApp Support</h4>
                <div className="text-[11px] text-[#D8CCC0] flex items-center gap-1">
                  <span>0312-6687237</span>
                  <span>·</span>
                  <span className="text-emerald-400">Available Daily</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="bg-white p-3 border border-[#EAE2D8] text-xs text-[#292524] rounded-sm">
              <p className="font-medium text-[#1C1917] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C47D4C]" />
                Pakistani Home Décor Concierge
              </p>
              <p className="text-[#887B6D] text-[11px] leading-relaxed">
                Connect directly with our workshop team in Lahore for live photos, order tracking, and custom recommendations.
              </p>
            </div>

            {/* Quick action chips */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#887B6D] font-semibold mb-1.5">
                Quick Inquiries:
              </div>
              <div className="space-y-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left text-xs bg-white hover:bg-[#F4EFEB] border border-[#EAE2D8] px-3 py-1.5 transition-colors text-[#292524] truncate block"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Custom input */}
            <div className="pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-1.5"
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="flex-1 bg-white border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
