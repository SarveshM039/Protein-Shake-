import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, Product } from './data/catalog';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ProductDetailView } from './components/ProductDetailView';
import { ScienceView } from './components/ScienceView';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AppScreen, CartItem, SubscriptionCadence } from './types';

const CART_STORAGE_KEY = 'veloce_botanical_cart_v1';

function buildItemKey(
  productId: string,
  variantId: string,
  isSubscription: boolean,
  cadenceDays: SubscriptionCadence
): string {
  return `${productId}::${variantId}::${isSubscription ? `sub-${cadenceDays}` : 'once'}`;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage access errors in restricted frames
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  const selectedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0],
    [selectedProductId]
  );

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleNavigate = (screen: AppScreen, sectionId?: string) => {
    setActiveScreen(screen);
    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveScreen('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = ({
    product,
    variantId,
    variantName,
    quantity,
    isSubscription,
    cadenceDays,
  }: {
    product: Product;
    variantId: string;
    variantName: string;
    quantity: number;
    isSubscription: boolean;
    cadenceDays: SubscriptionCadence;
  }) => {
    const key = buildItemKey(product.id, variantId, isSubscription, cadenceDays);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          productName: product.name,
          image: product.image,
          variantId,
          variantName,
          unitPrice: product.price,
          quantity,
          isSubscription,
          cadenceDays,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultVariant = product.variants[0];
    handleAddToCart({
      product,
      variantId: defaultVariant.id,
      variantName: defaultVariant.name,
      quantity: 1,
      isSubscription: false,
      cadenceDays: 30,
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleToggleItemSubscription = (key: string) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item.key === key);
      if (!target) return prev;
      const nextSub = !target.isSubscription;
      const nextKey = buildItemKey(
        target.productId,
        target.variantId,
        nextSub,
        target.cadenceDays
      );
      const others = prev.filter((item) => item.key !== key);
      const duplicate = others.find((item) => item.key === nextKey);
      if (duplicate) {
        return others.map((item) =>
          item.key === nextKey
            ? { ...item, quantity: item.quantity + target.quantity }
            : item
        );
      }
      return [
        ...others,
        {
          ...target,
          key: nextKey,
          isSubscription: nextSub,
        },
      ];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      <Navbar
        activeScreen={activeScreen}
        cartCount={totalCartCount}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
      />

      <div className="flex-1">
        {activeScreen === 'home' && (
          <HomeView
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
            onOpenScience={() => handleNavigate('science')}
          />
        )}

        {activeScreen === 'pdp' && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => handleNavigate('home', 'collection')}
            onSelectProduct={handleSelectProduct}
            onOpenScience={() => handleNavigate('science')}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeScreen === 'science' && (
          <ScienceView onSelectProduct={handleSelectProduct} />
        )}
      </div>

      <Footer
        onNavigate={handleNavigate}
        onSelectProduct={handleSelectProduct}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleItemSubscription={handleToggleItemSubscription}
        onClearCart={handleClearCart}
        onExploreProducts={() => handleNavigate('home', 'collection')}
      />
    </div>
  );
}
