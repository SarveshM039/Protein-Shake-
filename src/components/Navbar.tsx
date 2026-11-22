import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AppScreen } from '../types';

interface NavbarProps {
  activeScreen: AppScreen;
  cartCount: number;
  onNavigate: (screen: AppScreen, sectionId?: string) => void;
  onOpenCart: () => void;
}

export function Navbar({
  activeScreen,
  cartCount,
  onNavigate,
  onOpenCart,
}: NavbarProps) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (screen: AppScreen, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(screen, sectionId);
  };

  return (
    <div className="sticky top-0 z-40">
      {showAnnouncement && (
        <div className="bg-[#1B4332] text-[#FAF9F6] text-xs font-medium px-4 h-9 flex items-center justify-center relative">
          <p className="truncate pr-7 tracking-[0.01em]">
            Complimentary express shipping over $75
            <span className="mx-2 opacity-40" aria-hidden="true">·</span>
            <span className="text-[#FFCEC7] font-semibold">Save 15%</span> with recurring delivery
          </p>
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 p-1 text-white/75 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E8E5DF]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 h-16 md:h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="font-display text-xl md:text-[22px] font-extrabold tracking-[-0.03em] text-[#1B4332] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] rounded"
          >
            VELOCE
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#414844]"
          >
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'collection')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeScreen === 'home'
                  ? 'border-[#1B4332] text-[#1A1A1A] font-semibold'
                  : 'border-transparent hover:text-[#1B4332] hover:border-[#1B4332]/40'
              }`}
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('pdp')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeScreen === 'pdp'
                  ? 'border-[#1B4332] text-[#1A1A1A] font-semibold'
                  : 'border-transparent hover:text-[#1B4332] hover:border-[#1B4332]/40'
              }`}
            >
              Formulations
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('science')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeScreen === 'science'
                  ? 'border-[#1B4332] text-[#1A1A1A] font-semibold'
                  : 'border-transparent hover:text-[#1B4332] hover:border-[#1B4332]/40'
              }`}
            >
              Clinical Science
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'reviews')}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-[#1B4332] hover:border-[#1B4332]/40 transition-colors cursor-pointer"
            >
              Reviews
            </button>
          </nav>

          {/* Zone 3: Single Primary Action (Shopping Bag + Mobile Menu Trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] hover:bg-[#012D1D] text-white px-4 sm:px-5 h-10 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-2"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              <span>Bag</span>
              <span className="tabular-nums bg-white/15 px-2 py-0.5 rounded-full text-xs font-bold min-w-[22px] text-center">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E8E5DF] bg-white text-[#1A1A1A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E5DF] bg-[#FAF9F6] px-5 py-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'collection')}
              className="text-left py-2.5 px-3 rounded-lg text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#E8F0EC]"
            >
              Shop Collection
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('pdp')}
              className="text-left py-2.5 px-3 rounded-lg text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#E8F0EC]"
            >
              Formulations
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('science')}
              className="text-left py-2.5 px-3 rounded-lg text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#E8F0EC]"
            >
              Clinical Science & Lab COAs
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'reviews')}
              className="text-left py-2.5 px-3 rounded-lg text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#E8F0EC]"
            >
              Verified Reviews
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
