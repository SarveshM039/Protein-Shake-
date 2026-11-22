import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  FlaskConical,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import {
  BATCH_COAS,
  PRODUCTS,
  Product,
  VERIFIED_REVIEWS,
} from '../data/catalog';
import { getEffectivePrice, SubscriptionCadence } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
  onOpenScience: () => void;
  onAddToCart: (params: {
    product: Product;
    variantId: string;
    variantName: string;
    quantity: number;
    isSubscription: boolean;
    cadenceDays: SubscriptionCadence;
  }) => void;
}

type GalleryTab = 'visual' | 'nutrition' | 'coa';

export function ProductDetailView({
  product,
  onBack,
  onSelectProduct,
  onOpenScience,
  onAddToCart,
}: ProductDetailViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [isSubscription, setIsSubscription] = useState(true);
  const [cadenceDays, setCadenceDays] = useState<SubscriptionCadence>(30);
  const [quantity, setQuantity] = useState(1);
  const [galleryTab, setGalleryTab] = useState<GalleryTab>('visual');
  const [openAccordion, setOpenAccordion] = useState<'nutrition' | 'sourcing' | 'prep'>('nutrition');
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Sync variant & state when switching products
  useEffect(() => {
    setSelectedVariantId(product.variants[0].id);
    setQuantity(1);
    setGalleryTab('visual');
  }, [product]);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const oneTimePrice = product.price;
  const subPrice = getEffectivePrice(product.price, true);
  const activeUnitPrice = isSubscription ? subPrice : oneTimePrice;
  const totalPrice = (activeUnitPrice * quantity).toFixed(2);
  const perServingCost = (activeUnitPrice / product.servings).toFixed(2);

  const coa = BATCH_COAS[product.batchCode] || BATCH_COAS['VL-2026-084'];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const productReviews = [
    ...VERIFIED_REVIEWS.filter((r) => r.productId === product.id),
    ...VERIFIED_REVIEWS.filter((r) => r.productId !== product.id),
  ].slice(0, 3);

  const handleAdd = () => {
    onAddToCart({
      product,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      quantity,
      isSubscription,
      cadenceDays,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <main className="pb-24 md:pb-16">
      {/* Breadcrumb Bar */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1B4332] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Formulations</span>
          </button>

          <div className="flex items-center gap-2 text-[13px] text-[#595959]">
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#1A1A1A] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 12-Column Split-Screen PDP (7 cols visual assets vs 5 cols conversion module) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-2 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 7 COLUMNS: Sticky Visual Assets & Apothecary Dossier */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
            {/* Main Stage Container */}
            <div className="rounded-2xl border border-[#E8E5DF] bg-white overflow-hidden shadow-[0_4px_20px_-2px_rgba(27,67,50,0.04)]">
              {galleryTab === 'visual' && (
                <div className="relative aspect-[4/3] bg-[#E8F0EC]">
                  <ResilientImage
                    src={product.image}
                    alt={`${product.name} — ${selectedVariant.name}`}
                    fallbackLabel={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-white/95 backdrop-blur-sm border border-[#E8E5DF] text-[#1B4332] px-3.5 py-1.5 text-[12px] font-semibold">
                      {selectedVariant.servingLabel}
                    </span>
                    <span className="rounded-full bg-[#1B4332] text-white px-3.5 py-1.5 text-[12px] font-semibold tabular-nums">
                      Batch {product.batchCode} Verified
                    </span>
                  </div>
                </div>
              )}

              {galleryTab === 'nutrition' && (
                <div className="p-6 md:p-8 bg-[#FAF9F6] min-h-[380px] md:min-h-[460px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between border-b-2 border-[#1B4332] pb-3">
                      <div>
                        <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F]">
                          Apothecary Manifest
                        </p>
                        <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] mt-0.5">
                          Nutritional Profile
                        </h3>
                      </div>
                      <div className="text-right tabular-nums">
                        <p className="text-xs text-[#595959]">Serving Size</p>
                        <p className="text-sm font-bold text-[#1A1A1A]">
                          {product.nutritionManifest.servingSize}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-[#E8E5DF] tabular-nums">
                      <span className="font-semibold text-[#1A1A1A]">Energy per Serving</span>
                      <span className="font-display text-xl font-extrabold text-[#1B4332]">
                        {product.nutritionManifest.calories} kcal
                      </span>
                    </div>

                    <div className="divide-y divide-[#E8E5DF] mt-1">
                      {product.nutritionManifest.rows.map((row) => (
                        <div
                          key={row.label}
                          className="py-2.5 flex items-center justify-between text-sm tabular-nums"
                        >
                          <span className="text-[#1A1A1A] font-medium">{row.label}</span>
                          <div className="flex items-center gap-6">
                            <span className="font-bold text-[#1B4332]">{row.amount}</span>
                            <span className="text-[#595959] w-10 text-right">{row.dailyValue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#595959] pt-4 border-t border-[#E8E5DF]">
                    Percent Daily Values are based on a 2,000-calorie active diet. Zero artificial gums, soy lecithin, or synthetic sweeteners.
                  </p>
                </div>
              )}

              {galleryTab === 'coa' && (
                <div className="p-6 md:p-8 bg-[#FAF9F6] min-h-[380px] md:min-h-[460px] flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E8E5DF] pb-4">
                      <div>
                        <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F]">
                          Certificate of Analysis
                        </p>
                        <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] mt-0.5 tabular-nums">
                          Batch {coa.batchCode}
                        </h3>
                        <p className="text-xs text-[#595959] mt-1">
                          {coa.labPartner} · Screened {coa.testedDate}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#E8F0EC] text-[#1B4332] px-3.5 py-1.5 text-xs font-bold inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Passed All Screens</span>
                      </span>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-xs text-[#595959] border-b border-[#E8E5DF]">
                            <th className="py-2 font-semibold">Assay Parameter</th>
                            <th className="py-2 font-semibold">Measured</th>
                            <th className="py-2 font-semibold">Safety Spec</th>
                            <th className="py-2 font-semibold text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E5DF] tabular-nums">
                          {coa.metrics.map((m) => (
                            <tr key={m.test}>
                              <td className="py-2.5 font-medium text-[#1A1A1A]">{m.test}</td>
                              <td className="py-2.5 font-bold text-[#1B4332]">{m.result}</td>
                              <td className="py-2.5 text-[#595959]">{m.limit}</td>
                              <td className="py-2.5 text-right font-semibold text-[#2D6A4F]">
                                {m.verdict}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                    <span className="text-xs text-[#595959]">
                      Full multi-lot archive available in Clinical Science
                    </span>
                    <button
                      type="button"
                      onClick={onOpenScience}
                      className="text-xs font-bold text-[#1B4332] underline underline-offset-4 cursor-pointer"
                    >
                      Open Lab Archive
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Visual / Nutrition / COA Switcher Strip */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setGalleryTab('visual')}
                className={`rounded-xl p-3 text-left border transition-all cursor-pointer ${
                  galleryTab === 'visual'
                    ? 'border-[#1B4332] bg-[#E8F0EC] text-[#1B4332]'
                    : 'border-[#E8E5DF] bg-white text-[#595959] hover:border-[#1B4332]/40'
                }`}
              >
                <p className="text-xs font-bold">01. Vessel View</p>
                <p className="text-[11px] opacity-80 mt-0.5 truncate">Studio packaging</p>
              </button>
              <button
                type="button"
                onClick={() => setGalleryTab('nutrition')}
                className={`rounded-xl p-3 text-left border transition-all cursor-pointer ${
                  galleryTab === 'nutrition'
                    ? 'border-[#1B4332] bg-[#E8F0EC] text-[#1B4332]'
                    : 'border-[#E8E5DF] bg-white text-[#595959] hover:border-[#1B4332]/40'
                }`}
              >
                <p className="text-xs font-bold">02. Nutrition Panel</p>
                <p className="text-[11px] opacity-80 mt-0.5 truncate">
                  {product.nutritionManifest.calories} kcal · full macros
                </p>
              </button>
              <button
                type="button"
                onClick={() => setGalleryTab('coa')}
                className={`rounded-xl p-3 text-left border transition-all cursor-pointer ${
                  galleryTab === 'coa'
                    ? 'border-[#1B4332] bg-[#E8F0EC] text-[#1B4332]'
                    : 'border-[#E8E5DF] bg-white text-[#595959] hover:border-[#1B4332]/40'
                }`}
              >
                <p className="text-xs font-bold">03. Lab Purity COA</p>
                <p className="text-[11px] opacity-80 mt-0.5 truncate tabular-nums">
                  Lot {product.batchCode}
                </p>
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Contiguous Conversion & Purchase Module */}
          <div className="lg:col-span-5">
            <div className="veloce-card rounded-2xl p-6 md:p-7">
              {/* Rating & Category Line */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-bold tracking-[0.04em] text-[#2D6A4F]">
                  {product.category}
                </span>
                <a
                  href="#pdp-reviews"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B4332] hover:underline tabular-nums"
                >
                  <Star className="w-3.5 h-3.5 fill-[#1B4332] text-[#1B4332]" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#595959] font-normal">({product.reviewCount} reviews)</span>
                </a>
              </div>

              <h1 className="font-display text-[28px] leading-[34px] md:text-[34px] md:leading-[40px] font-extrabold tracking-[-0.02em] text-[#1A1A1A] mt-2">
                {product.name}
              </h1>

              <p className="text-[15px] leading-[23px] text-[#595959] mt-2.5">
                {product.description}
              </p>

              {/* Attribute Badges (Veloce Spec: #E8F0EC fill, #1B4332 text, label-sm) */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="rounded-full bg-[#E8F0EC] text-[#1B4332] px-3 py-1 text-[11px] font-bold tracking-[0.04em]"
                  >
                    {attr}
                  </span>
                ))}
              </div>

              {/* Variant / Flavor Selector */}
              <div className="mt-6 pt-5 border-t border-[#E8E5DF]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[13px] font-semibold text-[#1A1A1A]">
                    Select Formulation
                  </span>
                  <span className="text-[12px] text-[#595959]">{selectedVariant.servingLabel}</span>
                </div>
                <div className="space-y-2">
                  {product.variants.map((variant) => {
                    const active = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`w-full text-left rounded-xl px-4 py-3 border transition-all cursor-pointer ${
                          active
                            ? 'border-[#1B4332] bg-[#E8F0EC]/70'
                            : 'border-[#E8E5DF] bg-white hover:border-[#1B4332]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[14px] font-semibold text-[#1A1A1A]">
                            {variant.name}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              active
                                ? 'border-[#1B4332] bg-[#1B4332] text-white'
                                : 'border-[#C1C8C2]'
                            }`}
                          >
                            {active && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#595959] mt-0.5">{variant.notes}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual-Panel Subscription Frequency Toggle (Exact Design Spec) */}
              <div className="mt-6 pt-5 border-t border-[#E8E5DF]">
                <span className="text-[13px] font-semibold text-[#1A1A1A] block mb-3">
                  Delivery Frequency
                </span>

                <div className="space-y-3">
                  {/* Subscribe & Save 15% Card */}
                  <div
                    role="radio"
                    aria-checked={isSubscription}
                    tabIndex={0}
                    onClick={() => setIsSubscription(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsSubscription(true);
                      }
                    }}
                    className={`relative rounded-2xl p-4 cursor-pointer transition-all ${
                      isSubscription
                        ? 'border-2 border-[#1B4332] bg-[#E8F0EC]'
                        : 'border border-[#E8E5DF] bg-white hover:border-[#1B4332]/40'
                    }`}
                  >
                    {/* Perched Top-Right Save 15% Badge */}
                    <span className="absolute -top-2.5 right-4 rounded-full bg-[#1B4332] text-[#FFCEC7] px-3 py-0.5 text-[11px] font-bold tracking-[0.04em]">
                      SAVE 15%
                    </span>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSubscription ? 'border-[#1B4332]' : 'border-[#717973]'
                          }`}
                        >
                          {isSubscription && (
                            <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
                          )}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-[#1A1A1A]">
                            Subscribe & Save
                          </p>
                          <p className="text-[12px] text-[#414844] mt-0.5">
                            Pause, skip, or cancel in one click · ${perServingCost} / serving
                          </p>
                        </div>
                      </div>
                      <div className="text-right tabular-nums shrink-0">
                        <p className="text-[17px] font-extrabold text-[#1B4332]">
                          ${subPrice.toFixed(2)}
                        </p>
                        <p className="text-[12px] text-[#595959] line-through">
                          ${oneTimePrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {isSubscription && (
                      <div className="mt-3.5 pt-3 border-t border-[#1B4332]/15 flex items-center justify-between gap-2">
                        <label
                          htmlFor="cadence-select"
                          className="text-[12px] font-semibold text-[#1B4332]"
                        >
                          Deliver every:
                        </label>
                        <div className="flex items-center gap-1.5">
                          {([30, 45, 60] as SubscriptionCadence[]).map((days) => (
                            <button
                              key={days}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCadenceDays(days);
                              }}
                              className={`rounded-full px-3 h-7 text-[12px] font-semibold transition-colors tabular-nums cursor-pointer ${
                                cadenceDays === days
                                  ? 'bg-[#1B4332] text-white'
                                  : 'bg-white text-[#1B4332] border border-[#1B4332]/20 hover:bg-[#FAF9F6]'
                              }`}
                            >
                              {days} days
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* One-Time Purchase Card */}
                  <div
                    role="radio"
                    aria-checked={!isSubscription}
                    tabIndex={0}
                    onClick={() => setIsSubscription(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsSubscription(false);
                      }
                    }}
                    className={`rounded-2xl p-4 cursor-pointer transition-all ${
                      !isSubscription
                        ? 'border-2 border-[#1B4332] bg-[#E8F0EC]'
                        : 'border border-[#E8E5DF] bg-white hover:border-[#1B4332]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            !isSubscription ? 'border-[#1B4332]' : 'border-[#717973]'
                          }`}
                        >
                          {!isSubscription && (
                            <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
                          )}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-[#1A1A1A]">
                            One-Time Purchase
                          </p>
                          <p className="text-[12px] text-[#595959]">
                            Single dispatch · ${(oneTimePrice / product.servings).toFixed(2)} / serving
                          </p>
                        </div>
                      </div>
                      <span className="text-[17px] font-bold text-[#1A1A1A] tabular-nums">
                        ${oneTimePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Adjuster + Conversion Coral Primary CTA */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  aria-label="Quantity selector"
                  className="rounded-full bg-[#FAF9F6] border border-[#E8E5DF] h-12 px-1.5 inline-flex items-center gap-1 shrink-0"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#E8F0EC] transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-7 text-center text-[15px] font-bold text-[#1A1A1A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                    aria-label="Increase quantity"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#E8F0EC] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 rounded-full h-12 px-6 text-[15px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A47] focus-visible:ring-offset-2 ${
                    addedFeedback ? 'bg-[#1B4332] text-white' : 'cta-coral'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span className="opacity-70" aria-hidden="true">—</span>
                      <span className="tabular-nums">${totalPrice}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subtle Trust Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#595959]">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1B4332]" />
                  Free express shipping over $75
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                  30-day empty-canister guarantee
                </span>
              </div>

              {/* Accordions: Clinical Summary, Sourcing, Prep */}
              <div className="mt-6 pt-4 border-t border-[#E8E5DF] divide-y divide-[#E8E5DF]">
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'nutrition' ? 'sourcing' : 'nutrition')
                    }
                    className="w-full py-3.5 flex items-center justify-between text-left text-[14px] font-bold text-[#1A1A1A] cursor-pointer"
                  >
                    <span>Clinical Validation & Efficacy</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#595959] transition-transform ${
                        openAccordion === 'nutrition' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'nutrition' && (
                    <p className="pb-4 text-[14px] leading-[22px] text-[#595959]">
                      {product.clinicalSummary}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'sourcing' ? 'prep' : 'sourcing')
                    }
                    className="w-full py-3.5 flex items-center justify-between text-left text-[14px] font-bold text-[#1A1A1A] cursor-pointer"
                  >
                    <span>Botanical Sourcing & Extraction</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#595959] transition-transform ${
                        openAccordion === 'sourcing' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'sourcing' && (
                    <p className="pb-4 text-[14px] leading-[22px] text-[#595959]">
                      {product.sourcingNote}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'prep' ? 'nutrition' : 'prep')
                    }
                    className="w-full py-3.5 flex items-center justify-between text-left text-[14px] font-bold text-[#1A1A1A] cursor-pointer"
                  >
                    <span>Preparation Protocol</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#595959] transition-transform ${
                        openAccordion === 'prep' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'prep' && (
                    <ol className="pb-4 space-y-2 text-[14px] leading-[21px] text-[#595959] list-decimal pl-5">
                      {product.preparationSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews & Complementary Stack */}
      <section
        id="pdp-reviews"
        className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-14 border-t border-[#E8E5DF]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Verified Athlete Notes
            </h2>
            <p className="text-[15px] text-[#595959] mt-1">
              Real training outcomes from recurring subscribers.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenScience}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] cursor-pointer"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Inspect Lot {product.batchCode} Lab Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productReviews.map((review) => (
            <article key={review.id} className="veloce-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#1B4332] text-[#1B4332]" />
                    ))}
                  </div>
                  <span className="rounded-full bg-[#E8F0EC] text-[#1B4332] px-2.5 py-0.5 text-[11px] font-bold">
                    Verified Buyer
                  </span>
                </div>
                <p className="text-[15px] leading-[24px] text-[#1A1A1A]">“{review.quote}”</p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E5DF]">
                <p className="font-display text-sm font-bold text-[#1A1A1A]">{review.author}</p>
                <p className="text-xs text-[#595959] mt-0.5">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pair With (Complementary Stack) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-10 pb-8 border-t border-[#E8E5DF]">
        <h2 className="font-display text-[22px] md:text-[26px] font-bold tracking-[-0.01em] text-[#1A1A1A] mb-6">
          Complete Your Protocol
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <button
              key={rel.id}
              type="button"
              onClick={() => onSelectProduct(rel.id)}
              className="veloce-card veloce-card-interactive rounded-2xl p-4 text-left flex items-center gap-4 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-xl bg-[#E8F0EC] overflow-hidden shrink-0">
                <ResilientImage
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold tracking-[0.04em] text-[#2D6A4F]">
                  {rel.category}
                </p>
                <p className="font-display text-[16px] font-bold text-[#1A1A1A] truncate mt-0.5">
                  {rel.name}
                </p>
                <p className="text-[14px] font-bold text-[#1B4332] tabular-nums mt-1">
                  ${rel.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mobile Sticky Bottom Conversion Dock (<768px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8E5DF] px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(27,67,50,0.08)]">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#1B4332] truncate">
            {isSubscription ? `Subscribe (${cadenceDays}d) · Save 15%` : 'One-Time Purchase'}
          </p>
          <p className="font-display text-[18px] font-extrabold text-[#1A1A1A] tabular-nums">
            ${totalPrice}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="cta-coral rounded-full h-11 px-6 text-[14px] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
        >
          {addedFeedback ? 'Added to Bag' : 'Add to Bag'}
        </button>
      </div>
    </main>
  );
}
