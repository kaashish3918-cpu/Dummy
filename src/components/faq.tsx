```tsx
import React from "react";

const faqs = [
  {
    question: "What types of perfumes are available at Aromaxx?",
    answer:
      "Aromaxx offers a curated collection of luxury fragrances with fresh, floral, woody, spicy, oriental and aquatic scent profiles to suit different personalities and occasions."
  },
  {
    question: "How can I choose the right perfume for myself?",
    answer:
      "You can choose a perfume based on your favourite fragrance notes, personality, mood and occasion. Explore different scent profiles to find a fragrance that feels like your signature scent."
  },
  {
    question: "How long does an Aromaxx perfume last?",
    answer:
      "Perfume longevity can vary depending on the fragrance composition, skin type, application and environment. Different scent profiles and formulations may have different lasting performance."
  },
  {
    question: "Can I wear Aromaxx perfumes every day?",
    answer:
      "Yes. You can choose a fragrance according to your personal preference and the occasion. Fresh and lighter fragrances can be suitable for everyday use, while richer scents may be preferred for special occasions."
  },
  {
    question: "How should I store my perfume?",
    answer:
      "Store your perfume in a cool and dry place away from direct sunlight, excessive heat and humidity to help preserve its fragrance quality."
  },
  {
    question: "How do I choose a perfume for a special occasion?",
    answer:
      "Consider the occasion, season and your preferred scent style. Fresh and light fragrances may suit daytime occasions, while deeper woody, spicy or oriental scents can complement evening and special occasions."
  },
  {
    question: "What are fragrance notes in a perfume?",
    answer:
      "Fragrance notes are the different scent layers that develop over time. A perfume may have opening notes, heart notes and base notes that combine to create its overall fragrance experience."
  },
  {
    question: "Can I explore different fragrance collections on Aromaxx?",
    answer:
      "Yes. Aromaxx allows you to explore different fragrance styles and discover perfumes based on your scent preferences and personal taste."
  }
];

const FAQ: React.FC = () => {
  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
          Frequently Asked Questions
        </span>

        <h2 className="font-serif-lux text-3xl sm:text-4xl text-white mt-4">
          Everything You Need to Know
        </h2>

        <p className="text-white/60 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Explore common questions about Aromaxx fragrances and find the
          information you need to discover your perfect signature scent.
        </p>
      </div>

      {/* FAQ Questions */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-[#161616] border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-[#d4af37]/40"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-white font-semibold text-sm sm:text-base">
              <span>{faq.question}</span>

              <span className="text-[#d4af37] text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="text-white/60 text-sm leading-relaxed mt-4 pr-6">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
```
