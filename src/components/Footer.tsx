import { useState } from 'react';
import { Check } from 'lucide-react';
import { AppScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: AppScreen, sectionId?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export function Footer({ onNavigate, onSelectProduct }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#012D1D] text-[#FAF9F6] border-t border-[#1B4332]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white">
              VELOCE
            </span>
            <p className="mt-3 text-sm leading-6 text-[#C1ECD4]/80 max-w-[34ch]">
              Botanical performance nutrition formulated with clinical precision. NSF Certified for Sport and batch-screened for heavy metals.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <p className="text-xs font-bold tracking-[0.04em] text-[#A5D0B9] mb-4">
              Formulations
            </p>
            <ul className="space-y-2.5 text-sm text-[#DCE4E0]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('kinetic-plant-protein')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kinetic Plant Protein
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('cellular-electrolyte-matrix')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Electrolyte Matrix
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('adaptogen-recovery-complex')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Adaptogen Recovery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('chlorophyll-daily-greens')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chlorophyll Greens
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-bold tracking-[0.04em] text-[#A5D0B9] mb-4">
              Apothecary
            </p>
            <ul className="space-y-2.5 text-sm text-[#DCE4E0]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('science')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Science
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('science')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Batch COA Lookup
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Athlete Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Journal / Dispatch Signup */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold tracking-[0.04em] text-[#A5D0B9] mb-3">
              Performance Dispatch
            </p>
            <p className="text-sm text-[#DCE4E0] mb-4">
              Receive batch assay releases, physiological research notes, and 15% off your first ritual.
            </p>
            {subscribed ? (
              <div className="rounded-xl bg-[#1B4332] border border-white/15 px-4 py-3 text-sm text-[#C1ECD4] inline-flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are subscribed to the Veloce Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@domain.com"
                  aria-label="Email address for Veloce Dispatch"
                  className="flex-1 h-11 rounded-lg bg-white/10 border border-white/20 px-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#A5D0B9]"
                />
                <button
                  type="submit"
                  className="cta-coral rounded-full px-5 h-11 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A5D0B9]/75">
          <p>© 2026 Veloce Botanical Labs. All rights reserved.</p>
          <p>NSF Certified for Sport · ISO/IEC 17025 Batch Screened</p>
        </div>
      </div>
    </footer>
  );
}
