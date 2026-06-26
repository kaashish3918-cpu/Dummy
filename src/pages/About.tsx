/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Eye } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div id="about-us-view" className="space-y-16 py-12 pb-24 animate-fade-in text-f4f4f4 bg-[#050505]">
      <SEO 
        title="About Our Scent Studio | Aromaxx Heritage" 
        description="The heritage, organic sourcing, and ethical distillation standards of Aromaxx Luxury Fragrance House in New Delhi and Paris." 
      />

      {/* Top Banner section with customized H1 */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">
          The Heritage of Aromaxx
        </span>
        <h1 className="font-serif-lux text-4xl sm:text-5xl font-light tracking-wide text-white">
          Where Memory Becomes Liquid Art
        </h1>
        <div className="h-[1px] w-28 bg-[#d4af37] mx-auto mt-2" />
      </section>

      {/* Origin details section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-video md:aspect-square bg-[#161616]">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
            alt="Aromaxx Heritage" 
            className="h-full w-full object-cover mix-blend-luminosity hover:mix-blend-normal transition duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
              The Origin Creed
            </span>
            <h2 className="font-serif-lux text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Our Olfactory Journey
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Aromaxx was born from a passion for luxury perfumery and emotional storytelling through scent. We believe fragrance is more than a product—it is identity, memory, and emotion bottled into perfection.
          </p>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            By sourcing raw botanical oils from standard global territories—Amalfi lemons, handcheck Bulgarian rose, Kashmiri saffron, and Cambodian resinous agarwood—we blend classic Indian rich attar concepts with rigorous Parisian molecular balancing standards to formulate unforgettable sensory experiences.
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#161616] text-[#d4af37] flex items-center justify-center font-serif font-bold">
              A
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Laureen Sterling</p>
              <p className="text-[10px] text-white/40">Founder & Head Nose, Aromaxx</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision statement pairs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 space-y-4 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
            <Compass className="h-5 w-5" />
          </div>
          <h3 className="font-serif-lux text-xl font-medium text-white">
            Our Mission
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            To craft premium, long-lasting perfumes that empower individuality, trigger cherished nostalgic memories, and radiate elegance using sustainable, ethical, and biologically safe materials.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 space-y-4 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
            <Eye className="h-5 w-5" />
          </div>
          <h3 className="font-serif-lux text-xl font-medium text-white">
            Our Vision
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            To become a globally recognized luxury fragrance house known for master-level innovation, absolute purity, and deep, storytelling emotional connection with individual collectors.
          </p>
        </div>
      </section>

      {/* Elite core values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">
            How We Operate
          </span>
          <h2 className="font-serif-lux text-2xl sm:text-3xl font-medium text-white">
            The Aromaxx Values
          </h2>
          <div className="h-[1px] w-20 bg-[#d4af37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5 space-y-3">
            <span className="text-xs font-bold text-[#d4af37] font-serif-lux block">01 / INTEGRITY</span>
            <h3 className="font-serif-lux text-base font-semibold text-white">Quality over quantity</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We distill in small handcheck collections. Every vat is checked under laser mass spectrometry to secure perfect molecular dispersion.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5 space-y-3">
            <span className="text-xs font-bold text-[#d4af37] font-serif-lux block">02 / HERITAGE</span>
            <h3 className="font-serif-lux text-base font-semibold text-white">Ethical sourcing</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Our farmers in Delhi, Italy, and Bulgaria receive micro-investment dividends, supporting botanical land conservation.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5 space-y-3">
            <span className="text-xs font-bold text-[#d4af37] font-serif-lux block">03 / STORYTELLING</span>
            <h3 className="font-serif-lux text-base font-semibold text-white">Artistic expression</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Perfume is high art. Our formulations are composed like music—establishing tempo, tension, release, and heavy resonant base echoes.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5 space-y-3">
            <span className="text-xs font-bold text-[#d4af37] font-serif-lux block">04 / CUSTOMER</span>
            <h3 className="font-serif-lux text-base font-semibold text-white">Customer individuality</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We cherish bespoke identities. Through personalized engravings and intelligent ai calibrations, we honor your individual trace.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
