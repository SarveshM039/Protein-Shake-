export type AppScreen = 'home' | 'pdp' | 'science';

export type SubscriptionCadence = 30 | 45 | 60;

export interface CartItem {
  key: string; // productId::variantId::isSubscription::cadence
  productId: string;
  productName: string;
  image: string;
  variantId: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  isSubscription: boolean;
  cadenceDays: SubscriptionCadence;
}

export const SUBSCRIPTION_DISCOUNT = 0.15;
export const FREE_SHIPPING_THRESHOLD = 75;

export function getEffectivePrice(unitPrice: number, isSubscription: boolean): number {
  return isSubscription ? Number((unitPrice * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)) : unitPrice;
}
