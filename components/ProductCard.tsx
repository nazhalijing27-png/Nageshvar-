
import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { generateProductDescription } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [aiDescription, setAiDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAiDescription, setShowAiDescription] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleGenerateDescription = async () => {
    setIsLoading(true);
    setShowAiDescription(true);
    const description = await generateProductDescription(product.name);
    setAiDescription(description);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative pt-[100%]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
       <div className="px-4 pb-4">
         <button 
           onClick={handleGenerateDescription}
           disabled={isLoading}
           className="w-full flex items-center justify-center gap-2 text-sm text-accent font-semibold py-2 px-4 border border-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <SparklesIcon />
           {isLoading ? 'Generating...' : 'Describe with AI'}
         </button>
       </div>
       {showAiDescription && (
         <div 
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setShowAiDescription(false)}
        >
           <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="flex justify-center mb-4">
               <SparklesIcon className="w-8 h-8 text-accent" />
             </div>
             <h4 className="font-bold text-lg mb-2">{product.name}</h4>
             {isLoading ? (
               <div className="flex justify-center items-center h-24">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
               </div>
             ) : (
                <p className="text-gray-600">{aiDescription}</p>
             )}
             <button 
                onClick={() => setShowAiDescription(false)} 
                className="mt-6 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
             >
                Close
             </button>
           </div>
         </div>
       )}
    </div>
  );
};

export default ProductCard;
