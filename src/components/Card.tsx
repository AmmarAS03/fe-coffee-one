import React from "react";
import { useCart } from "../../src/context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  name: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ image, name, price }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(name, price);
    } else {
      // Redirect to login page
      navigate("/login", { state: { from: "/order" } });
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div>
        <div className="p-5 relative">
          <img
            className="w-full h-56 object-cover rounded-xl"
            src={image}
            alt={name}
          />
        </div>
        <div className="p-4 py-0">
          <h2 className="font-semibold text-xl mb-2 text-gray-800">{name}</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-lg font-medium">$ {price}</p>
          </div>
        </div>
        <div className="px-3 mb-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
