/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  type: string;
  notes: string[];
  price: number;
  description: string;
  longDescription: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  volumeOptions: string[]; // e.g. ["50ml", "100ml"]
  accentColor: string; // Tailwind color for themed effects
  insights: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  minRead: number;
  imageUrl: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface CartItem {
  id: string; // Unique cart item ID (combines product id, size, engraving)
  product: Product;
  quantity: number;
  selectedVolume: string; // e.g. "100ml"
  personalizedEngraving?: string; // Optional custom text engraved on the bottle
}

export interface UserInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardHolder: string;
  cardNumber: string;
  cardExpiry: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  userInfo: Omit<UserInfo, 'cardNumber' | 'cardExpiry' | 'cvv'>;
  trackingId: string;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
