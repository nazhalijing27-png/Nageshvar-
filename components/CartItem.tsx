
import React from 'react';
import type { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  const handleQuantityChange = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button onClick={() => handleQuantityChange(item.quantity - 1)} className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-50" disabled={item.quantity <= 1}><MinusIcon /></button>
            <span className="px-3 text-center w-12">{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.quantity + 1)} className="p-1 text-gray-500 hover:text-gray-800"><PlusIcon /></button>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
            >
              <TrashIcon />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
