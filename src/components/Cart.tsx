import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../src/context/CartContext';
import DecrementIcon from "../icon/decrement";

const Cart: React.FC = () => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();
  
    const handleCheckout = () => {
      navigate('/checkout');
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <span>{item.name} - {item.price} x {item.quantity}</span>
                  <DecrementIcon onClick={() => removeFromCart(item.name)} />
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default Cart;