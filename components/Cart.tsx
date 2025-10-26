
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { XIcon } from './icons/XIcon';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClose = () => {
    setIsAnimatingOut(true);
  };

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        onClose();
        setIsAnimatingOut(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimatingOut) {
    return null;
  }
  
  const animationClass = isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in" onClick={handleClose}>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col ${animationClass}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100">
            <XIcon />
          </button>
        </div>
        
        {state.items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500">Your cart is empty.</p>
            <button onClick={handleClose} className="mt-4 bg-accent text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-6">
              <ul className="divide-y divide-gray-200">
                {state.items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
