import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  CartItem,
  FREE_SHIPPING_THRESHOLD,
  getEffectivePrice,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onToggleItemSubscription: (key: string) => void;
  onClearCart: () => void;
  onExploreProducts: () => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed';

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onToggleItemSubscription,
  onClearCart,
  onExploreProducts,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityPostal, setCityPostal] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'priority'>('express');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemCount: number;
    recipient: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === 'confirmed' && items.length > 0) {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + getEffectivePrice(item.unitPrice, item.isSubscription) * item.quantity,
    0
  );
  const regularTotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const subscriptionSavings = Math.max(0, regularTotal - subtotal);
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost =
    items.length === 0
      ? 0
      : shippingMethod === 'priority'
      ? 12
      : qualifiesFreeShipping
      ? 0
      : 7;
  const orderTotal = subtotal + shippingCost;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !cityPostal.trim()) {
      setFormError('Please complete all required shipping details to place your order.');
      return;
    }
    setFormError(null);
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
    const randomNum = Math.floor(4100 + Math.random() * 5800);
    setConfirmedOrder({
      orderNumber: `VL-${randomNum}`,
      total: orderTotal,
      itemCount: totalQty,
      recipient: fullName.trim(),
      email: email.trim(),
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Modal & Drawer Overlay: #1A1A1A at 40% opacity with 4px backdrop blur */}
      <div
        onClick={handleCloseDrawer}
        className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-[4px] transition-opacity"
      />

      {/* Slide-Over Panel */}
      <div className="relative z-10 w-full max-w-[460px] bg-[#FAF9F6] h-full flex flex-col shadow-2xl border-l border-[#E8E5DF]">
        {/* Drawer Header */}
        <div className="px-6 h-16 bg-white border-b border-[#E8E5DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="p-1.5 -ml-1.5 rounded-full hover:bg-[#E8F0EC] text-[#1B4332] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-[19px] font-bold tracking-[-0.01em] text-[#1A1A1A]">
              {step === 'bag' && 'Your Apothecary Bag'}
              {step === 'checkout' && 'Express Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close drawer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#595959] hover:bg-[#E8F0EC] hover:text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: BAG VIEW */}
        {step === 'bag' && (
          <>
            {/* Free Shipping Progress Meter */}
            {items.length > 0 && (
              <div className="px-6 py-3.5 bg-[#E8F0EC] border-b border-[#D5E4DC] shrink-0">
                <div className="flex items-center justify-between text-[12px] font-semibold text-[#1B4332] mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    {qualifiesFreeShipping
                      ? 'Complimentary express shipping unlocked'
                      : `Add $${remainingForFreeShipping.toFixed(2)} for free express shipping`}
                  </span>
                  <span className="tabular-nums">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white overflow-hidden">
                  <div
                    className="h-full bg-[#1B4332] rounded-full transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Bag Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] text-[#1B4332] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1A1A1A]">
                    Your bag is currently empty
                  </h3>
                  <p className="text-sm text-[#595959] mt-2 max-w-[30ch]">
                    Explore cold-extracted proteins, mineral hydration, and nightly recovery protocols.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onExploreProducts();
                    }}
                    className="mt-6 cta-coral rounded-full px-6 h-11 text-sm font-semibold cursor-pointer"
                  >
                    Browse Formulations
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const effectivePrice = getEffectivePrice(
                      item.unitPrice,
                      item.isSubscription
                    );
                    const lineTotal = (effectivePrice * item.quantity).toFixed(2);
                    return (
                      <div
                        key={item.key}
                        className="bg-white border border-[#E8E5DF] rounded-2xl p-4"
                      >
                        <div className="flex gap-3.5">
                          <div className="w-20 h-20 rounded-xl bg-[#E8F0EC] overflow-hidden shrink-0">
                            <ResilientImage
                              src={item.image}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-[15px] font-bold text-[#1A1A1A] leading-snug">
                                {item.productName}
                              </h3>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.key)}
                                aria-label={`Remove ${item.productName}`}
                                className="text-[#595959] hover:text-[#BA1A1A] p-1 -mr-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[12px] text-[#595959] truncate mt-0.5">
                              {item.variantName}
                            </p>

                            <div className="mt-3 flex items-center justify-between gap-2">
                              {/* Pill Quantity Adjuster */}
                              <div className="rounded-full bg-[#FAF9F6] border border-[#E8E5DF] h-8 px-1 inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.key, -1)}
                                  aria-label="Decrease item quantity"
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#E8F0EC] cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center text-xs font-bold tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.key, 1)}
                                  aria-label="Increase item quantity"
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#E8F0EC] cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="text-right tabular-nums">
                                <span className="text-[15px] font-bold text-[#1A1A1A]">
                                  ${lineTotal}
                                </span>
                                {item.isSubscription && (
                                  <span className="ml-1.5 text-[11px] text-[#595959] line-through">
                                    ${(item.unitPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* One-Click Subscription Upgrade / Toggle */}
                        <div className="mt-3 pt-3 border-t border-[#E8E5DF] flex items-center justify-between gap-2">
                          <span className="text-[12px] font-medium text-[#414844]">
                            {item.isSubscription
                              ? `Subscribed · Every ${item.cadenceDays} days (Save 15%)`
                              : 'One-Time Purchase'}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleItemSubscription(item.key)}
                            className={`rounded-full px-3 h-7 text-[11px] font-bold transition-colors cursor-pointer ${
                              item.isSubscription
                                ? 'bg-[#FAF9F6] text-[#595959] border border-[#E8E5DF] hover:text-[#1A1A1A]'
                                : 'bg-[#E8F0EC] text-[#1B4332] hover:bg-[#D5E4DC]'
                            }`}
                          >
                            {item.isSubscription ? 'Switch to One-Time' : 'Subscribe & Save 15%'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky Bag Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E8E5DF] shrink-0 space-y-3">
                <div className="space-y-1.5 text-sm tabular-nums">
                  {subscriptionSavings > 0 && (
                    <div className="flex items-center justify-between text-[#2D6A4F] font-semibold">
                      <span>Recurring Delivery Savings (15%)</span>
                      <span>−${subscriptionSavings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[#595959]">
                    <span>Shipping</span>
                    <span>
                      {qualifiesFreeShipping ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[17px] font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E5DF]">
                    <span>Estimated Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="cta-coral w-full rounded-full h-12 text-[15px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: INLINE EXPRESS CHECKOUT */}
        {step === 'checkout' && (
          <form onSubmit={handleCompleteOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div>
                <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F] mb-3">
                  Shipping Destination
                </p>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jordan Avery"
                      className="veloce-input w-full h-11 px-3.5 text-sm text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                    >
                      Email for Dispatch & COA Receipt
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="veloce-input w-full h-11 px-3.5 text-sm text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                    >
                      Street Address
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="420 Alpine Way, Apt 4B"
                      className="veloce-input w-full h-11 px-3.5 text-sm text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                    >
                      City & Postal Code
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={cityPostal}
                      onChange={(e) => setCityPostal(e.target.value)}
                      placeholder="Boulder, CO 80302"
                      className="veloce-input w-full h-11 px-3.5 text-sm text-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div>
                <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F] mb-2.5">
                  Courier Option
                </p>
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('express')}
                    className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                      shippingMethod === 'express'
                        ? 'border-2 border-[#1B4332] bg-[#E8F0EC]'
                        : 'border-[#E8E5DF] bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">
                        Carbon-Neutral Express (2–3 Days)
                      </p>
                      <p className="text-xs text-[#595959]">Free over $75</p>
                    </div>
                    <span className="text-sm font-bold text-[#1B4332] tabular-nums">
                      {qualifiesFreeShipping ? 'Free' : '$7.00'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('priority')}
                    className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                      shippingMethod === 'priority'
                        ? 'border-2 border-[#1B4332] bg-[#E8F0EC]'
                        : 'border-[#E8E5DF] bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">
                        Next-Day Cold Chain Priority
                      </p>
                      <p className="text-xs text-[#595959]">Arrives next business day</p>
                    </div>
                    <span className="text-sm font-bold text-[#1B4332] tabular-nums">$12.00</span>
                  </button>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-medium text-[#BA1A1A] bg-[#FFDAD6]/60 px-3.5 py-2.5 rounded-lg">
                  {formError}
                </p>
              )}
            </div>

            <div className="p-6 bg-white border-t border-[#E8E5DF] shrink-0 space-y-3">
              <div className="flex items-center justify-between text-base font-bold text-[#1A1A1A] tabular-nums">
                <span>Total Due</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="cta-coral w-full rounded-full h-12 text-[15px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order — ${orderTotal.toFixed(2)}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMATION RECEIPT */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#E8F0EC] text-[#1B4332] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-xs font-bold tracking-[0.04em] text-[#2D6A4F] tabular-nums">
                Order #{confirmedOrder.orderNumber} Confirmed
              </p>
              <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] mt-1.5">
                Preparing Your Apothecary Dispatch
              </h3>
              <p className="text-sm text-[#595959] mt-2 leading-relaxed">
                Thank you, {confirmedOrder.recipient}. Your batch-verified dispatch receipt has been sent to{' '}
                <span className="font-semibold text-[#1A1A1A]">{confirmedOrder.email}</span>.
              </p>

              <div className="mt-6 bg-white border border-[#E8E5DF] rounded-2xl p-5 text-left space-y-2.5 text-sm tabular-nums">
                <div className="flex justify-between">
                  <span className="text-[#595959]">Reference</span>
                  <span className="font-bold text-[#1B4332]">#{confirmedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">Formulations Reserved</span>
                  <span className="font-semibold text-[#1A1A1A]">{confirmedOrder.itemCount} items</span>
                </div>
                <div className="flex justify-between pt-2.5 border-t border-[#E8E5DF]">
                  <span className="font-semibold text-[#1A1A1A]">Total Paid</span>
                  <span className="font-bold text-[#1A1A1A]">
                    ${confirmedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="mt-8 w-full rounded-full border-[1.5px] border-[#1B4332] text-[#1B4332] hover:bg-[#E8F0EC] h-12 text-[15px] font-semibold transition-colors cursor-pointer"
            >
              Return to Veloce
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
