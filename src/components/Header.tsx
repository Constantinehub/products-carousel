import { ShoppingCart } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { Button } from '@/components/UI/button';

export default function Header() {
  const { cartProducts, setCartOpen } = useCartStore();
  const ordersCount = Object.keys(cartProducts).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <span className="hidden text-lg font-semibold text-slate-800 sm:inline-block">
              Smart Carousel
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" className="relative" onClick={setCartOpen}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                {ordersCount}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
