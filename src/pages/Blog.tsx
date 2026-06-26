/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogArticles } from '../data';
import { BlogArticle } from '../types';
import SEO from '../components/SEO';

interface BlogProps {
  onViewArticle: (article: BlogArticle) => void;
}

export default function Blog({ onViewArticle }: BlogProps) {
  return (
    <div id="blog-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-12 animate-fade-in text-f4f4f4 bg-[#050505] text-left">
      <SEO 
        title="Scent Journal & Science of Sillage | Aromaxx Blog" 
        description="Explore expert journal entries on botanical distillation, longevity science, and historical layering rituals by our master perfumers." 
      />

      {/* Header and customized unique H1 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Aromaxx Scent Blog & Science
        </span>
        <h1 className="font-serif-lux text-3xl sm:text-5xl font-light text-white">
          Articles on Olfactory Art
        </h1>
        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
          Diving deep into scent Families, perfume chemistry dynamics, historical layering rituals, and memory mapping.
        </p>
      </div>

      {/* Articles cards listings */}
      <div id="articles-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogArticles.map((article) => (
          <article
            key={article.id}
            id={`article-card-${article.id}`}
            onClick={() => onViewArticle(article)}
            className="group bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden cursor-pointer shadow-xs hover:border-[#d4af37]/40 hover:shadow-md transition duration-300 flex flex-col justify-between h-full text-left"
          >
            <div className="space-y-4">
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#161616] border-b border-white/10">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#050505]/95 text-white font-semibold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md border border-white/10">
                  {article.category}
                </span>
              </div>

              {/* Text excerpt */}
              <div className="px-5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-semibold">
                  <Calendar className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.minRead} Min read</span>
                </div>

                <h3 className="font-serif-lux text-base sm:text-lg font-bold text-white group-hover:text-[#d4af37] transition leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed line-clamp-3 font-light">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-white/5 mt-3">
              <span className="text-xs font-bold text-[#d4af37] group-hover:text-[#fce484] flex items-center gap-1 transition-colors">
                Read full chapter
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
