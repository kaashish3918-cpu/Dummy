/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Check, Truck } from 'lucide-react';
import { Order, ContactMessage } from '../types';
import SEO from '../components/SEO';

interface ContactProps {
  orders: Order[];
  contactMessages: ContactMessage[];
  contactForm: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  };
  setContactForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }>>;
  handleContactSubmit: (e: React.FormEvent) => void;
  contactSuccess: boolean;
}

export default function Contact({
  orders,
  contactMessages,
  contactForm,
  setContactForm,
  handleContactSubmit,
  contactSuccess
}: ContactProps) {
  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-16 animate-fade-in text-f4f4f4 bg-[#050505]">
      <SEO 
        title="Contact Details & Client Support | Aromaxx Fulfillments" 
        description="Connect with our client support and concierge team for bespoke decant creations, laser etching inquiries, and real-time order tracking." 
      />

      {/* Title & custom H1 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] font-medium">
          Contact Details & Fulfillments
        </span>
        <h1 className="font-serif-lux text-3xl sm:text-5xl font-light text-white">
          Olfactory Assistance
        </h1>
        <div className="h-[1px] w-24 bg-[#d4af37] mx-auto mt-2" />
      </div>

      {/* Grid: Form Side VS Details & Order History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
        
        {/* Form panel */}
        <div id="contact-form-side" className="rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-1.5">
            <h3 className="font-serif-lux text-xl font-semibold text-white">
              Address our Scent Master Board
            </h3>
            <p className="text-xs text-white/50 font-light">
              Send general inquiries, bespoke decant requests, or custom bottling details.
            </p>
          </div>

          <form id="inquiring-form" onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="contact-fullName" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Your Full Name
                </label>
                <input
                  id="contact-fullName"
                  type="text"
                  required
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                  placeholder="Marcello Sterling"
                  className="rounded-lg border border-white/10 p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-hidden bg-[#111111]"
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Your Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="marcello@example.com"
                  className="rounded-lg border border-white/10 p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-hidden bg-[#111111]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="contact-subject" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                Subject Matter
              </label>
              <input
                id="contact-subject"
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="e.g. Bespoke laser bottle etching options"
                className="rounded-lg border border-white/10 p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-hidden bg-[#111111]"
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                Your Detailed Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Write your olfactory dreams, concerns, or requests..."
                className="rounded-lg border border-white/10 p-3 text-xs text-white focus:border-[#d4af37] focus:outline-hidden resize-none bg-[#111111]"
              />
            </div>

            {contactSuccess && (
              <div className="flex items-start gap-2 rounded-lg bg-emerald-950/45 border border-emerald-500/30 p-3 text-xs text-emerald-300 animate-fade-in font-medium">
                <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="space-y-0.5 text-left">
                  <span>Concierge ticket submitted!</span>
                  <span className="block text-[10px] font-normal text-emerald-400/90">Our team responds to inquires within 4 business hours.</span>
                </div>
              </div>
            )}

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full rounded-full bg-[#d4af37] hover:bg-[#fce484] text-black text-xs font-bold tracking-widest uppercase py-3.5 shadow-md cursor-pointer transition-all duration-300"
            >
              Send Concierge Directive
            </button>
          </form>

          {/* Past direct inquiry messages */}
          {contactMessages.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                Submitted Tickets ({contactMessages.length})
              </span>
              <div className="space-y-2.5 max-h-[160px] overflow-y-auto">
                {contactMessages.map((msg, idx) => (
                  <div key={idx} className="rounded-lg bg-[#111111] border border-white/5 p-3 text-xs space-y-1 text-left">
                    <div className="flex justify-between text-[10px] text-white/40 font-medium">
                      <span className="font-bold truncate max-w-[130px]">{msg.subject}</span>
                      <span>{msg.date}</span>
                    </div>
                    <p className="text-white/80 font-light italic truncate">"{msg.message}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: support details and Completed Orders list */}
        <div id="contact-details-side" className="space-y-8">
          
          <div className="space-y-5 rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 sm:p-8">
            <h3 className="font-serif-lux text-lg font-bold text-white">Direct Assistance</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Send Correspondence</p>
                  <p className="text-sm font-semibold text-white">support@aromaxx.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Direct Concierge Hotline</p>
                  <p className="text-sm font-semibold text-white">+1 (800) 900-3409</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Olfactory Laboratory</p>
                  <p className="text-sm font-semibold text-white">M-45 Greater Kailash, New Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="h-4.5 w-4.5 text-[#d4af37]" />
              <span>Formulated with 100% skin safety guarantee and certified sustainable.</span>
            </div>
          </div>

          {/* Orders Tracking History */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 sm:p-8 space-y-4">
            <h3 className="font-serif-lux text-lg font-bold text-white flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#d4af37]" />
              Order Dispatch Tracker
            </h3>
            
            {orders.length === 0 ? (
              <p className="text-xs text-white/40 italic font-light py-2">
                No orders discovered associated with this session. Add formulations to your cart and finalize checkout to view dispatch routes.
              </p>
            ) : (
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-xl border border-white/10 p-4 space-y-3 bg-[#111111] text-left">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">{order.id}</p>
                        <p className="text-[9px] text-white/40">{order.date}</p>
                      </div>
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/40 text-[#fce484] text-[9px] font-extrabold uppercase px-2.5 py-0.5">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {order.items.map((item, idy) => (
                        <div key={idy} className="flex justify-between text-xs text-white/80">
                          <span className="truncate max-w-[200px] font-light">
                            {item.product.name} ({item.selectedVolume}) <span className="text-white/40 font-semibold">x{item.quantity}</span>
                          </span>
                          <span className="font-semibold text-white">${item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-2 flex justify-between items-center text-xs">
                      <div>
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">Courier Route ID</p>
                        <p className="font-mono text-[10px] text-[#d4af37]">{order.trackingId}</p>
                      </div>
                      <p className="font-bold text-sm text-white">Total: ${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
