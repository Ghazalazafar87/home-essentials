import React from 'react';
import { useShop } from '../context/ShopContext';
import { Award, Heart, ShieldCheck, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { WHATSAPP_INT_NUMBER } from '../data/products';

import heroImg from '../assets/images/hero_dastoor_living_room_1792587450721.jpg';
import vasesImg from '../assets/images/category_vases_ceramics_1792587451999.jpg';
import lampImg from '../assets/images/category_brass_lighting_1792587451889.jpg';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  const artisanClusters = [
    {
      region: 'Multan, South Punjab',
      craft: 'Red Clay Pottery & Stoneware Glazing',
      description:
        'Centuries of kiln tradition shaping earthy tactile terracotta urns, hand-thrown planter vessels, and decorative statement urns.',
    },
    {
      region: 'Chiniot, Punjab',
      craft: 'Rosewood (Sheesham) Woodcraft & Inlay',
      description:
        'Seasoned indigenous Dalbergia sissoo wood meticulously shaped into heirloom charcuterie boards, tray handles, and accent tables.',
    },
    {
      region: 'Gujranwala & Lahore',
      craft: 'Sand-Casting & Antique Brushed Brass',
      description:
        'Heavyweight metal casting providing substantial, tarnish-resistant brushed brass table lamps, candle stands, and mirror frames.',
    },
    {
      region: 'Sindh & South Punjab',
      craft: 'Hand Block-Printing & Moonj Weaving',
      description:
        'Carved teakwood blocks stamping natural vegetable pigments onto raw desi silk, alongside indigenous river reed basketry.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Brand Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold">
          Our Heritage & Ethos
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1C1917] leading-tight text-balance">
          Rooted in Pakistani Craft. Designed for Contemporary Living.
        </h1>
        <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed max-w-2xl mx-auto">
          Dastoor Home Essentials was founded to celebrate Pakistan's unmatched artisan heritage. We bridge timeless indigenous craft techniques with the minimalist, warm aesthetics of modern interiors.
        </p>
      </div>

      {/* Big Lifestyle Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] w-full overflow-hidden border border-[#EAE2D8] shadow-sm">
          <img
            src={heroImg}
            alt="Dastoor Home Workshop & Living Space"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold">
              The Philosophy
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Every object in your home should hold a story.
            </h2>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              In an era dominated by synthetic mass production, we believe true luxury lies in the slight imperfections of hand-thrown Multani clay, the weighty warmth of solid brushed brass, and the textured slub of indigenous handloom fabrics.
            </p>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              We work directly with artisan families and craft cooperatives across Pakistan, ensuring respectful wages, dignified working conditions, and the preservation of age-old artisanal techniques passed down through generations.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigateTo({ type: 'shop' })}
                className="px-6 py-3 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Browse Our Pieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20would%20like%20to%20learn%20more%20about%20your%20custom%20artisan%20pieces.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-[#EAE2D8] hover:border-[#887B6D] text-xs font-semibold text-[#1C1917] flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Custom Inquiries</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#F4EFEB] overflow-hidden border border-[#EAE2D8]">
              <img
                src={vasesImg}
                alt="Multan pottery"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] bg-[#F4EFEB] overflow-hidden border border-[#EAE2D8] mt-8">
              <img
                src={lampImg}
                alt="Brass lamp workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Artisan Map & Clusters */}
      <div className="bg-[#F4EFEB] py-16 border-y border-[#EAE2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
              Geographic Heritage
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Artisan Hubs of Pakistan
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1.5">
              Honoring centuries-old regional mastery from the Indus basin to the Potohar plateau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisanClusters.map((cluster, i) => (
              <div key={i} className="bg-white p-6 border border-[#EAE2D8]">
                <div className="text-xs font-mono font-bold text-[#A35836] mb-1">
                  0{i + 1}.
                </div>
                <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                  {cluster.region}
                </h3>
                <div className="text-xs font-medium text-[#292524] mt-1 text-[#A35836]">
                  {cluster.craft}
                </div>
                <p className="text-xs text-[#78716C] mt-2.5 leading-relaxed">
                  {cluster.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Location */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
          Visit Our Design Studio in Lahore
        </h3>
        <p className="text-xs text-[#78716C] leading-relaxed max-w-lg mx-auto">
          Our studio and viewing gallery is located off MM Alam Road in Gulberg III, Lahore. Consultations for bespoke architectural lighting and interior styling are available by appointment.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo({ type: 'contact' })}
            className="text-xs font-semibold text-[#1C1917] hover:text-[#A35836] underline decoration-[#D8CCC0]"
          >
            Showroom Hours & Directions →
          </button>
        </div>
      </div>
    </div>
  );
};
