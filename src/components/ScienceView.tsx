import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  ACTIVE_INGREDIENTS,
  BATCH_COAS,
  PRODUCTS,
} from '../data/catalog';

interface ScienceViewProps {
  onSelectProduct: (productId: string) => void;
}

const SAMPLE_BATCHES = Object.keys(BATCH_COAS);

export function ScienceView({ onSelectProduct }: ScienceViewProps) {
  const [selectedIngredientId, setSelectedIngredientId] = useState(
    ACTIVE_INGREDIENTS[0].id
  );
  const [batchInput, setBatchInput] = useState('VL-2026-084');
  const [activeBatchCode, setActiveBatchCode] = useState('VL-2026-084');
  const [lookupError, setLookupError] = useState<string | null>(null);

  const selectedIngredient =
    ACTIVE_INGREDIENTS.find((ing) => ing.id === selectedIngredientId) ||
    ACTIVE_INGREDIENTS[0];

  const pairedProducts = PRODUCTS.filter((p) =>
    selectedIngredient.usedInIds.includes(p.id)
  );

  const activeCoa = BATCH_COAS[activeBatchCode];

  const handleBatchLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = batchInput.trim().toUpperCase();
    if (BATCH_COAS[normalized]) {
      setActiveBatchCode(normalized);
      setLookupError(null);
    } else {
      setLookupError(
        `No active assay found for "${normalized}". Try a published lot such as VL-2026-084, VL-2026-091, or VL-2026-102.`
      );
    }
  };

  const handleSelectSampleBatch = (code: string) => {
    setBatchInput(code);
    setActiveBatchCode(code);
    setLookupError(null);
  };

  return (
    <main className="pb-20">
      {/* Header Band */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-10 md:pt-14 pb-12">
        <p className="text-[13px] font-semibold tracking-[0.04em] text-[#2D6A4F] mb-3">
          Clinical Validation & Sourcing
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[34px] leading-[42px] md:text-[48px] md:leading-[56px] font-extrabold tracking-[-0.03em] text-[#1A1A1A] text-balance">
              Formulated for measurable physiological output.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[26px] text-[#595959]">
              Every botanical extract is standardized to its active compound, cold-milled without chemical solvents, and verified by an independent ISO/IEC 17025 laboratory before release.
            </p>
          </div>
        </div>

        {/* Clinical Metrics Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="veloce-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#595959]">Randomized Athlete Trial</p>
            <p className="font-display text-3xl font-extrabold text-[#1B4332] mt-2 tabular-nums">
              +24%
            </p>
            <p className="text-[13px] text-[#595959] mt-1.5 leading-[19px]">
              Faster 48-hour recovery readiness across 128 endurance athletes over 8 weeks.
            </p>
          </div>
          <div className="veloce-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#595959]">Amino Digestibility</p>
            <p className="font-display text-3xl font-extrabold text-[#1B4332] mt-2 tabular-nums">
              98.4%
            </p>
            <p className="text-[13px] text-[#595959] mt-1.5 leading-[19px]">
              DIAAS-aligned protein utilization via 12°C mechanical water fractionation.
            </p>
          </div>
          <div className="veloce-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#595959]">Heavy Metal Ceiling</p>
            <p className="font-display text-3xl font-extrabold text-[#1B4332] mt-2 tabular-nums">
              &lt; 0.02 ppm
            </p>
            <p className="text-[13px] text-[#595959] mt-1.5 leading-[19px]">
              Lead, arsenic, cadmium, and mercury screened 25× below USP daily thresholds.
            </p>
          </div>
          <div className="veloce-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#595959]">Banned Substance Screen</p>
            <p className="font-display text-3xl font-extrabold text-[#1B4332] mt-2 tabular-nums">
              280+
            </p>
            <p className="text-[13px] text-[#595959] mt-1.5 leading-[19px]">
              WADA-prohibited compounds screened negative per production lot.
            </p>
          </div>
        </div>
      </section>

      {/* Active Ingredient Explorer */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-12 border-t border-[#E8E5DF]">
        <div className="mb-8">
          <h2 className="font-display text-[26px] md:text-[34px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
            Active Ingredient Manifest
          </h2>
          <p className="text-[15px] text-[#595959] mt-1.5">
            Select a primary botanical compound to review dosage, harvest provenance, and physiological mechanism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left selector list */}
          <div className="lg:col-span-5 space-y-2.5">
            {ACTIVE_INGREDIENTS.map((ing) => {
              const active = ing.id === selectedIngredient.id;
              return (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setSelectedIngredientId(ing.id)}
                  className={`w-full text-left rounded-2xl p-4 border transition-all cursor-pointer ${
                    active
                      ? 'border-2 border-[#1B4332] bg-[#E8F0EC]'
                      : 'border-[#E8E5DF] bg-white hover:border-[#1B4332]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[16px] font-bold text-[#1A1A1A]">
                      {ing.name}
                    </span>
                    <span className="text-[12px] font-bold text-[#1B4332] tabular-nums shrink-0">
                      {ing.bioavailabilityScore}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#595959] mt-1">{ing.clinicalDose}</p>
                </button>
              );
            })}
          </div>

          {/* Right detail dossier */}
          <div className="lg:col-span-7 veloce-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#E8E5DF]">
              <div>
                <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F]">
                  {selectedIngredient.botanicalSource}
                </p>
                <h3 className="font-display text-[24px] md:text-[28px] font-bold tracking-[-0.015em] text-[#1A1A1A] mt-1">
                  {selectedIngredient.name}
                </h3>
              </div>
              <div className="rounded-xl bg-[#E8F0EC] px-4 py-2.5 text-right tabular-nums">
                <p className="text-[11px] font-bold tracking-[0.04em] text-[#2D6A4F]">
                  Bioavailability
                </p>
                <p className="font-display text-xl font-extrabold text-[#1B4332]">
                  {selectedIngredient.bioavailabilityScore}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 border-b border-[#E8E5DF]">
              <div>
                <p className="text-xs font-semibold text-[#595959]">Clinical Dosage</p>
                <p className="text-[15px] font-bold text-[#1A1A1A] mt-1">
                  {selectedIngredient.clinicalDose}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#595959]">Harvest Provenance</p>
                <p className="text-[15px] font-bold text-[#1A1A1A] mt-1 inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>{selectedIngredient.origin}</span>
                </p>
              </div>
            </div>

            <div className="py-6 border-b border-[#E8E5DF]">
              <p className="text-xs font-semibold text-[#595959] mb-2">
                Physiological Mechanism
              </p>
              <p className="text-[15px] leading-[24px] text-[#1A1A1A]">
                {selectedIngredient.mechanism}
              </p>
            </div>

            <div className="pt-6">
              <p className="text-xs font-semibold text-[#595959] mb-3">
                Featured In These Formulations
              </p>
              <div className="flex flex-wrap gap-3">
                {pairedProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onSelectProduct(product.id)}
                    className="rounded-full border-[1.5px] border-[#1B4332] px-4 h-10 text-[13px] font-semibold text-[#1B4332] hover:bg-[#E8F0EC] inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{product.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Batch Purity Lookup (COA) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-12 border-t border-[#E8E5DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.04em] text-[#2D6A4F] mb-2">
              <FlaskConical className="w-4 h-4" />
              <span>Certificate of Analysis Archive</span>
            </div>
            <h2 className="font-display text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Verify Your Batch Number
            </h2>
            <p className="text-[15px] leading-[24px] text-[#595959] mt-2">
              Enter the lot code printed on the base of your Veloce canister to inspect third-party heavy-metal, microbial, and active potency reports.
            </p>

            <form onSubmit={handleBatchLookup} className="mt-5 flex gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#595959] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  placeholder="e.g. VL-2026-084"
                  aria-label="Enter batch lot code"
                  className="veloce-input w-full h-11 pl-10 pr-4 text-sm font-medium text-[#1A1A1A] tabular-nums"
                />
              </div>
              <button
                type="submit"
                className="cta-coral rounded-full px-5 h-11 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify Lot
              </button>
            </form>

            {lookupError && (
              <p className="mt-3 text-xs font-medium text-[#BA1A1A] bg-[#FFDAD6]/60 px-3 py-2 rounded-lg">
                {lookupError}
              </p>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold text-[#595959] mb-2">
                Recent Published Lots:
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_BATCHES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleSelectSampleBatch(code)}
                    className={`rounded-full px-3.5 h-8 text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                      activeBatchCode === code
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#E8F0EC] text-[#1B4332] hover:bg-[#D5E4DC]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 veloce-card rounded-2xl p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#E8E5DF]">
              <div>
                <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F] tabular-nums">
                  Lot {activeCoa.batchCode}
                </p>
                <h3 className="font-display text-xl font-bold text-[#1A1A1A] mt-0.5">
                  {activeCoa.productName}
                </h3>
                <p className="text-xs text-[#595959] mt-1">
                  {activeCoa.labPartner} · Verified {activeCoa.testedDate}
                </p>
              </div>
              <span className="rounded-full bg-[#E8F0EC] text-[#1B4332] px-3.5 py-1.5 text-xs font-bold inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Status: {activeCoa.status}</span>
              </span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-[#595959] border-b border-[#E8E5DF]">
                    <th className="py-2.5 font-semibold">Screening Panel</th>
                    <th className="py-2.5 font-semibold">Observed Result</th>
                    <th className="py-2.5 font-semibold">USP / NSF Spec</th>
                    <th className="py-2.5 font-semibold text-right">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5DF] tabular-nums">
                  {activeCoa.metrics.map((row) => (
                    <tr key={row.test}>
                      <td className="py-3 font-medium text-[#1A1A1A]">{row.test}</td>
                      <td className="py-3 font-bold text-[#1B4332]">{row.result}</td>
                      <td className="py-3 text-[#595959]">{row.limit}</td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2D6A4F]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{row.verdict}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
