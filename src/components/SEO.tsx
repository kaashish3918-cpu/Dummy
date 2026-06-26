/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    // Set Document Title
    document.title = title;
    
    // Set Document Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set Document Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const pathname = window.location.pathname;
    const baseUrl = 'https://aromaxx.netlify.app';
    // Ensure standard trailing slash configuration or correct path formation
    const canonicalUrl = baseUrl + (pathname === '/' ? '/' : pathname);
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description]);

  return null;
}
