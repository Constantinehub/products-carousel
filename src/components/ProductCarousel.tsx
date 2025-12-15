import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/UI/carousel';
import ProductCard from '@/components/ProductCard';
import useProductStore from '@/store/productStore';
import useCartStore from '@/store/cartStore';
import { useResize } from '@/hooks/useResize';
import { twMerge } from 'tailwind-merge';
import { delay } from '@/helpers';

export default function ProductCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { products } = useProductStore();
  const { cartProducts } = useCartStore();
  const { isMobile } = useResize();

  useEffect(() => {
    if (!carouselApi) return;

    const snapCount = carouselApi.scrollSnapList().length;

    const onSelect = async () => {
      if (carouselApi.selectedScrollSnap() === snapCount - 1) {
        await delay();
        carouselApi.scrollTo(0, false);
      }
    };

    carouselApi.on('select', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  return (
    <div
      className={twMerge(
        'rounded-2xl border border-slate-200/60 bg-white/60 p-6 md:p-12 shadow-lg backdrop-blur-sm'
      )}
    >
      <Carousel setApi={setCarouselApi} opts={{ align: 'start' }} className="w-full">
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1 flex justify-center">
                <ProductCard product={product} isInCart={!!cartProducts[product.id]} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {!isMobile && (
          <>
            <CarouselPrevious className="-left-10" />
            <CarouselNext className="-right-10" />
          </>
        )}
      </Carousel>
    </div>
  );
}
