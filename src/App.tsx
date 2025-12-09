import Header from '@/components/Header';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCart from '@/components/ProductCart';

function App() {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Product Carousel
          </h1>
        </div>

        <div className="mx-auto max-w-7xl">
          <ProductCarousel />
        </div>
      </main>

      <ProductCart />
    </div>
  );
}

export default App;
