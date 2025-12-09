import type { Product } from '@/types/products';

export const products: Product[] = [
  {
    id: '1',
    title: 'Nike Jordan Air Rev',
    description:
      "Crossing hardwood comfort with off-court flair. '80s-Inspired construction, bold details and nothin'-but-net style.",
    price: 69.99,
    imgSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    isFavorite: false,
    badges: ['EU38', 'Black and White'],
  },
  {
    id: '2',
    title: 'Adidas Ultraboost 22',
    description:
      'Premium running shoes with responsive cushioning and energy-returning Boost midsole for maximum comfort.',
    price: 179.99,
    imgSrc: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    isFavorite: true,
    badges: ['EU42', 'White'],
  },
  {
    id: '3',
    title: 'Classic Denim Jacket',
    description:
      'Timeless denim jacket with a relaxed fit. Perfect for layering, featuring button closure and chest pockets.',
    price: 89.99,
    imgSrc: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    isFavorite: false,
    badges: ['M', 'Blue'],
  },
  {
    id: '4',
    title: 'Converse Chuck Taylor All Star',
    description:
      'Iconic canvas sneakers with rubber toe cap and classic high-top design. A wardrobe essential for everyday style.',
    price: 59.99,
    imgSrc: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
    isFavorite: true,
    badges: ['EU40', 'Red'],
  },
  {
    id: '5',
    title: 'Cotton Hoodie',
    description:
      'Comfortable oversized hoodie made from premium cotton blend. Features drawstring hood and front kangaroo pocket.',
    price: 49.99,
    imgSrc: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    isFavorite: false,
    badges: ['L', 'Grey'],
  },
  {
    id: '6',
    title: 'Leather Chelsea Boots',
    description:
      'Sophisticated Chelsea boots crafted from genuine leather with elastic side panels and durable rubber sole.',
    price: 149.99,
    imgSrc: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500',
    isFavorite: true,
    badges: ['EU41', 'Brown'],
  },
];
