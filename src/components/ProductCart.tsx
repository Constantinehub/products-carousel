import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/UI/sheet';
import { Button } from '@/components/UI/button';
import { formatCurrency } from '@/helpers';
import useCartStore from '@/store/cartStore';
import { twMerge } from 'tailwind-merge';

export default function ProductCart() {
  const { isCartOpen, cartProducts, setCartOpen, removeProduct, updateProductQuantity } =
    useCartStore();

  const cartItems = Object.values(cartProducts);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartProducts[id];
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    updateProductQuantity(id, newQuantity);
  };

  const handleRemove = (id: string) => {
    removeProduct(id);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.quantity >= 5 ? 0.9 : 1),
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col w-full">
        <SheetHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
              <SheetTitle className="text-xl font-semibold">Shopping Cart</SheetTitle>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">{itemCount} items</span>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between min-h-[40px]">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                      <div className="text-right">
                        <p
                          className={twMerge('font-semibold', item.quantity >= 5 && 'text-red-600')}
                        >
                          {item.quantity >= 5 && (
                            <span className="text-black line-through mr-2">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          )}
                          {formatCurrency(
                            item.price * item.quantity * (item.quantity >= 5 ? 0.9 : 1)
                          )}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="border-t bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium uppercase">Sub total</span>
                <span className="text-lg font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button size="lg" className="w-full">
                  Check out
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-amber-400 hover:bg-amber-400/70"
                >
                  Check out with PayPal
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full">
                    Continue shopping
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
