import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WHATSAPP_INT_NUMBER } from '../data/products';
import { MessageSquare, Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    inquiryType: 'Order Status & Tracking',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      addToast('Missing Details', 'Please fill in your name, phone number, and message.', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Message Sent', 'Thank you! Our concierge team will reply via WhatsApp/call shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold">
          Customer Concierge
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
          We're Here to Help Your Home Bloom
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
          Questions about dimensions, courier tracking across Pakistan, or bespoke brass finishes? Get in touch with our Lahore studio team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Locations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Action Card */}
          <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 p-6 rounded-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1917]">Direct WhatsApp Concierge</h3>
                <div className="text-xs text-[#2E7D32] font-semibold">0312-6687237 (Active Daily)</div>
              </div>
            </div>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Fastest response for urgent order updates, live video inspections of pieces, or custom sizing requests.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Chat on WhatsApp Now</span>
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-white border border-[#EAE2D8] p-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1C1917] pb-2 border-b border-[#EAE2D8]">
              Studio Information
            </h3>

            <div className="space-y-3 text-xs text-[#44403C]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#A35836] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1C1917]">Phone Support</div>
                  <div>0312-6687237 / +92 312 6687237</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A35836] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1C1917]">Email Inquiries</div>
                  <div>orders@dastoorhome.pk / support@dastoorhome.pk</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A35836] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1C1917]">Customer Care Hours</div>
                  <div>Monday – Saturday: 10:00 AM – 9:00 PM PKT</div>
                  <div className="text-[11px] text-[#78716C]">Sunday: WhatsApp Inquiries Only</div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white border border-[#EAE2D8] p-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1C1917] pb-2 border-b border-[#EAE2D8]">
              Showroom Galleries
            </h3>

            <div className="space-y-3 text-xs text-[#44403C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C47D4C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1C1917]">Lahore Flagship Studio</div>
                  <div>Plot 42-B, Block T, Off MM Alam Road, Gulberg III, Lahore, Pakistan</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C47D4C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1C1917]">Karachi Experience Center</div>
                  <div>Lane 6, Bukhari Commercial Area, DHA Phase 6, Karachi, Pakistan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#EAE2D8] p-6 sm:p-8 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-emerald-900">Message Received!</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out to Dastoor Home. Our representative will contact you at <strong>{formData.phone}</strong> or by email within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fatima Ali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">
                      Mobile / WhatsApp Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="03121234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">
                      Subject / Topic
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                    >
                      <option value="Order Status & Tracking">Order Status & Tracking</option>
                      <option value="Product Details & Dimensions">Product Details & Dimensions</option>
                      <option value="Custom Dimensions / Finishes">Custom Dimensions / Finishes</option>
                      <option value="Wholesale & Corporate Gifting">Wholesale & Corporate Gifting</option>
                      <option value="Interior Designer Collaboration">Interior Designer Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292524] mb-1">
                    Your Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
