
import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen font-sans text-primary">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Discover Our Collection</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">Curated pieces for the modern individual. Powered by AI insights.</p>
          </div>
          <ProductList />
        </main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
