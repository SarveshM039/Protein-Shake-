import { useState } from 'react';
import { ArrowRight, Check, FlaskConical, ShieldCheck, Star } from 'lucide-react';
import {
  HERO_IMAGE,
  PRODUCTS,
  Product,
  ProductCategory,
  VERIFIED_REVIEWS,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
  onOpenScience: () => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Protein',
  'Hydration',
  'Recovery',
  'Daily Greens',
];

export function HomeView({
  onSelectProduct,
  onQuickAdd,
  onOpenScience,
}: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleQuickAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1300);
  };

  return (
    <main>
      {/* 1. Editorial Split Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-[13px] font-semibold tracking-[0.04em] text-[#2D6A4F] mb-4">
              Botanical Performance Apothecary
            </p>
            <h1 className="font-display text-[36px] leading-[44px] md:text-[52px] md:leading-[60px] lg:text-[56px] lg:leading-[64px] font-extrabold tracking-[-0.03em] text-[#1A1A1A] text-balance max-w-[15ch]">
              Clean kinetic fuel for relentless output.
            </h1>
            <p className="mt-5 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#595959] max-w-[50ch]">
              Cold-extracted plant proteins, precision mineral hydration, and standardized adaptogens. Every batch third-party screened for purity and dosed at clinical thresholds.
            </p>

            {/* Primary & Secondary Action Pair */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onSelectProduct('kinetic-plant-protein')}
                className="cta-coral rounded-full px-7 h-12 text-[15px] font-semibold tracking-[0.01em] inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A47] focus-visible:ring-offset-2"
              >
                <span>Shop Kinetic Protein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenScience}
                className="rounded-full px-6 h-12 text-[15px] font-semibold text-[#1B4332] border-[1.5px] border-[#1B4332] bg-transparent hover:bg-[#E8F0EC] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-2"
              >
                Explore Clinical Data
              </button>
            </div>

            {/* Quiet Unboxed Spec Strip */}
            <div className="mt-10 pt-6 border-t border-[#E8E5DF] flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-[#414844]">
              <span className="tabular-nums">30g Plant Protein</span>
              <span className="text-[#C1C8C2]" aria-hidden="true">·</span>
              <span className="tabular-nums">0g Added Sugar</span>
              <span className="text-[#C1C8C2]" aria-hidden="true">·</span>
              <span>NSF Certified for Sport</span>
            </div>
          </div>

          {/* Right Full-Height Studio Media Anchor */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[340px] md:min-h-[440px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-[#E8E5DF] bg-[#E8F0EC]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Veloce matte forest-green plant protein canister and frosted glass shaker bottle on travertine stone"
                fallbackLabel="Veloce Kinetic Plant Protein"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#012D1D]/85 via-[#012D1D]/35 to-transparent p-6 md:p-7 text-white flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.04em] text-[#C1ECD4]">
                    Flagship Formulation · Batch VL-2026-084
                  </p>
                  <p className="font-display text-lg md:text-xl font-bold tracking-[-0.01em] mt-1">
                    Kinetic Plant Protein — Madagascar Vanilla
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProduct('kinetic-plant-protein')}
                  className="rounded-full bg-white text-[#1B4332] hover:bg-[#E8F0EC] px-4 h-10 text-xs font-bold tracking-[0.02em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inspect Formula
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Clinical Validation Row below Hero Split */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-[#E8E5DF]">
          <div>
            <p className="font-display text-2xl md:text-[28px] font-bold text-[#1B4332] tabular-nums tracking-[-0.02em]">
              +24%
            </p>
            <p className="text-[13px] text-[#595959] mt-1">
              48-hour recovery readiness in 8-week athlete trial (n = 128)
            </p>
          </div>
          <div>
            <p className="font-display text-2xl md:text-[28px] font-bold text-[#1B4332] tabular-nums tracking-[-0.02em]">
              98.4%
            </p>
            <p className="text-[13px] text-[#595959] mt-1">
              Cold-extracted protein digestibility score without gums
            </p>
          </div>
          <div>
            <p className="font-display text-2xl md:text-[28px] font-bold text-[#1B4332] tabular-nums tracking-[-0.02em]">
              100%
            </p>
            <p className="text-[13px] text-[#595959] mt-1">
              Every production batch publicly verified via Eurofins COA
            </p>
          </div>
          <div>
            <p className="font-display text-2xl md:text-[28px] font-bold text-[#1B4332] tabular-nums tracking-[-0.02em]">
              4.9 / 5
            </p>
            <p className="text-[13px] text-[#595959] mt-1">
              Verified athlete rating across 1,533 published reviews
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection Grid */}
      <section
        id="collection"
        className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 border-t border-[#E8E5DF]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Daily Formulations
            </h2>
            <p className="text-[16px] text-[#595959] mt-2 max-w-[54ch]">
              Precision botanical blends engineered around training windows—from pre-session vasodilation to overnight nervous-system recovery.
            </p>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 h-10 text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] ${
                    active
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-[#E8F0EC] text-[#1B4332] hover:bg-[#D5E4DC]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="veloce-card veloce-card-interactive rounded-2xl p-4 flex flex-col cursor-pointer group"
              >
                {/* Inset Soft Sage Stage (#E8F0EC) */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E8F0EC] mb-5">
                  <ResilientImage
                    src={product.image}
                    alt={product.name}
                    fallbackLabel={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {product.featuredTag && (
                    <span className="absolute top-3 left-3 rounded-full bg-[#1B4332] text-white px-3 py-1 text-[11px] font-bold tracking-[0.04em]">
                      {product.featuredTag}
                    </span>
                  )}
                </div>

                {/* Card Copy */}
                <div className="flex flex-col flex-1 px-1">
                  <div className="flex items-center justify-between gap-2 text-[12px] text-[#595959] font-medium">
                    <span>{product.category}</span>
                    <span className="inline-flex items-center gap-1 text-[#1B4332] font-semibold tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-[#1B4332] text-[#1B4332]" />
                      {product.rating.toFixed(1)} ({product.reviewCount})
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-[#1A1A1A] group-hover:text-[#1B4332] transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-sans text-[17px] font-bold text-[#1A1A1A] tabular-nums shrink-0">
                      ${product.price}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[14px] leading-[20px] text-[#595959] line-clamp-2">
                    {product.subtitle}
                  </p>

                  {/* Nutrient Micro-Strip */}
                  <div className="mt-4 pt-3.5 border-t border-[#E8E5DF] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold tracking-[0.04em] text-[#1B4332] tabular-nums">
                    {product.macroHighlights.map((macro, index) => (
                      <span key={macro} className="inline-flex items-center gap-2.5">
                        <span>{macro}</span>
                        {index < product.macroHighlights.length - 1 && (
                          <span className="text-[#C1C8C2]" aria-hidden="true">/</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Integrated Bottom Primary CTA */}
                  <div className="mt-5 pt-1 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddClick(e, product)}
                      className={`flex-1 rounded-full h-11 px-5 text-[14px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A47] focus-visible:ring-offset-2 ${
                        isAdded
                          ? 'bg-[#1B4332] text-white transition-colors'
                          : 'cta-coral'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Bag</span>
                          <span className="opacity-70" aria-hidden="true">·</span>
                          <span className="tabular-nums">${product.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Apothecary Science & Ingredient Transparency Band */}
      <section className="bg-[#1B4332] text-[#FAF9F6]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-[13px] font-semibold tracking-[0.04em] text-[#A5D0B9] mb-3">
                Clinical Transparency Standard
              </p>
              <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-bold tracking-[-0.02em] text-white text-balance">
                Apothecary-grade sourcing. Verified down to parts per million.
              </h2>
              <p className="mt-4 text-[16px] leading-[26px] text-[#DCE4E0] max-w-[58ch]">
                Conventional sports nutrition hides behind proprietary blends and unverified raw materials. Every Veloce canister carries a traceable lot number linked to independent ISO-17025 lab assays for heavy metals, potency, and WADA banned-substance clearance.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenScience}
                  className="cta-coral rounded-full px-7 h-12 text-[15px] font-semibold inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>Inspect Ingredients & Lab COAs</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#012D1D]/70 border border-white/10 p-5">
                <ShieldCheck className="w-5 h-5 text-[#A5D0B9] mb-3" />
                <p className="font-display text-[22px] font-bold text-white tabular-nums">
                  &lt; 0.02 ppm
                </p>
                <p className="text-[13px] text-[#C1ECD4]/85 mt-1 leading-[19px]">
                  Verified heavy-metal ceiling across all cold-extracted plant proteins.
                </p>
              </div>
              <div className="rounded-2xl bg-[#012D1D]/70 border border-white/10 p-5">
                <FlaskConical className="w-5 h-5 text-[#A5D0B9] mb-3" />
                <p className="font-display text-[22px] font-bold text-white tabular-nums">
                  12°C Cold Mill
                </p>
                <p className="text-[13px] text-[#C1ECD4]/85 mt-1 leading-[19px]">
                  Solvent-free mechanical extraction preserving native amino bioavailability.
                </p>
              </div>
              <div className="sm:col-span-2 rounded-2xl bg-[#012D1D]/70 border border-white/10 p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.04em] text-[#A5D0B9]">
                    Latest Batch Assay
                  </p>
                  <p className="font-display text-lg font-bold text-white mt-0.5 tabular-nums">
                    Lot VL-2026-084 · Passed 100%
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenScience}
                  className="rounded-full border border-white/25 hover:bg-white/10 text-white px-4 h-9 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Athlete Reviews */}
      <section
        id="reviews"
        className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Field-Tested by Athletes
            </h2>
            <p className="text-[16px] text-[#595959] mt-2">
              Unedited performance feedback from verified recurring subscribers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1B4332]">
            <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-[#1B4332] text-[#1B4332]" />
              ))}
            </div>
            <span className="tabular-nums">4.9 average · 1,533 verified reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="veloce-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#1B4332] text-[#1B4332]" />
                    ))}
                  </div>
                  <span className="rounded-full bg-[#E8F0EC] text-[#1B4332] px-2.5 py-1 text-[11px] font-bold tracking-[0.04em]">
                    Verified Buyer
                  </span>
                </div>

                <p className="text-[15px] leading-[24px] text-[#1A1A1A]">
                  “{review.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E5DF]">
                <p className="font-display text-[15px] font-bold text-[#1A1A1A]">
                  {review.author}
                </p>
                <p className="text-[13px] text-[#595959] mt-0.5">
                  {review.role} · {review.date}
                </p>

                <button
                  type="button"
                  onClick={() => onSelectProduct(review.productId)}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1B4332] hover:text-[#2D6A4F] transition-colors cursor-pointer group"
                >
                  <span className="underline underline-offset-4 decoration-[#1B4332]/40 group-hover:decoration-[#1B4332]">
                    {review.productName} — {review.variantUsed}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
