/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health probe
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Luxury Olfactory Curation powered by Gemini or elegant fallback
app.post('/api/curation', async (req, res) => {
  const { preferredType, personalityVibe, idealDay, intensity, customRequest } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyPresent = !!apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0;

  if (isKeyPresent) {
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `
        You are the Head Master Perfumer and Scent Curator at Aromaxx, a world-class luxury fragrance house.
        We have received an olfactory questionnaire from a client looking for their signature fragrance.
        Here are their details:
        - Scent Family Preference: ${preferredType || 'Any'}
        - Desired Personality Vibe: ${personalityVibe || 'Elegance & Memory'}
        - Ideal Day Scenario: ${idealDay || 'A tranquil moment'}
        - Desired Strength/Intensity: ${intensity || 'Medium'}
        - Custom Request / Memory Trigger: ${customRequest || 'None'}

        We have five exquisite signature perfume formulations:
        1. "Velvet Rose Eau de Parfum" (Floral - Key Notes: Turkish Rose, Peony, Vanilla, Musk). Romantic, soft, velvety, and sweet.
        2. "Midnight Oud Intense" (Woody Oriental - Key Notes: Rare Oud Wood, Amber, Sandalwood, exotic spices). Deep, dark, dramatic, and evening-ready.
        3. "Citrus Bloom Fresh Mist" (Citrus Fresh - Key Notes: Amalfi Lemon, Orange Blossom, Green Tea). Energetic, bright, wellness-oriented, and sparkling.
        4. "Amber Noir Signature" (Oriental - Key Notes: Sweet Amber, Patchouli, Scent-free Musk, Tonka Bean). Bold, magnetic, unisex, and confident.
        5. "Ocean Breeze Homme" (Aquatic - Key Notes: Sea Salt, mineral Bergamot, Driftwood). Cold, masculine, fresh, free-spirited, and crisp.

        Analyze their input and select the single BEST fit or a top ranking blend of Aromaxx fragrances.
        Return your analysis as a structured JSON object. Use the following JSON schema strictly:
        {
          "recommendedPerfume": "The precise name of the fragrance recommended matching one of our 5",
          "matchScore": "An integer percentage, e.g. 96",
          "intro": "A highly luxurious, artistic, poetic welcome addressing the client's vibe",
          "whyItFits": "A masterly perfumer explanation of how their vibe and ideal day align with the scent's chemical notes and atmosphere",
          "olfactoryJourney": "A rich, evocative, 3-sentence poetic story detailing what happens when they apply the perfume (Top, Heart, and Base note transition)",
          "perfumerTip": "A bespoke recommendation on application technique, storage, or hydration to maximize their specific scent's performance."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPerfume: { type: Type.STRING },
              matchScore: { type: Type.INTEGER },
              intro: { type: Type.STRING },
              whyItFits: { type: Type.STRING },
              olfactoryJourney: { type: Type.STRING },
              perfumerTip: { type: Type.STRING }
            },
            required: ['recommendedPerfume', 'matchScore', 'intro', 'whyItFits', 'olfactoryJourney', 'perfumerTip']
          }
        }
      });

      if (response && response.text) {
        const result = JSON.parse(response.text.trim());
        return res.json({ success: true, method: 'gemini', data: result });
      }
    } catch (error) {
      console.error('Gemini call failed, utilizing luxury fallback mechanism:', error);
      // Fall through to the beautiful fallback
    }
  }

  // --- REVERSED POETIC FALLBACK FOR SYSTEM ROBUSTNESS ---
  let recommendedPerfume = 'Velvet Rose Eau de Parfum';
  let matchScore = 95;
  let intro = `Greetings, seeker of olfactory wonders. We have attuned our instruments to your soul's blueprint to discover your bespoke Aromaxx formulation.`;
  let whyItFits = `Your aura radiates warmth and delicate grace. The romantic florals reflect your elegant nature.`;
  let olfactoryJourney = `It starts with a sparkling tease of fresh dew. Gradually, absolute rose sweeps in like velvet poetry. The finale is a sweet, musk-scented hush.`;
  let perfumerTip = `Apply directly onto warm pulse points. Avoid friction, letting the story breathe.`;

  // Select based on preferredType or personalityVibe
  const query = `${preferredType} ${personalityVibe} ${idealDay} ${customRequest}`.toLowerCase();

  if (query.includes('wood') || query.includes('oud') || query.includes('mysterious') || query.includes('evening') || query.includes('night') || query.includes('dark')) {
    recommendedPerfume = 'Midnight Oud Intense';
    matchScore = 98;
    whyItFits = `The deep notes of Agarwood (Oud) and charred Sandalwood resonate with your desire for evening luxury and quiet authority.`;
    olfactoryJourney = `A fleeting whisper of exotic saffron opens the portal. Soon, a dark heart of precious, rich cambodian oud asserts its crown. It settles to rest on hot resins.`;
    perfumerTip = `Spritz lightly at the base of your neck and back of hair. Wood fibers hold this dense molecule for days.`;
  } else if (query.includes('citrus') || query.includes('fresh') || query.includes('tea') || query.includes('morning') || query.includes('day') || query.includes('bright') || query.includes('energy')) {
    recommendedPerfume = 'Citrus Bloom Fresh Mist';
    matchScore = 92;
    whyItFits = `Your vibrant morning energy perfectly mirrors the sparkling, crisp zest of sun-ripened lemons and soothing tea leaves.`;
    olfactoryJourney = `A sudden splash of cold-pressed Amalfi lemon wakes the eyes. Then, quiet orange blossoms simmer in a cup of steaming green tea. Settle in clean comfort.`;
    perfumerTip = `Perfect after bathing. Layer it after a cold splash to seal the water-bonding freshness.`;
  } else if (query.includes('ocean') || query.includes('aquatic') || query.includes('breeze') || query.includes('sea') || query.includes('salt') || query.includes('masculine') || query.includes('sport')) {
    recommendedPerfume = 'Ocean Breeze Homme';
    matchScore = 94;
    whyItFits = `You seek everlasting freedom and the wild, bracing pull of the open ocean. Driftwood and ozone are your kindred spirits.`;
    olfactoryJourney = `A sharp, mineral wave of cold marine mist crashes down. Wild mountain rosemary surfaces in the mid-spray. Finally, raw sun-bleached wood tells of long sea voyages.`;
    perfumerTip = `Excellent for spraying onto cotton lining or collar folds to release crisp mineral ripples with every motion.`;
  } else if (query.includes('amber') || query.includes('oriental') || query.includes('bold') || query.includes('patchouli') || query.includes('unisex') || query.includes('confidence')) {
    recommendedPerfume = 'Amber Noir Signature';
    matchScore = 96;
    whyItFits = `You emit an elegant, solid confidence that is magnetic yet self-contained. The dark amber and warm tonka bean represent absolute authority.`;
    olfactoryJourney = `A rich resinous gold warmth flares instantly. Indonesian patchouli weaves a dry, sophisticated tapestry through the core. It leaves a long, sweet-balsamic tone.`;
    perfumerTip = `Apply in a classic dual-spray sequence: collarbone and wrists. Let its medium sillage follow you like a velvet shadow.`;
  }

  return res.json({
    success: true,
    method: 'fallback',
    data: {
      recommendedPerfume,
      matchScore,
      intro,
      whyItFits,
      olfactoryJourney,
      perfumerTip
    }
  });
});

// Serve frontend build files using Vite/Express dual-mode
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted (Development Mode)');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets from dist folder');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Aromaxx App] Server active and reachable on port: ${PORT}`);
  });
}

start();
