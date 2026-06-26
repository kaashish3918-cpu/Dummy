/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Check, X } from 'lucide-react';

import Navbar from './components/Navbar';
import ScentFinder from './components/ScentFinder';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import { products } from './data';
import { Product, CartItem, Order, ContactMessage, BlogArticle } from './types';

export default function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState<boolean>(false);
  const [preferredType, setPreferredType] = useState<string>('');
  
  // Modals for deep viewing
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Modal Volume Selector Details
  const [modalVolume, setModalVolume] = useState<string>('100ml');
  const [modalEngraving, setModalEngraving] = useState<string>('');

  // Persisted Orders / Contact Message states
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('aromaxx_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedOrders = localStorage.getItem('aromaxx_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedMessages = localStorage.getItem('aromaxx_messages');
      if (storedMessages) setContactMessages(JSON.parse(storedMessages));
    } catch (e) {
      console.error('Error loading localStorage state', e);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('aromaxx_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product, size: string, engraving?: string) => {
    const itemId = `${product.id}-${size}-${engraving || ''}`;
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            quantity: 1,
            selectedVolume: size,
            personalizedEngraving: engraving ? engraving.trim() : undefined,
          }
        ];
      }
    });
    // Visual alert feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => 
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prevOrders) => {
      const updated = [newOrder, ...prevOrders];
      localStorage.setItem('aromaxx_orders', JSON.stringify(updated));
      return updated;
    });
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.email || !contactForm.message) return;

    const newMessage: ContactMessage = {
      fullName: contactForm.fullName,
      email: contactForm.email,
      subject: contactForm.subject || 'General Inquiry',
      message: contactForm.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setContactMessages((prev) => {
      const updated = [newMessage, ...prev];
      localStorage.setItem('aromaxx_messages', JSON.stringify(updated));
      return updated;
    });

    setContactSuccess(true);
    setContactForm({ fullName: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleModalAddAndClose = () => {
    if (selectedProduct) {
      handleAddToCart(selectedProduct, modalVolume, modalEngraving);
      setSelectedProduct(null);
      setModalEngraving('');
    }
  };

  const toggleProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
    setModalVolume('100ml');
    setModalEngraving('');
  };

  // Helper static mock reviews per perfume
  const getProductReviews = (prodId: string) => {
    const defaultReviews = [
      { author: 'Vikram Seth', rating: 5, date: 'May 20, 2026', comment: 'Undeniably luxury. The notes are beautifully structured; they settle uniquely on dry skin and radiate warmth for hours.' },
      { author: 'Camille L.', rating: 4, date: 'April 02, 2026', comment: 'Magnificent projection. I received three compliments yesterday at my exhibition. Aromaxx has crafted a masterwork.' }
    ];

    const specificReviews: Record<string, typeof defaultReviews> = {
      'velvet-rose': [
        { author: 'Meera Deshmukh', rating: 5, date: 'June 02, 2026', comment: 'This is the most authentic Turkish rose I have ever encountered. The soft vanilla undercurrent gives it a plush, sweet comfort that stays with me all afternoon.' },
        { author: 'Sofia Ramirez', rating: 5, date: 'May 14, 2026', comment: 'Unbelievably long-lasting for a floral. The peony opening is sparkling and juicy, and the musk drydown is pure elegance.' }
      ],
      'midnight-oud': [
        { author: 'Aditya Roy', rating: 5, date: 'June 18, 2026', comment: 'Captivating and majestic. The Cambodian agarwood has zero of that synthetic harshness found in mass brands—it is smooth, smoky, and absolutely regal.' },
        { author: 'Nathalie Dupont', rating: 5, date: 'May 29, 2026', comment: 'Perfect for evenings. It smells like hot spice, glowing embers, and aged wood. Extremely refined, unisex statement bottle.' }
      ],
      'citrus-bloom': [
        { author: 'Ethan Walker', rating: 5, date: 'June 15, 2026', comment: 'My go-to summer daily. It literally smells like walking through Italian orange groves at dawn. The green tea has a wonderful dry crispness.' },
        { author: 'Priyanka Sharma', rating: 4, date: 'June 01, 2026', comment: 'Incredibly refreshing! Applying this after a cold shower gives an instant wake-up energy that is clean and eyes-safe.' }
      ],
      'amber-noir': [
        { author: 'Marcello Costa', rating: 5, date: 'June 11, 2026', comment: 'This projects absolute strength. A gorgeous dusty amber that carries an enigmatic smoky sweetness from the tonka and patchouli. Completely addictive.' },
        { author: 'Dr. Tanya Bose', rating: 5, date: 'May 10, 2026', comment: 'A stellar signature. People literally trace this scent path to ask me what I am wearing—it’s both modern and nostalgic.' }
      ],
      'ocean-breeze': [
        { author: 'Kabir Mehta', rating: 5, date: 'June 09, 2026', comment: 'Salty, aquatic, and rugged. The mineral salt and sage are perfectly balanced by bergamot. It dries down as a clean, masculine driftwood trail.' },
        { author: 'Liam Patterson', rating: 5, date: 'May 22, 2026', comment: 'Bracing and energetic. It isn’t that typical clean soap scent; it’s the smell of cold storm-crushed waves and grey beach wood.' }
      ]
    };

    return specificReviews[prodId] || defaultReviews;
  };

  const getComputedPriceInModal = () => {
    if (!selectedProduct) return 0;
    if (modalVolume === '50ml') return Math.max(35, selectedProduct.price - 20);
    return selectedProduct.price;
  };

  const handleFooterNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="aromaxx-master-wrapper" className="min-h-screen bg-[#050505] text-white font-sans selection:bg-gold-200 selection:text-gold-900 flex flex-col">
      
      {/* Structural Glassmorphism Header */}
      <Navbar 
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onOpenScentFinder={() => setIsScentFinderOpen(true)}
      />

      {/* Main Structural Layout Content Router */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onOpenScentFinder={() => setIsScentFinderOpen(true)} 
                onViewProduct={toggleProductDetail} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/products" 
            element={
              <Products 
                preferredType={preferredType} 
                setPreferredType={setPreferredType} 
                onAddToCart={handleAddToCart} 
                onViewProduct={toggleProductDetail} 
              />
            } 
          />
          <Route 
            path="/blog" 
            element={<Blog onViewArticle={setSelectedArticle} />} 
          />
          <Route 
            path="/contact" 
            element={
              <Contact 
                orders={orders} 
                contactMessages={contactMessages} 
                contactForm={contactForm} 
                setContactForm={setContactForm} 
                handleContactSubmit={handleContactSubmit} 
                contactSuccess={contactSuccess} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* --- DETAILED PERFUME PRODUCT RECIPE MODAL VIEW --- */}
      {selectedProduct && (
        <div id="product-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div id="product-modal-container" className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl transition-all max-h-[90vh] flex flex-col md:max-h-[85vh]">
            
            {/* Exit raw click button closer */}
            <button 
              id="product-modal-closer-btn"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-white/10 hover:text-[#d4af37] transition cursor-pointer"
            >
              <X className="h-5.5 w-5.5" />
            </button>

            {/* Split screen content layout details */}
            <div id="modal-split-grid" className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left Block: Beautiful High-end Cover image */}
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden aspect-[4/5] bg-[#161616] border border-white/10 shadow-md">
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-[#111111] border border-white/5 space-y-2 text-left">
                    <span className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase block">Perfumer Note</span>
                    <p className="text-xs text-white/50 leading-relaxed font-light italic">
                      "Formulated strictly with elite natural oil extractions. Allow up to 15 minutes of skin warmth interaction for the absolute core Bulgarian rose or Cambodian agarwood compounds to anchor and reveal."
                    </p>
                  </div>
                </div>

                {/* Right Block: Pure Custom controls */}
                <div id="modal-product-specs" className="space-y-6 text-left">
                  
                  {/* Title labels and rates */}
                  <div className="space-y-1">
                    <span className="rounded bg-[#161616] text-[#fce484] border border-white/5 font-semibold text-[10px] tracking-wider uppercase px-2.5 py-0.5">
                      {selectedProduct.type}
                    </span>
                    <h2 className="font-serif-lux text-2xl md:text-3xl font-light text-white leading-snug">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-[#d4af37]">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`h-3.5 w-3.5 ${idx < Math.floor(selectedProduct.rating) ? 'fill-[#d4af37]' : 'text-white/20'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-white/40 font-semibold">
                        ({selectedProduct.reviewsCount} nose reviews)
                      </span>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                      Vibe Description
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {selectedProduct.longDescription}
                    </p>
                  </div>

                  {/* Notes Badges list */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                      Olfactory Formulation Pyramid:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.notes.map((n) => (
                        <span 
                          key={n} 
                          className="bg-[#111111] border border-white/10 text-white/90 text-[10px] font-semibold rounded px-2.5 py-1"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed points insight list */}
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                      Fragrance Characteristics
                    </span>
                    <ul className="space-y-1.5">
                      {selectedProduct.insights.map((ins, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] font-light text-white/70">
                          <Check className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{ins}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactivity details selector: Volume sizes and Personalized Engravings */}
                  <div className="space-y-4 border-t border-white/10 pt-4">
                    
                    {/* Sizes Selection */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                        Select Decant Volume:
                      </span>
                      <div className="flex gap-2">
                        {['50ml', '100ml'].map((sz) => {
                          const isSel = modalVolume === sz;
                          const showPrice = sz === '50ml' 
                            ? Math.max(35, selectedProduct.price - 20) 
                            : selectedProduct.price;
                          return (
                            <button
                              key={sz}
                              id={`modal-volume-select-${sz}`}
                              type="button"
                              onClick={() => setModalVolume(sz)}
                              className={`flex-1 py-2 text-xs font-semibold text-center rounded border transition-all cursor-pointer ${
                                isSel
                                  ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold'
                                  : 'border-white/10 bg-[#111111] hover:border-white/20 hover:text-white text-white/70'
                              }`}
                            >
                              {sz} (${showPrice})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Luxury personalized laser engraving */}
                    <div className="space-y-1.5">
                      <label htmlFor="custom-engraving-input" className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block flex justify-between">
                        <span>Personalized Bottle Engraving (Optional):</span>
                        <span className="text-[9px] text-[#fce484] font-bold">15 CHARACTERS MAX</span>
                      </label>
                      <input
                        id="custom-engraving-input"
                        type="text"
                        maxLength={15}
                        placeholder="e.g. MONOGRAM, AR, FOREVER"
                        value={modalEngraving}
                        onChange={(e) => setModalEngraving(e.target.value)}
                        className="w-full rounded border border-white/10 bg-[#111111] p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-hidden text-center tracking-widest placeholder:tracking-normal font-mono select-all uppercase"
                      />
                      <span className="text-[9px] text-white/45 block italic text-center">
                        Laser-etched permanently into the glass face of the decant bottle.
                      </span>
                    </div>

                  </div>

                  {/* Reviews/Testimonials list */}
                  <div className="space-y-3.5 border-t border-white/10 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                      Nose Evaluations
                    </span>
                    <div className="space-y-2.5">
                      {getProductReviews(selectedProduct.id).map((rev, i) => (
                        <div key={i} className="rounded-lg bg-[#111111] p-3 border border-white/5 text-xs space-y-1 leading-relaxed text-left">
                          <div className="flex justify-between font-bold text-white">
                            <span>{rev.author}</span>
                            <span className="text-[#d4af37] flex items-center">
                              {rev.rating} <Star className="h-2.5 w-2.5 fill-[#d4af37] text-[#d4af37] ml-0.5" />
                            </span>
                          </div>
                          <p className="text-[11px] text-white/60 font-light font-sans">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add action */}
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center bg-[#111111]/40 -mx-6 -mb-6 p-6 sm:px-8 mt-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">Bespoke Decant Price</span>
                      <span className="text-xl font-bold text-white">${getComputedPriceInModal()}</span>
                    </div>
                    <button
                      id="modal-add-to-cart-btn"
                      onClick={handleModalAddAndClose}
                      className="rounded-full bg-[#d4af37] hover:bg-[#fce484] transition-all duration-300 text-black text-xs font-bold tracking-widest uppercase px-6 py-3 shadow-lg cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Scent Box
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- DETAILED BLOG JOURNAL ARTICLE READ MODAL VIEW --- */}
      {selectedArticle && (
        <div id="blog-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div id="blog-modal-container" className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl transition-all max-h-[90vh] flex flex-col md:max-h-[85vh]">
            
            {/* Exit btn */}
            <button 
              id="article-modal-exit-btn"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-white/10 transition shadow-sm cursor-pointer border border-white/5"
            >
              <X className="h-5.5 w-5.5" />
            </button>

            <div id="blog-scroller" className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-left">
              
              {/* Category specs */}
              <div className="space-y-2">
                <span className="rounded bg-[#161616] border border-white/5 text-[#fce484] font-bold text-[10px] tracking-widest uppercase px-2.5 py-1">
                  {selectedArticle.category}
                </span>
                <h2 className="font-serif-lux text-3xl sm:text-4xl font-semibold leading-tight text-white">
                  {selectedArticle.title}
                </h2>
                <div className="flex gap-2 text-xs text-white/40 font-medium border-b border-white/5 pb-3">
                  <span>Published on {selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.minRead} Minutes luxury read time</span>
                </div>
              </div>

              {/* Cover with overlay */}
              <div className="rounded-xl overflow-hidden aspect-[21/9] bg-[#161616] border border-white/10 shadow-sm">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Quotations block */}
              {selectedArticle.quote && (
                <div className="rounded-xl bg-[#111111] border border-white/5 p-6 italic font-serif-lux text-[15px] sm:text-lg text-white/90 pl-6 border-l-4 border-[#d4af37]">
                  <p>"{selectedArticle.quote}"</p>
                  {selectedArticle.quoteAuthor && (
                    <span className="block text-xs font-sans tracking-widest uppercase font-bold text-[#d4af37] mt-2 text-right">
                      — {selectedArticle.quoteAuthor}
                    </span>
                  )}
                </div>
              )}

              {/* Text Articles */}
              <div className="text-xs sm:text-sm text-white/80 leading-relaxed font-light space-y-4">
                {selectedArticle.content.map((pText, i) => (
                  <p key={i}>
                    {pText}
                  </p>
                ))}
              </div>

              {/* Scent matches links */}
              <div className="rounded-xl border border-white/5 bg-[#111111]/40 p-5 space-y-3 pt-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                  Aromaxx Signature Curation Recommendation:
                </span>
                <p className="text-xs italic text-white/50 max-w-lg mx-auto font-light">
                  Inspired by these beautiful insights? Run our intelligent Signature Scent Matcher questionnaire to find your perfect fit with absolute ingredients.
                </p>
                <button
                  id="article-read-portal-btn"
                  onClick={() => {
                    setSelectedArticle(null);
                    setIsScentFinderOpen(true);
                  }}
                  className="rounded-full bg-[#d4af37] hover:bg-[#fce484] transition-all text-black text-[10px] font-bold tracking-widest uppercase px-5 py-2 cursor-pointer shadow-xs"
                >
                  Configure My Signature Scent
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- CART DRAWER COMPONENT TRIGGER --- */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* --- SIGNATURE SCENT ANALYZER AI MODAL INTERACTIVE PORTAL --- */}
      <ScentFinder 
        isOpen={isScentFinderOpen}
        onClose={() => setIsScentFinderOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* LUXURY EDITORIAL FOOTER */}
      <footer id="aromaxx-editorial-footer" className="border-t border-white/10 bg-[#070707] text-white/50 py-12 text-center text-xs space-y-4 font-light mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="font-serif-lux text-2xl tracking-[0.25em] font-medium text-white">AROMAXX</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-semibold">Luxury Perfumes</span>
          </div>
          
          <ul id="footer-navigation" className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-wider font-semibold text-white/70">
            <li onClick={() => handleFooterNav('/')} className="hover:text-[#d4af37] transition cursor-pointer">Home</li>
            <li onClick={() => handleFooterNav('/about')} className="hover:text-[#d4af37] transition cursor-pointer">About Us</li>
            <li onClick={() => handleFooterNav('/products')} className="hover:text-[#d4af37] transition cursor-pointer">Products</li>
            <li onClick={() => handleFooterNav('/blog')} className="hover:text-[#d4af37] transition cursor-pointer">Blog</li>
            <li onClick={() => handleFooterNav('/contact')} className="hover:text-[#d4af37] transition cursor-pointer">Contact Details</li>
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition cursor-pointer">Sitemap</a>
            </li>
          </ul>

          <div className="text-[10px] md:text-right text-white/40 space-y-1">
            <p>© 2026 Aromaxx Perfumes Ltd. All memory rights bottled.</p>
            <p className="italic">Distilled beautifully in New Delhi under master guidelines.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
