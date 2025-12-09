export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imgSrc: string;
  isFavorite: boolean;
  badges: string[];
}

export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'imgSrc'> & {
  quantity: number;
};
