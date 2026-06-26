/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, ShoppingBag, CheckCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface ScentFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, engraving?: string) => void;
}

interface CurationResponse {
  recommendedPerfume: string;
  matchScore: number;
  intro: string;
  whyItFits: string;
  olfactoryJourney: string;
  perfumerTip: string;
}

export default function ScentFinder({ isOpen, onClose, onAddToCart }: ScentFinderProps) {
  const [step, setStep] = useState<number>(1);
  const [preferredType, setPreferredType] = useState<string>('');
  const [personalityVibe, setPersonalityVibe] = useState<string>('');
  const [idealDay, setIdealDay] = useState<string>('');
  const [intensity, setIntensity] = useState<string>('Medium');
  const [customRequest, setCustomRequest] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('Calibrating absolute extracts...');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CurationResponse | null>(null);
  const [addedConfirm, setAddedConfirm] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalSteps = 4;

  const scentTypes = [
    { value: 'Floral', label: 'Floral', desc: 'Soft Turkish rose, fresh pink peonies, warm comforting vanilla' },
    { value: 'Woody Oriental', label: 'Woody Oriental', desc: 'Precious Cambodian agarwood (oud), dark dry spices, sandalwood' },
    { value: 'Citrus Fresh', label: 'Citrus Fresh', desc: 'Bright sun-ripened Amalfi lemons, orange blossoms, crisp green tea' },
    { value: 'Oriental', label: 'Oriental Amber', desc: 'Deep sweet amber resins, toasted patchouli, comforting tonka' },
    { value: 'Aquatic', label: 'Aquatic Mineral', desc: 'Cold marine ocean mist, mineral-salted seaweed, washed driftwood' },
    { value: 'Any', label: 'I wish to explore all paths', desc: 'Open-minded selection guided purely by spirit and vibe' }
  ];

  const vibes = [
    { value: 'Mysterious', label: 'Mysteriously Elegant & Introspective', tag: 'Midnight drama' },
    { value: 'Bold', label: 'Boldly Confident, Magnetic & Decisive', tag: 'Absolute power' },
    { value: 'Romantic', label: 'Romantic, Delicate & Soft-spoken', tag: 'Poetic grace' },
    { value: 'Energetic', label: 'Radiantly Active, Fresh & Focused', tag: 'Golden sun rays' },
    { value: 'Natural', label: 'Grounded, Organic & Ocean-loving', tag: 'Earth & wind' }
  ];

  const scenes = [
    { value: 'Mist', label: 'Venture through a misty, dark agarwood forest under a midnight moon' },
    { value: 'Orchard', label: 'Recline under a wild Sicilian citrus orchard with golden sun heating the peel' },
    { value: 'Gala', label: 'Enter a high-ceilinged palace gala wearing tailored silks and heavy cashmere' },
    { value: 'Roses', label: 'Read on a marble balcony in spring, draft lines of letters surrounded by fresh peonies' },
    { value: 'Ocean', label: 'Stand on a towering seaside cliff, inhaling salt-crusted maritime winds and spray' }
  ];

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      triggerCuration();
    }
  };

  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const triggerCuration = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Cycle through luxurious phrases for aesthetic immersion
    const phases = [
      'Calibrating absolute floral extracts...',
      'Mapping skin pH thermal indicators...',
      'Melt-mixing wood oils and spice notes...',
      'Synthesizing sillage and diffusion coefficients...',
      'Aromaxx Master Perfumer is drafting your custom formula...'
    ];

    let phaseIndex = 0;
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setLoadingPhase(phases[phaseIndex]);
    }, 1200);

    try {
      const response = await fetch('/api/curation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferredType,
          personalityVibe,
          idealDay,
          intensity,
          customRequest,
        })
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setResult(resJson.data);
      } else {
        throw new Error('Unsuccessful curation computation.');
      }
    } catch (err) {
      console.error(err);
      setError('The blending process encountered a delicate error. Please try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleRecommendAddToCart = () => {
    if (!result) return;
    // Find matching product in our static array
    const foundProduct = products.find(p => p.name.toLowerCase().includes(result.recommendedPerfume.toLowerCase()) || result.recommendedPerfume.toLowerCase().includes(p.name.toLowerCase()));
    
    if (foundProduct) {
      onAddToCart(foundProduct, '100ml', 'Bespoke Blend');
      setAddedConfirm(true);
      setTimeout(() => setAddedConfirm(false), 3000);
    }
  };

  const resetForm = () => {
    setPreferredType('');
    setPersonalityVibe('');
    setIdealDay('');
    setIntensity('Medium');
    setCustomRequest('');
    setStep(1);
    setResult(null);
    setError(null);
  };

  return (
    <div id="scent-finder-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div id="scent-finder-container" className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gold-300 bg-luxury-cream shadow-2xl transition-all max-h-[90vh] flex flex-col md:max-h-[85vh]">
        
        {/* Golden Editorial Header */}
        <div id="scent-finder-header" className="flex items-center justify-between border-b border-gold-200/50 bg-linear-to-b from-gold-50/50 to-transparent p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-600 animate-pulse" />
            <span className="font-serif-lux text-xl sm:text-2xl font-medium tracking-widest text-luxury-black">
              SIGNATURE SCENT ASSISTANT
            </span>
          </div>
          <button 
            id="scent-finder-close-btn"
            onClick={onClose} 
            className="rounded-full p-1 text-luxury-black/50 hover:bg-gold-100 hover:text-luxury-black transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Curation body wrapper */}
        <div id="scent-finder-body" className="flex-1 overflow-y-auto p-5 sm:p-8">
          
          {/* Loading Aura State */}
          {loading && (
            <div id="scent-finder-loading" className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-gold-200/40" />
                <div className="absolute inset-0 rounded-full border-4 border-t-gold-600 animate-spin" />
                <Sparkles className="h-8 w-8 text-gold-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="font-serif-lux text-lg tracking-widest uppercase font-medium text-gold-800 animate-pulse">
                  {loadingPhase}
                </p>
                <p className="text-xs text-luxury-black/45 italic">
                  Aromaxx algorithms are identifying elements of emotional resonance...
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {!loading && error && (
            <div id="scent-finder-error" className="rounded-xl bg-rose-50 border border-rose-200 p-5 text-center text-rose-800 space-y-4 my-8">
              <AlertCircle className="h-10 w-10 mx-auto text-rose-500" />
              <p className="font-medium">{error}</p>
              <button 
                id="scent-finder-retry-btn"
                onClick={triggerCuration} 
                className="rounded-full bg-rose-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-700 transition"
              >
                Re-attempt Distillation
              </button>
            </div>
          )}

          {/* Results Block (Scent Curation Display) */}
          {!loading && !error && result && (
            <div id="scent-finder-results" className="space-y-6 animate-fade-in py-2">
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
                  Your Bespoke Recommendation
                </span>
                <h3 className="font-serif-lux text-2xl sm:text-3xl font-semibold text-luxury-black">
                  {result.recommendedPerfume}
                </h3>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800 mt-2">
                  <Sparkles className="h-3 w-3 text-gold-600" />
                  {result.matchScore}% Resonance Match
                </div>
              </div>

              <div className="rounded-xl border border-gold-200 bg-gold-50/30 p-5 space-y-4">
                <blockquote className="font-serif-lux text-[15px] sm:text-lg italic text-luxury-black/90 border-l-2 border-gold-400 pl-4 leading-relaxed">
                  "{result.intro}"
                </blockquote>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold-700">
                    Why This Scent Speaks For You:
                  </h4>
                  <p className="text-sm leading-relaxed text-luxury-black/80">
                    {result.whyItFits}
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-gold-200/30 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold-700">
                    The Scent Journey Over Time:
                  </h4>
                  <p className="text-sm leading-relaxed text-luxury-black/80">
                    {result.olfactoryJourney}
                  </p>
                </div>

                <div className="rounded-lg bg-white/70 border border-gold-100 p-4.5 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gold-600 block">
                    Perfumer's Application Note
                  </span>
                  <p className="text-xs italic text-luxury-black/75">
                    {result.perfumerTip}
                  </p>
                </div>
              </div>

              {/* Recommendation Action bar */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                <button
                  id="scent-finder-add-recommend-btn"
                  onClick={handleRecommendAddToCart}
                  disabled={addedConfirm}
                  className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer ${
                    addedConfirm 
                      ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' 
                      : 'bg-gold-700 shadow-gold-100 hover:bg-gold-800 hover:-translate-y-0.5'
                  }`}
                >
                  {addedConfirm ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Added standard bottle to cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart ($99.00 / 100ml)
                    </>
                  )}
                </button>
                <button
                  id="scent-finder-refine-btn"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 rounded-full border border-gold-300 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-gold-800 hover:border-gold-500 hover:bg-gold-50 transition w-full sm:w-auto cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Begin New Ritual
                </button>
              </div>
            </div>
          )}

          {/* Questionnaire Steps pages */}
          {!loading && !result && !error && (
            <div id="scent-finder-form" className="space-y-6">
              
              {/* Progress Bar indicator */}
              <div id="scent-finder-progress-container" className="flex items-center justify-between text-xs font-medium text-luxury-black/45 pb-2">
                <span>Vibe Calibration Phase {step} of {totalSteps}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <span 
                      key={s} 
                      className={`h-1.5 w-6 rounded-xs transition-colors duration-300 ${
                        s <= step ? 'bg-gold-600' : 'bg-gold-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1: Scent Profile */}
              {step === 1 && (
                <div id="scent-finder-step1" className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-serif-lux text-xl sm:text-2xl font-medium text-luxury-black">
                      Which scent families resonate with your instinct?
                    </h3>
                    <p className="text-xs text-luxury-black/55">
                      Select a preferred focus or surrender your senses to explore all formulations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {scentTypes.map((item) => (
                      <button
                        key={item.value}
                        id={`scent-family-select-${item.value.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setPreferredType(item.value)}
                        className={`flex flex-col items-left text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          preferredType === item.value
                            ? 'border-gold-700 bg-gold-200/20 shadow-xs'
                            : 'border-gold-200/50 bg-white hover:border-gold-400'
                        }`}
                      >
                        <span className="text-sm font-semibold tracking-wide text-luxury-black flex items-center gap-1.5">
                          {preferredType === item.value && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                          )}
                          {item.label}
                        </span>
                        <span className="text-[11px] text-luxury-black/60 font-light mt-1 leading-relaxed">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Personality Vibe */}
              {step === 2 && (
                <div id="scent-finder-step2" className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-serif-lux text-xl sm:text-2xl font-medium text-luxury-black">
                      How would your presence fill a room?
                    </h3>
                    <p className="text-xs text-luxury-black/55">
                      Select the energetic imprint you wish to project with your luxury scent.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {vibes.map((vibe) => (
                      <button
                        key={vibe.value}
                        id={`scent-vibe-select-${vibe.value.toLowerCase()}`}
                        onClick={() => setPersonalityVibe(vibe.value)}
                        className={`flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          personalityVibe === vibe.value
                            ? 'border-gold-700 bg-gold-200/20 shadow-xs'
                            : 'border-gold-200/50 bg-white hover:border-gold-400'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-luxury-black block">
                            {vibe.label}
                          </span>
                          <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">
                            {vibe.tag}
                          </span>
                        </div>
                        <span className="h-4 w-4 rounded-full border border-gold-300 flex items-center justify-center shrink-0">
                          {personalityVibe === vibe.value && (
                            <span className="h-2 w-2 rounded-full bg-gold-600" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Ideal Sanctuary Scene */}
              {step === 3 && (
                <div id="scent-finder-step3" className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-serif-lux text-xl sm:text-2xl font-medium text-luxury-black">
                      Where does your mind escape to seek tranquility?
                    </h3>
                    <p className="text-xs text-luxury-black/55">
                      Immerse your mind in these luxurious landscapes and select your natural haven.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {scenes.map((scene) => (
                      <button
                        key={scene.value}
                        id={`scent-scene-select-${scene.value.toLowerCase()}`}
                        onClick={() => setIdealDay(scene.value)}
                        className={`flex items-start gap-4 w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          idealDay === scene.value
                            ? 'border-gold-700 bg-gold-200/20 shadow-xs'
                            : 'border-gold-200/50 bg-white hover:border-gold-400'
                        }`}
                      >
                        <span className="h-4.5 w-4.5 rounded-full border border-gold-300 mt-0.5 flex items-center justify-center shrink-0">
                          {idealDay === scene.value && (
                            <span className="h-2.5 w-2.5 rounded-full bg-gold-600" />
                          )}
                        </span>
                        <p className="text-sm text-luxury-black/90 leading-relaxed font-medium">
                          {scene.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Intimacy Strength & Custom Memories */}
              {step === 4 && (
                <div id="scent-finder-step4" className="space-y-5 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-serif-lux text-xl sm:text-2xl font-medium text-luxury-black">
                      Specify sillage levels and intimate memories
                    </h3>
                    <p className="text-xs text-luxury-black/55">
                      Fine-tune your output strength and define any physical memories that comfort you.
                    </p>
                  </div>

                  {/* Sillage choice */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block">
                      Preferred Scent Projection (Sillage)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {['Intimate Whisper', 'Medium Trace', 'Bold Statement'].map((strength) => (
                        <button
                          key={strength}
                          id={`sillage-strength-btn-${strength.toLowerCase().replace(/\s+/g, '-')}`}
                          type="button"
                          onClick={() => setIntensity(strength)}
                          className={`py-2.5 px-2 rounded-lg border text-center text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                            intensity === strength
                              ? 'border-gold-700 bg-gold-600 text-white'
                              : 'border-gold-200 bg-white text-luxury-black/60 hover:border-gold-400 hover:text-luxury-black'
                          }`}
                        >
                          {strength}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Memory Box */}
                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="custom-memories-area" className="text-xs font-bold uppercase tracking-widest text-gold-700 block">
                      Fragrance Memories, Notes or Secret Whispers (Optional)
                    </label>
                    <textarea
                      id="custom-memories-area"
                      rows={3}
                      value={customRequest}
                      onChange={(e) => setCustomRequest(e.target.value)}
                      placeholder="e.g. 'I dream of Indian rain meeting fresh moss', 'I must have a trace of Bulgarian rose oil', 'Sailing deep around ocean spray...'"
                      className="w-full rounded-xl border border-gold-200 bg-white p-4 text-sm text-luxury-black placeholder:text-luxury-black/35 focus:border-gold-600 focus:outline-hidden leading-relaxed resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div id="scent-finder-navigation" className="flex items-center justify-between border-t border-gold-200/30 pt-5 mt-4">
                <button
                  id="scent-finder-back-btn"
                  onClick={handleBackStep}
                  disabled={step === 1}
                  className={`text-xs font-bold tracking-widest uppercase transition cursor-pointer ${
                    step === 1 
                      ? 'text-luxury-black/20 pointer-events-none' 
                      : 'text-luxury-black/60 hover:text-luxury-black'
                  }`}
                >
                  ← Back
                </button>

                <button
                  id="scent-finder-next-btn"
                  onClick={handleNextStep}
                  disabled={(step === 1 && !preferredType) || (step === 2 && !personalityVibe) || (step === 3 && !idealDay)}
                  className={`flex items-center gap-1.5 rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase text-white transition-all shadow-md cursor-pointer ${
                    ((step === 1 && !preferredType) || (step === 2 && !personalityVibe) || (step === 3 && !idealDay))
                      ? 'bg-gold-200 text-luxury-black/30 pointer-events-none shadow-none'
                      : 'bg-gold-700 hover:bg-gold-800 hover:-translate-y-0.5'
                  }`}
                >
                  {step === totalSteps ? (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      Deconstruct Essence
                    </>
                  ) : (
                    <>
                      Continue →
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
