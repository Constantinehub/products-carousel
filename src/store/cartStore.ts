import type { CartProduct, Product } from '@/types/products';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartState {
  isCartOpen: boolean;
  setCartOpen: () => void;

  cartProducts: Record<string, CartProduct>;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        isCartOpen: false,
        setCartOpen: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
        cartProducts: {},
        addProduct: (product) =>
          set((state) => {
            const { id, title, price, imgSrc } = product;
            const cartProducts = { ...state.cartProducts };
            const newProduct = {
              id,
              title,
              price,
              imgSrc,
              quantity: 1,
            };

            if (!cartProducts[id]) {
              cartProducts[id] = newProduct;
            }

            return {
              cartProducts: cartProducts,
            };
          }),
        removeProduct: (productId) =>
          set((state) => {
            const updatedProducts = Object.fromEntries(
              Object.entries(state.cartProducts).filter(([key]) => key !== productId)
            );

            return {
              cartProducts: { ...updatedProducts },
            };
          }),
        updateProductQuantity: (productId, newQuantity) =>
          set((state) => {
            const updatedProducts = state.cartProducts;

            updatedProducts[productId].quantity = newQuantity;

            return {
              cartProducts: { ...updatedProducts },
            };
          }),
      }),
      {
        name: 'cart-storage',
      }
    )
  )
);

export default useCartStore;
