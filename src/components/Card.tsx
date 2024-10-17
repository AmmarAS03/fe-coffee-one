import React from 'react';
import { useCart } from '../../src/context/CartContext';

interface CardProps {
  image: string;
  name: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ image, name, price }) => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover p-5" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{price}</p>
        <button
          onClick={() => addToCart(name, price)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;