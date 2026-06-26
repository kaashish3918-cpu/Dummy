/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, BlogArticle } from './types';

export const products: Product[] = [
  {
    id: 'velvet-rose',
    name: 'Velvet Rose Eau de Parfum',
    type: 'Floral',
    notes: ['Rose', 'Peony', 'Vanilla', 'Musk'],
    price: 79,
    description: 'A romantic blend of soft florals and warm vanilla.',
    longDescription: 'Velvet Rose is an exquisite exploration of modern beauty and femininity. It opens with the fresh dew of morning peonies, unfurling elegantly into a heart of rich Turkish Rose. The dry-down is a warm, sensual embrace of absolute vanilla and velvet skin musk that stays close to the skin as a sublime, intimate signature.',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 148,
    volumeOptions: ['50ml', '100ml'],
    accentColor: 'rose',
    insights: [
      'Lasts up to 10 hours',
      'Perfect for romantic dates & daytime luxury',
      'Specially distilled Bulgarian rose oil'
    ]
  },
  {
    id: 'midnight-oud',
    name: 'Midnight Oud Intense',
    type: 'Woody Oriental',
    notes: ['Oud', 'Amber', 'Sandalwood', 'Spices'],
    price: 119,
    description: 'Deep, mysterious fragrance for evening elegance.',
    longDescription: 'Dark, prestigious, and deeply luxurious, Midnight Oud Intense is crafted for moments when you wish to captivate. It starts with an aromatic whisper of hot saffron and cardamom, melting into a majestic heart of rare Cambodian agarwood (oud) and milky sandalwood. A rich base of golden amber leaves an intoxicating trace in its wake.',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 215,
    volumeOptions: ['50ml', '100ml'],
    accentColor: 'violet',
    insights: [
      'Extremely long lasting (12+ hours)',
      'Sophisticated cold-weather & black-tie evening classic',
      'Features authentic ethically-harvested agarwood essential oil'
    ]
  },
  {
    id: 'citrus-bloom',
    name: 'Citrus Bloom Fresh Mist',
    type: 'Citrus Fresh',
    notes: ['Lemon', 'Orange Blossom', 'Green Tea'],
    price: 49,
    description: 'Light, refreshing scent for daily wear.',
    longDescription: 'Citrus Bloom is an instant burst of pure Mediterranean sunshine. Vibrant sun-ripened lemons and bergamot wake the senses instantly, yielding to a tranquil central garden of orange blossom and steamed green tea leaves. It’s the ultimate scent for radiance, active mornings, and casual weekend simplicity.',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 94,
    volumeOptions: ['50ml', '100ml'],
    accentColor: 'amber',
    insights: [
      'Lasts up to 6–8 hours',
      'Crisp, energizing option for high heat or post-workout freshness',
      'Formulated with natural cold-pressed fruit extracts'
    ]
  },
  {
    id: 'amber-noir',
    name: 'Amber Noir Signature',
    type: 'Oriental',
    notes: ['Amber', 'Patchouli', 'Musk', 'Tonka Bean'],
    price: 99,
    description: 'Bold and long-lasting signature scent.',
    longDescription: 'Amber Noir is a structured, unisex masterpiece of mystery and confidence. It projects a magnetic warmth using a sweet, dusty amber heart backed by toasted tonka beans. Grounded in rich, earthy Indonesian patchouli and soft white musk, it is designed for daring souls who want their presence felt before speaking.',
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 182,
    volumeOptions: ['50ml', '100ml'],
    accentColor: 'stone',
    insights: [
      'Lasts up to 10–12 hours',
      'Unisex formulation suitable for self-assured days or sultry nights',
      'Sublime projection that sparks curiosities and compliments'
    ]
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze Homme',
    type: 'Aquatic',
    notes: ['Sea Salt', 'Bergamot', 'Driftwood'],
    price: 85,
    description: 'Clean and energetic masculine fragrance.',
    longDescription: 'Ocean Breeze Homme mimics the raw power of cold crashing surf. It hits with a bracing splash of sea salt minerals, fresh zesty bergamot, and bruised wild rosemary leaves. As the aquatic mist dries, it leaves a texturized base of sun-bleached driftwood and fresh vetiver, portraying effortless grit and masculine charm.',
    imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 106,
    volumeOptions: ['50ml', '100ml'],
    accentColor: 'cyan',
    insights: [
      'Lasts up to 8–10 hours',
      'Excellent sporty, clean corporate, or adventurous outdoors choice',
      'Enriched with cooling maritime organic compounds'
    ]
  }
];

