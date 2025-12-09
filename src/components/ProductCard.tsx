import { useState } from 'react';

import { HeartIcon } from 'lucide-react';

import { Badge } from '@/components/UI/badge';
import { Button } from '@/components/UI/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from '@/components/UI/card';
import { formatCurrency } from '@/helpers';

import { cn } from '@/lib/utils';
import type { Product } from '@/types/products';
import useCartStore from '@/store/cartStore';
import useProductStore from '@/store/productStore';

type ProductCardProps = {
  product: Product;
  isInCart: boolean;
};

const ProductCard = ({ product, isInCart }: ProductCardProps) => {
  const { title, description, badges, price, imgSrc } = product;
  const [liked, setLiked] = useState<boolean>(product.isFavorite);

  const { addProduct: addCartProduct } = useCartStore();
  const { makeProductFavorite: setProductAsFavorite } = useProductStore();

  const formattedPrice = formatCurrency(price);

  const handleAdd = () => {
    addCartProduct(product);
  };

  const handleMakeLiked = () => {
    setLiked((prev) => !prev);
    setProductAsFavorite(product.id);
  };

  return (
    <div className="relative max-w-md rounded-xl pt-0 shadow-md">
      <div className="flex w-full h-60 items-center justify-center rounded-t-xl overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <Button
        size="icon"
        onClick={handleMakeLiked}
        className="bg-primary/30 hover:bg-primary/20 absolute top-4 right-4 rounded-full cursor-pointer"
      >
        <HeartIcon className={cn(liked ? 'fill-destructive stroke-destructive' : 'stroke-white')} />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none -mt-3 relative">
        <CardHeader>
          <CardTitle className="min-h-8 line-clamp-2">{title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            {badges.map((item) => (
              <Badge key={item} variant="outline" className="rounded-sm">
                {item}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent className="line-clamp-3">
          <p>{description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">{formattedPrice}</span>
          </div>
          <Button size="lg" onClick={handleAdd} disabled={isInCart}>
            {isInCart ? 'In cart' : 'Add to cart'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
