/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Star, ShoppingBag } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import SEO from '../components/SEO';

interface ProductsProps {
  preferredType: string;
  setPreferredType: (type: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function Products({
  preferredType,
  setPreferredType,
  onAddToCart,
  onViewProduct
}: ProductsProps) {
  const navigate = useNavigate();

  const categories = ['All', 'Floral', 'Woody Oriental', 'Citrus Fresh', 'Oriental', 'Aquatic'];
  const filteredProducts = products.filter(p => !preferredType || p.type === preferredType);

  return (
    <div id="products-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-10 animate-fade-in text-f4f4f4 bg-[#050505] text-left">
      <SEO 
        title="Luxury Formulations | Aromaxx Products" 
        description="Browse the exclusive collection of hand-crafted Extraits and Eau de Parfums with our bespoke laser-engraving option." 
      />

      {/* Page header and unique H1 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Aromaxx Products
        </span>
        <h1 className="font-serif-lux text-3xl sm:text-5xl font-light text-white">
          The Signature Formulations
        </h1>
        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
          Immerse yourself of long-lasting, hand-filtered Extraits and Eau de Parfums designed strictly for character, depth, and projection.
        </p>
      </div>

      {/* Categories / Filter Options */}
      <div id="advanced-filters" className="rounded-2xl border border-white/5 bg-[#0d0d0d] p-4.5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setPreferredType(cat === 'All' ? '' : cat);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                (cat === 'All' && preferredType === '') || preferredType === cat
                  ? 'bg-[#d4af37] text-[#050505] shadow-md font-bold'
                  : 'bg-[#111111] text-white/70 border border-white/10 hover:bg-[#1c1c1c] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-white/40 font-medium shrink-0">
          Showing {filteredProducts.length} bespoke recipes
        </div>
      </div>

      {/* Products catalog grid */}
      <div id="products-catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            id={`product-card-${prod.id}`}
            className="group flex flex-col justify-between bg-[#0d0d0d] rounded-2xl border border-white/5 p-5 hover:border-[#d4af37]/40 hover:shadow-lg transition-all duration-300"
          >
            {/* Image section with relative view tag */}
            <div 
              onClick={() => onViewProduct(prod)}
              className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#161616] border border-white/10 cursor-pointer"
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="rounded-full bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                  <Eye className="h-3.5 w-3.5 text-[#d4af37]" />
                  View Scent Ritual
                </span>
              </div>
            </div>

            {/* Product labels and attributes */}
            <div className="mt-5 space-y-2 flex-1">
              <div className="flex justify-between items-center text-xs">
                <span className="rounded-full bg-[#161616] border border-white/10 text-[#fce484] px-3 py-0.5 font-semibold text-[10px] uppercase tracking-wider">
                  {prod.type}
                </span>
                <div className="flex items-center gap-0.5 text-[#d4af37] font-bold">
                  <Star className="h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]" />
                  {prod.rating}
                </div>
              </div>

              <h3 
                onClick={() => onViewProduct(prod)}
                className="font-serif-lux text-lg font-bold text-white group-hover:text-[#d4af37] transition cursor-pointer"
              >
                {prod.name}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                {prod.description}
              </p>

              {/* Distillation Ingredients Tag badging */}
              <div className="flex flex-wrap gap-1 pt-1">
                {prod.notes.map((n) => (
                  <span key={n} className="text-[9px] font-medium bg-[#111111] border border-white/5 text-white/50 rounded px-1.5 py-0.5">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Shopping action row */}
            <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-white/40 tracking-wider">Volume size: 100ml</span>
                <span className="text-lg font-bold text-white">${prod.price}</span>
              </div>

              <button
                id={`product-card-add-btn-${prod.id}`}
                onClick={() => onAddToCart(prod, '100ml')}
                className="rounded-full bg-[#d4af37] hover:bg-[#fce484] transition-all duration-300 text-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
