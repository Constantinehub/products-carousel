import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { convertArrayToMap } from '@/helpers';
import type { Product } from '@/types/products';
import { products } from '@/data/mockData';

interface ProductsState {
  products: Product[];
  makeProductFavorite: (id: string) => void;
}

const useProductStore = create<ProductsState>()(
  devtools(
    persist(
      (set) => ({
        products,
        makeProductFavorite: (id) =>
          set((state) => {
            const productsMap = convertArrayToMap(state.products, 'id');
            const targetProduct = productsMap.get(id);

            if (!targetProduct) {
              return state;
            }

            productsMap.set(id, { ...targetProduct, isFavorite: !targetProduct.isFavorite });

            return { products: Array.from(productsMap.values()) };
          }),
      }),
      {
        name: 'products-storage',
      }
    )
  )
);

export default useProductStore;