export const blogArticles: BlogArticle[] = [
  {
    id: 'choose-signature-scent',
    title: 'How to Choose Your Signature Scent',
    excerpt: 'Learn how fragrance notes reflect your unique personality and mood to find that one elusive scent.',
    date: 'June 10, 2026',
    category: 'Guides',
    minRead: 5,
    imageUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600',
    quote: "A woman's perfume tells more about her than her handwriting.",
    quoteAuthor: 'Christian Dior',
    content: [
      'Your signature scent is not merely a fragrance; it is a silent introduction, an invisible extension of your personality, and a lingering memory that speaks long after you have walked away from a room. But with thousands of olfactory combinations lining luxury counters, finding "The One" can feel like searching for a needle in a floral haystack.',
      'To begin, it is essential to understand the structural pyramid of perfume architecture. Fragrances are built on three successive layers: Top, Heart, and Base notes. The top notes are your initial impression—citrusy, sharp, or fleetingly fresh. They last roughly fifteen minutes before dissolving into the heart notes. The heart notes define the core character (the floral, aromatic, or spicy middle) lasting several hours. Lastly, the base notes are the heavy molecules (like resins, woods, vanilla, and musks) that cling to the skin for the remaining part of the day.',
      'When shopping, never buy a fragrance based on how it smells on a paper card. Fragrance molecules react dynamically with your skin’s unique pH level, daily temperature, and even sebum composition. Spray a small sample onto your pulse points (wrists/elbows) and walk out into the open air. Let the scent live on your skin for at least four hours to evaluate if the rich dry-down truly agrees with your natural chemistry.',
      'Lastly, coordinate your fragrance search with your environment and typical mood. If you thrive on calm, crisp wellness and light linens, a Citrus Fresh (like Citrus Bloom) or clean Aquatic note is your ally. If your energy is bold, assertive, and formal, look toward Woody Oriental or full-bodied incense blends (like Midnight Oud).'
    ]
  },
  {
    id: 'perfume-trends-2026',
    title: 'Top 5 Perfume Trends of 2026',
    excerpt: 'Explore emerging trends shaping modern perfumery, like minimal-skin scents and mood-boosting active ingredients.',
    date: 'May 28, 2026',
    category: 'Industry',
    minRead: 4,
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    quote: 'Innovation in perfumery today lies in purity, transparency, and personal emotional alignment.',
    quoteAuthor: 'Laure Aromaxx, Perfumer',
    content: [
      'As we journey through 2026, the fragrance industry is undergoing a radical renaissance. No longer are consumers chasing heavy, imposing clouds of fragrance designed to dominate a room. Instead, fragrance has become an intimate, inward-facing tool for personal comfort, self-alignment, and raw authenticity.',
      'The first massive shift is the rise of the "Skin-Scent" or Minimalist category. These are low-concentration perfumes designed to smell like "your skin, but slightly better and more comforting." Relying heavily on cozy molecules like Ambroxan, Iso E Super, and warm skin musks, they adapt so subtly that observers barely notice you are wearing perfume—they simply think you smell incredibly good.',
      'Second on the list is Functional Fragrance. Backed by neuroscience, these formulas fuse aromatherapeutic botanicals with synthetic aroma-chemicals to stimulate specific brain pathways. Citrus formulations are infused with green tea extracts to sharpen cognitive focus, while gentle lavender and vanilla-bean abstracts are balanced to promote overnight sleep wellness.',
      'Third, we witness a grand return of Warm Gourmands, though with a twist. Instead of the overly syrupy sweet paths of yesteryears, 2026 introduces savory-sweet blends: toasted sesame, creamy salt-crusted caramel, roasted cardamom, and bitter dark cacao, creating a decadent balance of delicious coziness without artificial sweetness.',
      'Finally, sustainable engineering is non-negotiable. From completely biodegradable solvent formulations to upcycled floral waste and fully refillable beautiful ceramic vials, luxury consumers demand that environmental conscience match olfactory excellence.'
    ]
  },
  {
    id: 'science-long-lasting',
    title: 'The Science Behind Long-Lasting Perfumes',
    excerpt: 'Understand how oil concentrations, skin hydration, and molecular sizes dictate how long a fragrance projects.',
    date: 'April 14, 2026',
    category: 'Science',
    minRead: 6,
    imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600',
    quote: 'Volatility is the mortal enemy of fragrance, but molecular density is its armor.',
    quoteAuthor: 'Dr. Evelyn Moss, Fragrance chemist',
    content: [
      'We have all experienced the tragedy of spraying a beautiful, expensive perfume in the morning, only for its exquisite melody to disappear completely by the time we reach our mid-day meetings. Why do some scents evaporate like steam, while others endure on heavy coats for weeks?',
      'The mystery is resolved by chemical compounding and physics. First, let’s talk about concentrations. The legal classification of perfume dictates the ratio of pure perfume oil to alcohol solvent. Eau de Cologne houses a mere 2-4% oil, lasting 2 hours. Eau de Toilette contains 5-15% lasting up to 4 hours. Eau de Parfum elevates to 15-20% oil, offering a reliable 8-10 hour shelf life. Pure Extraits or Parfums dwarf others with up to 30% oil concentration, surviving on skin for almost 24 hours.',
      'However, concentration isn’t everything. Molecular weight is the true director. Light citrus molecules (limonene, bergamot oil) are small, volatile structures that easily turn to gas and float away. Heavy resinous, musky, or woody molecules (vanillin, patchouly, sandal, amberwood) have large hook-like chemical structures that anchor themselves firmly onto surfaces and evaporate at a glacial pace.',
      'To maximize the lifespan of your chosen scent, prepare your skin canvas first. Perfume oils are lipophilic, meaning they attach vigorously to fats. Dry skin will dry out the scent in minutes. Applying an unscented body cream or barrier moisturizer before spraying creates a receptive oil layer that anchors the scent. Also, concentrate sprays on warm, high-circulation pulse points: behind the ears, base of throat, inner elbows, and the wrists. Never vigorously rub your wrists together after spraying; this creates friction-heat which prematurely breaks down delicate high notes.'
    ]
  },
  {
    id: 'art-perfume-layering',
    title: 'Perfume Layering: Create Your Unique Scent',
    excerpt: 'Unlock the secret masterclass of stacking scents together to form a highly customized olfactory footprint.',
    date: 'March 02, 2026',
    category: 'Masterclass',
    minRead: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    quote: 'Your fragrance should be as unpredictable and multifaceted as your thoughts.',
    quoteAuthor: 'Aromaxx Design Board',
    content: [
      'In a world governed by mass production, there is a recurring dread of walking into a social event and realizing you smell exactly like someone else. Enter Perfume Layering—the custom art of combining two or separate scents directly on the skin to weave an completely custom code that can never be replicated.',
      'Layering doesn’t mean spraying three heavy colognes at once and distressing your friends. It is an exercise in restraint and balance. The fundamental rule is to stack heavier fragrances first. Always apply your deep, resinous, woody, or oriental base note (like midnight oud or amber noir) as the bottom foundation. Let it dry for two minutes, allowing the heavy molecule anchors to grip your skin.',
      'Next, top it with a contrasting lighter, brighter scent (such as the citrusy fresh citrus bloom or floral velvet rose). The light top notes of the second fragrance will sparkle over the deep, low frequency hum of the bottom base, forming a sparkling, complex trail that transitions with mesmerizing depth as the day evolves.',
      'Do not be afraid of combining contrasting worlds. Stacking a sweet vanilla floral on top of a salty marine aquatic creates a delicious "salted caramel shore" vibration. Combining a dry spicy amber under a sweet green garden tea note softens the earthiness, giving it a velvety evening allure. Start with small, non-invasive strokes, use trial runs on your wrists, and design an olfactory aura that is exclusively yours.'
    ]
  },
  {
    id: 'scent-and-memory',
    title: 'Fragrance & Memory: Why Scents Trigger Emotions',
    excerpt: 'Diving into neurological biology to comprehend why a single smell can recall rich childhood memories in milliseconds.',
    date: 'February 12, 2026',
    category: 'Science',
    minRead: 4,
    imageUrl: 'https://images.unsplash.com/photo-1528740564265-e32a41363fadc?auto=format&fit=crop&q=80&w=600',
    quote: 'Smell is a potent wizard that transports you across thousands of miles and all the years you have lived.',
    quoteAuthor: 'Helen Keller',
    content: [
      'A passing gust of wind carrying the faint aroma of wet garden roses. A stray trace of old sandalwood on a wool scarf. Instantaneously, your chest tightens, and you are immediately transported back to a dusty porch in New Delhi, sitting beside your grandmother fifteen years ago. Your vision hasn’t seen it, your ears didn’t hear it, but your nose has perfectly recreated the past.',
      'This isn’t just nostalgia; it’s hard-coded neuroscience. The human sense of smell is wired far more intimately to the emotional brain centers than any other sensory system. When you look at an object or hear a melody, that message must first travel through a processing relay station named the thalamus before reaching your conscious cortex. However, olfactory inputs bypass this relay completely.',
      'Inhalation sends molecules directly into the olfactory bulb behind the nasal cavity, which connects via a short highway straight to the amygdala (the brain’s emotional center) and the hippocampus (the vault of memory structures). This is why scent cues do not spark logical thoughts—they spark raw feelings first. Visceral joy, warm safety, or sharp longing hits your consciousness before you even rationally identify what materials you are smelling.',
      'This biological connection is why we at Aromaxx formulate perfumes as emotional vessels rather than simple fashion accessories. When we pair Velvet Rose with smooth, warm vanilla and deep white musk, our focus isn’t just pleasing the olfactory receptors; our focus is bottling a feeling of serene warm elegance and security. When you wear active, high-art fragrances, you are actively writing a memory soundtrack for your future.'
    ]
  }
];
