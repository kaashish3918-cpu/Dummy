/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Sparkles, Award, Compass, ShieldCheck, Users, Heart, ChevronRight } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import SEO from '../components/SEO';

interface HomeProps {
  onOpenScentFinder: () => void;
  onViewProduct: (prod: Product) => void;
}

export default function Home({ onOpenScentFinder, onViewProduct }: HomeProps) {
  const navigate = useNavigate();

  return (
    <div id="home-view" className="space-y-16 pb-20 animate-fade-in text-f4f4f4 bg-[#050505]">
      <SEO 
        title="Aromaxx | Discover Your Signature Scent - Luxury Perfumery" 
        description="Discover high-end luxurious organic, oriental, floral, woody, and aquatic perfumes designed strictly for long-lasting sillage, custom engraving, and personal identity with Aromaxx." 
      />

      {/* Hero Header Area */}
      <section id="hero-section" className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-[#0d0d0d] px-4 sm:px-6">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-luminosity" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1600')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-transparent" />
        
        <div className="relative max-w-4xl text-center space-y-6 sm:space-y-8 px-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.45em] text-[#d4af37] block animate-pulse">
            Now Unveiled: Aromaxx Olfactory House
          </span>
          <h1 className="font-serif-lux text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-white leading-tight">
            Discover Your <span className="italic text-[#d4af37] font-normal">Signature Scent</span> with Aromaxx
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/70 font-light tracking-wide leading-relaxed">
            Luxury perfumes crafted to define your personality, encapsulate memory, and leave a lasting impression that speaks before you do.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <button
              id="hero-shop-now-btn"
              onClick={() => {
                navigate('/products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-full bg-[#d4af37] px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-black border border-[#d4af37] shadow-xl hover:bg-[#fce484] hover:scale-[1.02] cursor-pointer transition-all duration-300"
            >
              Shop Boutique
            </button>
            <button
              id="hero-explore-collection-btn"
              onClick={() => {
                const el = document.getElementById('featured-best-sellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 backdrop-blur-xs px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-white hover:bg-white/10 hover:border-[#d4af37] transition duration-300 cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* Interactive signature curation panel teaser */}
      <section id="home-scent-teaser" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4af37]/12 px-3 py-1 text-xs font-semibold text-[#fce484]">
              <Sparkles className="h-3.5 w-3.5" />
              Bespoke AI Curation Portal
            </div>
            <h3 className="font-serif-lux text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Looking for a precise formulation match?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Initiate our interactive Signature Scent AI Questionnaire. Our virtual master perfumer matches your sillage preference, mood chemistry, and mental sanctuary directly with our signature oils.
            </p>
          </div>
          <button
            id="teaser-find-signature-btn"
            onClick={onOpenScentFinder}
            className="rounded-full bg-[#d4af37] px-8 py-4 text-xs font-bold tracking-widest uppercase text-black hover:bg-[#fce484] hover:-translate-y-0.5 transition-all duration-300 shrink-0 cursor-pointer shadow-lg"
          >
            Unveil Scent Matcher AI
          </button>
        </div>
      </section>

      {/* Featured Perfumes best sellers */}
      <section id="featured-best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37] block">
            Curated Favorites
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl font-normal tracking-wide text-white">
            The Best Sellers Collection
          </h2>
          <div className="h-[1px] w-24 bg-[#d4af37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((prod) => (
            <div 
              key={prod.id}
              id={`featured-card-${prod.id}`}
              onClick={() => onViewProduct(prod)}
              className="group rounded-2xl border border-white/5 bg-[#0d0d0d] p-4 cursor-pointer shadow-xs hover:border-[#d4af37]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-[#161616]">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.name} 
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 rounded-sm bg-[#d4af37] text-[9px] font-bold uppercase tracking-widest text-black px-2 py-0.5 shadow-sm">
                  Best Seller
                </span>
              </div>

              <div className="mt-4 flex-1 space-y-1 text-left">
                <div className="flex items-center justify-between text-xs text-white/40 font-light">
                  <span>{prod.type}</span>
                  <span className="flex items-center gap-0.5 text-[#d4af37] font-medium">
                    <Star className="h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]" />
                    {prod.rating}
                  </span>
                </div>
                <h3 className="font-serif-lux text-base font-semibold text-white group-hover:text-[#d4af37] transition">
                  {prod.name}
                </h3>
                <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm font-bold text-white">
                  ${prod.price} <span className="text-[10px] text-white/40 font-normal">/ 100ml</span>
                </span>
                <span className="text-xs font-semibold text-[#d4af37] group-hover:text-[#fce484] flex items-center gap-1">
                  View Ritual
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand values / reasons section */}
      <section id="brand-promise" className="border-y border-white/10 bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37] block">
              Why Choose Aromaxx
            </span>
            <h2 className="font-serif-lux text-2xl sm:text-3xl font-normal tracking-wide text-white">
              Our Olfactory Promise & Ethics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3 p-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161616] text-[#d4af37] border border-white/10">
                <Award className="h-6 w-6 stroke-1.25" />
              </div>
              <h3 className="font-serif-lux text-sm font-semibold tracking-wide uppercase text-white">
                Premium Oils
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Using pure absolute oils distilled meticulously from natural Bulgarian rose, authentic Cambodian agarwood, and Italian citrus crops.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161616] text-[#d4af37] border border-white/10">
                <Compass className="h-6 w-6 stroke-1.25" />
              </div>
              <h3 className="font-serif-lux text-sm font-semibold tracking-wide uppercase text-white">
                Long-lasting Scent
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Designed with heavier molecules that bind seamlessly to skin, releasing premium, structured micro-scents safely for 8 to 12 hours.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161616] text-[#d4af37] border border-white/10">
                <ShieldCheck className="h-6 w-6 stroke-1.25" />
              </div>
              <h3 className="font-serif-lux text-sm font-semibold tracking-wide uppercase text-white">
                Cruelty-Free & Safe
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Ethical formulation philosophy ensures zero animal testing. Certified 100% skin-safe, alcohol-gentle, and hypoallergenic.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#161616] text-[#d4af37] border border-white/10">
                <Users className="h-6 w-6 stroke-1.25" />
              </div>
              <h3 className="font-serif-lux text-sm font-semibold tracking-wide uppercase text-white">
                Global luxury perfumery
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Inspired by ancient Indian attar heritages combined with elite Parisian molecular engineering. Art and memory bottled together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section id="short-about-preview" className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
          <Heart className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
        </div>
        <h2 className="font-serif-lux text-3xl sm:text-4xl italic text-white font-normal leading-relaxed">
          “Aromaxx blends art and fragrance to create unforgettable scents that speak before you do.”
        </h2>
        <div className="space-y-4">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Heritage Craftsmanship Since 2012
          </p>
          <button
            id="about-redirect-btn"
            onClick={() => {
              navigate('/about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#fce484] transition cursor-pointer"
          >
            Unveil Our Heritage Story
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </section>
    </div>
  );
}
