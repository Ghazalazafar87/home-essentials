import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';
import { WHATSAPP_INT_NUMBER } from '../data/products';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Delivery & Shipping',
    question: 'How long does delivery take across Pakistan?',
    answer:
      'We dispatch all in-stock orders within 24 hours from our Lahore studio. Deliveries to Lahore, Islamabad, Rawalpindi, and Karachi typically arrive in 2 to 3 business days. Deliveries to other cities across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and Azad Kashmir arrive within 3 to 5 business days via TCS, Trax, and Leopards Couriers.',
  },
  {
    category: 'Delivery & Shipping',
    question: 'What are the delivery charges?',
    answer:
      'We provide FREE delivery on all orders over Rs. 4,999. For orders below this amount, a flat delivery fee of Rs. 250 is applied nationwide, which includes multi-layered fragile safety packaging and full transit insurance.',
  },
  {
    category: 'Payment Methods',
    question: 'Is Cash on Delivery (COD) available in my city?',
    answer:
      'Yes! Cash on Delivery is available in over 150+ cities across Pakistan. You only pay the courier rider upon physical receipt of your parcel.',
  },
  {
    category: 'Payment Methods',
    question: 'What other payment methods do you accept?',
    answer:
      'In addition to Cash on Delivery, we support direct instant Bank Transfers via Raast ID or Meezan Bank account, as well as JazzCash and EasyPaisa mobile wallets. Account coordinates are provided upon checkout or via WhatsApp.',
  },
  {
    category: 'Packaging & Fragile Items',
    question: 'How do you ensure ceramics, lamps, and mirrors don’t break during courier transit?',
    answer:
      'We employ specialized shockproof packaging consisting of thick high-density bubble cushioning, customized foam brackets, and heavy 5-ply corrugated cardboard boxes labeled with prominent fragile handling indicators. Our damage rate is less than 0.2%.',
  },
  {
    category: 'Returns & Damages',
    question: 'What happens if an item arrives damaged or defective?',
    answer:
      'We stand behind our craftsmanship 100%. If an item arrives broken or flawed, please take a quick photo or unboxing video and send it to our WhatsApp concierge at 03126687237 within 7 days of delivery. We will immediately dispatch a complimentary replacement or process a full refund.',
  },
  {
    category: 'Ordering & Customization',
    question: 'Can I place an order directly on WhatsApp?',
    answer:
      'Absolutely! Many of our customers prefer WhatsApp. Simply click the "Order on WhatsApp" button on any product page, in your shopping bag, or on checkout. A pre-filled message with your selected items, prices, and address will be created automatically for our team at 03126687237.',
  },
  {
    category: 'Ordering & Customization',
    question: 'Do you offer custom sizing or bulk corporate/wedding gifting?',
    answer:
      'Yes, we frequently craft custom arch mirror dimensions, bespoke pleated lamp shades, and custom Ramadan/Eid gift hampers for corporate clients and wedding festivities. Contact our studio directly via WhatsApp for a tailored quote.',
  },
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Delivery & Shipping', 'Payment Methods', 'Packaging & Fragile Items', 'Returns & Damages', 'Ordering & Customization'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      !search.trim() ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold">
          Help & Support
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto">
          Everything you need to know about deliveries across Pakistan, fragile packing, Cash on Delivery, and returns.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              placeholder="Search delivery, COD, returns, fragility..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#EAE2D8] pl-10 pr-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#A35836]"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border ${
              activeCategory === cat
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#292524] border-[#EAE2D8] hover:border-[#887B6D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-[#EAE2D8] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-base font-semibold text-[#1C1917] hover:text-[#A35836] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#78716C] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#44403C] leading-relaxed border-t border-[#F4EFEB]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom WhatsApp Contact Card */}
      <div className="bg-[#FAF8F5] border border-[#EAE2D8] p-6 text-center space-y-3">
        <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
          Still have questions?
        </h3>
        <p className="text-xs text-[#78716C] max-w-sm mx-auto">
          Our team is available 6 days a week on WhatsApp to assist with order tracking, custom dimensions, or styling advice.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20have%20a%20question.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat on WhatsApp (0312-6687237)</span>
        </a>
      </div>
    </div>
  );
};
