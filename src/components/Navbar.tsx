/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, HelpCircle, FileText, Compass, Sparkles, PhoneCall } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenScentFinder: () => void;
}

export default function Navbar({
  cart,
  setIsCartOpen,
  onOpenScentFinder
}: NavbarProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass, path: '/' },
    { id: 'about', label: 'About Us', icon: FileText, path: '/about' },
    { id: 'products', label: 'Products', icon: ShoppingBag, path: '/products' },
    { id: 'blog', label: 'Blog', icon: Sparkles, path: '/blog' },
    { id: 'contact', label: 'Contact Details', icon: PhoneCall, path: '/contact' },
  ];

  // Helper to check if a route is currently active
  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-45 w-full border-b border-gold-200/40 bg-luxury-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Brand Title */}
        <div 
          id="brand-logo" 
          onClick={() => handleNavClick('/')} 
          className="group flex cursor-pointer flex-col items-center justify-center animate-fade-in"
        >
          <span className="font-serif-lux text-3xl tracking-[0.25em] font-medium transition-all group-hover:text-gold-600 sm:text-4xl text-luxury-black">
            AROMAXX
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold-600/90 font-medium">
            Luxury Fragrances
          </span>
        </div>

        {/* Navigation Items */}
        <nav id="secondary-navigation" className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = isLinkActive(link.path);
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleNavClick(link.path)}
                className={`relative flex items-center gap-1.5 py-2 text-sm tracking-widest uppercase transition-all duration-300 font-medium cursor-pointer ${
                  isActive 
                    ? 'text-gold-700 font-semibold' 
                    : 'text-luxury-black/75 hover:text-gold-600'
                }`}
              >
                <IconComponent className="h-3.5 w-3.5" />
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gold-400 animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Buttons: Scent Finder Assistant & Cart */}
        <div id="nav-actions-container" className="flex items-center space-x-3 sm:space-x-4">
          
          {/* AI Advisor Button */}
          <button
            id="ai-advisor-trigger-btn"
            onClick={onOpenScentFinder}
            className="group flex items-center gap-2 rounded-full border border-gold-300 bg-linear-to-r from-gold-50 to-gold-100 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold tracking-wider uppercase text-gold-800 shadow-xs hover:border-gold-500 hover:bg-gold-200/30 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Signature Scent AI</span>
            <span className="sm:hidden">Scent AI</span>
          </button>

          {/* Cart Button */}
          <button
            id="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-200 hover:border-gold-500 hover:bg-gold-50 transition-all text-luxury-black cursor-pointer group"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform text-luxury-black" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-[10px] font-bold text-white shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Rail */}
      <div id="mobile-nav-rail" className="flex lg:hidden justify-around border-t border-gold-200/20 py-2.5 bg-luxury-cream">
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = isLinkActive(link.path);
          return (
            <button
              key={link.id}
              id={`mobile-nav-${link.id}`}
              onClick={() => handleNavClick(link.path)}
              className={`flex flex-col items-center space-y-1 text-[9px] tracking-wider uppercase transition-colors px-2 py-1 rounded-md cursor-pointer ${
                isActive ? 'text-gold-700 font-bold bg-gold-50' : 'text-luxury-black/60 hover:text-gold-600'
              }`}
            >
              <IconComponent className="h-4.5 w-4.5" />
              <span>{link.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
