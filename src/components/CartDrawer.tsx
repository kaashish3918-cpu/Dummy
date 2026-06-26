/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Shield, Heart, ArrowRight, CheckCircle, Truck } from 'lucide-react';
import { CartItem, Product, Order, UserInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingInfo, setShippingInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardHolder: '',
    cardNumber: '',
    cardExpiry: '',
    cvv: ''
  });
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Compute price based on size
  const getItemPrice = (item: CartItem) => {
    if (item.selectedVolume === '50ml') {
      return Math.max(35, item.product.price - 20);
    }
    return item.product.price;
  };

  const cartTotal = cart.reduce((acc, item) => {
    return acc + getItemPrice(item) * item.quantity;
  }, 0);

  const deliveryFee = cartTotal > 150 ? 0 : 15;
  const grandTotal = cartTotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
    // Remove error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!shippingInfo.email.trim() || !/\S+@\S+\.\S+/.test(shippingInfo.email)) errors.email = 'Valid email is required';
    if (!shippingInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) errors.address = 'Delivery address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.postalCode.trim()) errors.postalCode = 'Postal Code is required';
    if (!shippingInfo.cardHolder.trim()) errors.cardHolder = 'Cardholder Name is required';
    if (!shippingInfo.cardNumber.trim() || shippingInfo.cardNumber.trim().length < 16) errors.cardNumber = 'Valid 16-digit card required';
    if (!shippingInfo.cardExpiry.trim() || !/\d\d\/\d\d/.test(shippingInfo.cardExpiry)) errors.cardExpiry = 'Expiry format MM/YY is required';
    if (!shippingInfo.cvv.trim() || shippingInfo.cvv.trim().length < 3) errors.cvv = 'Valid CVV required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury fulfillment timeline
    setTimeout(() => {
      const trackingNum = `AR-${Math.floor(100000 + Math.random() * 900000)}-DEL`;
      const transactionId = `TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newOrder: Order = {
        id: transactionId,
        items: [...cart],
        total: grandTotal,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'Pending',
        userInfo: {
          fullName: shippingInfo.fullName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          cardHolder: shippingInfo.cardHolder
        },
        trackingId: trackingNum
      };

      setLastCreatedOrder(newOrder);
      onOrderCompleted(newOrder);
      setCheckoutStep('success');
      setIsSubmitting(false);
      onClearCart();
    }, 1500);
  };

  const handleReturnToShopping = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      
      {/* Drawer Container */}
      <div id="cart-drawer-container" className="h-full w-full max-w-md border-l border-gold-200 bg-luxury-cream shadow-2xl flex flex-col animate-slide-in">
        
        {/* Editorial Top header */}
        <div id="cart-drawer-header" className="flex items-center justify-between border-b border-gold-200/50 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold-600" />
            <span className="font-serif-lux text-xl font-medium tracking-widest text-luxury-black">
              {checkoutStep === 'cart' && 'YOUR BOUDOIR CART'}
              {checkoutStep === 'shipping' && 'SECURE CHECKOUT'}
              {checkoutStep === 'success' && 'ORDER COMPLETED'}
            </span>
          </div>
          <button
            id="cart-drawer-close-btn"
            onClick={onClose}
            className="rounded-full p-1 text-luxury-black/50 hover:bg-gold-100 hover:text-luxury-black transition cursor-pointer"
          >
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Content Body */}
        <div id="cart-drawer-body" className="flex-1 overflow-y-auto p-5">
          
          {/* STEP 1: CART ITEMS REVIEW */}
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div id="empty-cart-view" className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <ShoppingBag className="h-16 w-16 text-gold-200 stroke-1 animate-bounce" />
                  <p className="font-serif-lux text-lg italic text-luxury-black/60">
                    Your luxury vessel is empty.
                  </p>
                  <p className="text-xs text-luxury-black/40 max-w-xs">
                    Explore our curated collection to discover your signature scent memory.
                  </p>
                  <button
                    id="empty-cart-return-btn"
                    onClick={onClose}
                    className="rounded-full bg-gold-700 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white hover:bg-gold-800 transition shadow-md cursor-pointer"
                  >
                    Explore E-Boutique
                  </button>
                </div>
              ) : (
                <div id="cart-items-wrapper" className="space-y-4">
                  {cart.map((item) => {
                    const price = getItemPrice(item);
                    return (
                      <div
                        key={item.id}
                        id={`cart-item-${item.id}`}
                        className="flex items-start gap-3 rounded-xl border border-gold-200/40 bg-white p-3.5 shadow-xs transition hover:border-gold-300"
                      >
                        {/* Img */}
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-20 w-16 rounded-md object-cover border border-gold-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <h4 className="font-serif-lux text-sm font-semibold truncate text-luxury-black">
                            {item.product.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-2 text-[10px] text-luxury-black/55">
                            <span className="font-medium text-gold-700">{item.selectedVolume}</span>
                            <span>•</span>
                            <span>{item.product.type}</span>
                          </div>

                          {/* Engraving Note badge */}
                          {item.personalizedEngraving && (
                            <div className="inline-flex items-center gap-1 mt-1 rounded-sm bg-gold-50 border border-gold-200/60 px-2 py-0.5 text-[9px] text-gold-800 italic">
                              <Heart className="h-2.5 w-2.5 fill-gold-400 text-gold-400 stroke-1" />
                              Client Monogram: "{item.personalizedEngraving}"
                            </div>
                          )}

                          {/* Pricing & Control panel */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-bold text-luxury-black">
                              ${price * item.quantity}
                              {item.quantity > 1 && (
                                <span className="text-[10px] font-normal text-luxury-black/50 ml-1">
                                  (${price} ea)
                                </span>
                              )}
                            </span>

                            {/* Quantity buttons */}
                            <div className="flex items-center border border-gold-200 rounded-lg bg-gold-50/50">
                              <button
                                id={`cart-item-qty-minus-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 text-luxury-black/60 hover:text-luxury-black transition"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-luxury-black">
                                {item.quantity}
                              </span>
                              <button
                                id={`cart-item-qty-plus-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-luxury-black/60 hover:text-luxury-black transition"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Trash */}
                        <button
                          id={`cart-item-trash-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="text-luxury-black/35 hover:text-rose-600 transition p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING AND SECURE DETAILS */}
          {checkoutStep === 'shipping' && (
            <form id="checkout-shipping-form" onSubmit={handleCheckoutSubmit} className="space-y-5 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 block border-b border-gold-200/50 pb-1">
                Luxury Delivery Details
              </span>

              {/* Delivery info */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-1">
                  <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                    Concierge Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Laureen Sterling"
                    className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                      formErrors.fullName ? 'border-rose-400' : 'border-gold-200/60'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-rose-600 font-medium">{formErrors.fullName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      placeholder="lauren@example.com"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.email ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-600 font-medium">{formErrors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+91-XXXXXXXXXX"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.phone ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-600 font-medium">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  <label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                    Mailing Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    placeholder="Bespoke Villa, 11 Ring Road"
                    className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                      formErrors.address ? 'border-rose-400' : 'border-gold-200/60'
                    }`}
                  />
                  {formErrors.address && <p className="text-[10px] text-rose-600 font-medium">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="city" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      placeholder="New Delhi"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.city ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.city && <p className="text-[10px] text-rose-600 font-medium">{formErrors.city}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="postalCode" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      Postal / ZIP
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      placeholder="110001"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.postalCode ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.postalCode && <p className="text-[10px] text-rose-600 font-medium">{formErrors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Secure Payment details */}
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 block border-b border-gold-200/50 pb-1 pt-2">
                Simulated Payment vault
              </span>
              <div className="rounded-xl border border-gold-200/50 bg-gold-50/20 p-4 space-y-3">
                <div className="grid grid-cols-1 gap-1">
                  <label htmlFor="cardHolder" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75 flex justify-between">
                    <span>Cardholder's Name</span>
                    <span className="text-[9px] text-gold-600 font-bold tracking-widest">TLS SECURE</span>
                  </label>
                  <input
                    id="cardHolder"
                    type="text"
                    name="cardHolder"
                    value={shippingInfo.cardHolder}
                    onChange={handleInputChange}
                    placeholder="Laureen Sterling"
                    className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                      formErrors.cardHolder ? 'border-rose-400' : 'border-gold-200/60'
                    }`}
                  />
                  {formErrors.cardHolder && <p className="text-[10px] text-rose-600 font-medium">{formErrors.cardHolder}</p>}
                </div>

                <div className="grid grid-cols-1 gap-1">
                  <label htmlFor="cardNumber" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                    Valid Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    maxLength={16}
                    value={shippingInfo.cardNumber}
                    onChange={handleInputChange}
                    placeholder="4000 1234 5678 9010"
                    className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                      formErrors.cardNumber ? 'border-rose-400' : 'border-gold-200/60'
                    }`}
                  />
                  {formErrors.cardNumber && <p className="text-[10px] text-rose-600 font-medium">{formErrors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="cardExpiry" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      Expiry Date
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      name="cardExpiry"
                      maxLength={5}
                      value={shippingInfo.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.cardExpiry ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.cardExpiry && <p className="text-[10px] text-rose-600 font-medium">{formErrors.cardExpiry}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="cvv" className="text-[10px] font-bold uppercase tracking-wider text-luxury-black/75">
                      CVV Code
                    </label>
                    <input
                      id="cvv"
                      type="password"
                      name="cvv"
                      maxLength={4}
                      value={shippingInfo.cvv}
                      onChange={handleInputChange}
                      placeholder="•••"
                      className={`rounded-lg border bg-white p-2.5 text-xs text-luxury-black focus:border-gold-600 focus:outline-hidden ${
                        formErrors.cvv ? 'border-rose-400' : 'border-gold-200/60'
                      }`}
                    />
                    {formErrors.cvv && <p className="text-[10px] text-rose-600 font-medium">{formErrors.cvv}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  id="checkout-cancel-btn"
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="rounded-full border border-gold-300 py-3 text-xs font-bold tracking-widest uppercase text-gold-800 hover:bg-gold-50 transition flex-1 cursor-pointer"
                >
                  Back to Cart
                </button>
                <button
                  id="checkout-confirm-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-gold-700 py-3 text-xs font-bold tracking-widest uppercase text-white shadow-lg shadow-gold-100 hover:bg-gold-800 hover:-translate-y-0.5 transition flex-1 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Securing...
                    </>
                  ) : (
                    <>
                      Fulfill Order
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION SCREEN */}
          {checkoutStep === 'success' && lastCreatedOrder && (
            <div id="checkout-success-view" className="text-center py-6 space-y-6 animate-fade-in text-luxury-black">
              <div className="relative flex h-24 w-24 mx-auto items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gold-200/25 animate-ping" />
                <div className="relative rounded-full bg-gold-100 border border-gold-300 p-5">
                  <CheckCircle className="h-10 w-10 text-gold-700" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-lux text-2xl font-semibold">
                  Aromaxx Order Placed
                </h3>
                <p className="text-xs text-luxury-black/60 italic max-w-xs mx-auto">
                  “Your scent memoir is registered for alchemy.”
                </p>
              </div>

              <div className="rounded-xl border border-gold-200/50 bg-white p-4 text-left space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-gold-100 pb-1.5 font-bold tracking-wider">
                  <span className="text-gold-700">Receipt Details</span>
                  <span className="text-[10px] text-luxury-black/45">ID: {lastCreatedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/55">Recipient:</span>
                  <span className="font-medium">{lastCreatedOrder.userInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/55">Delivery:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{lastCreatedOrder.userInfo.address}, {lastCreatedOrder.userInfo.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/55">Carrier:</span>
                  <span className="font-semibold text-gold-700 flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Premium Express
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/55">Tracking Code:</span>
                  <span className="font-mono bg-gold-50/80 px-2 py-0.5 rounded border border-gold-200/40 text-[10px] font-bold text-gold-800 select-all">
                    {lastCreatedOrder.trackingId}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gold-100 pt-1.5 font-bold text-sm">
                  <span>Grand Total:</span>
                  <span className="text-gold-700">${lastCreatedOrder.total}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-luxury-black/45 leading-relaxed max-w-xs mx-auto">
                  A verification confirmation code with premium delivery guides has been emitted to <span className="font-bold">{lastCreatedOrder.userInfo.email}</span>. Premium packaging ensures perfect temperature control during transit.
                </p>
                <button
                  id="checkout-success-return-btn"
                  onClick={handleReturnToShopping}
                  className="rounded-full bg-gold-700 px-8 py-3 text-xs font-semibold tracking-wider uppercase text-white hover:bg-gold-800 transition shadow-lg w-full cursor-pointer"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Pricing Footer */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div id="cart-drawer-footer" className="border-t border-gold-200/50 bg-gold-50/40 p-5 space-y-4">
            
            <div id="cart-pricing-summary" className="space-y-1.5 text-xs text-luxury-black/75">
              <div className="flex justify-between">
                <span>Vessel Subtotal:</span>
                <span className="font-bold text-luxury-black">${cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Premium Courier Hand-delivery:</span>
                <span className="font-bold text-luxury-black">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">COMPLIMENTARY</span> : `$${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[9px] text-gold-600 text-right italic">
                  Spend ${(150 - cartTotal)} more for free premium shipping
                </p>
              )}
              <div className="flex justify-between text-sm font-bold border-t border-gold-200/30 pt-2.5 text-luxury-black">
                <span>Grand Total:</span>
                <span className="text-gold-700">${grandTotal}</span>
              </div>
            </div>

            <div id="cart-actions-container" className="flex flex-col gap-2">
              <button
                id="cart-checkout-proceed-btn"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full rounded-full bg-gold-700 py-3 text-xs font-bold tracking-widest uppercase text-white shadow-lg shadow-gold-100 hover:bg-gold-800 hover:-translate-y-0.5 transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Proceed to Secure Ritual
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                id="cart-continue-buying-btn"
                onClick={onClose}
                className="w-full text-center py-2 text-[10px] font-bold tracking-wider uppercase text-luxury-black/50 hover:text-luxury-black transition cursor-pointer"
              >
                Add More Scent Memories
              </button>
            </div>

            <div id="cart-trust-badge" className="flex items-center justify-center gap-2 text-[10px] text-luxury-black/35 text-center mt-1 pt-1 border-t border-gold-200/20">
              <Shield className="h-3.5 w-3.5 text-gold-500" />
              <span>Sustainably Sourced & Skines-Safe Premium Oils</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
