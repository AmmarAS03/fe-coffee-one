import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Cart from '../components/Cart';
import { CartProvider } from '../context/CartContext';

// Define the interface for coffee items
interface CoffeeItem {
  _id: string;
  image: string;
  name: string;
  price: string;
}

const OrderPage: React.FC = () => {
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5432/api/items')
      .then(response => response.json())
      .then((data: CoffeeItem[]) => setCoffeeItems(data))
      .catch(error => console.error('Error fetching coffee items:', error));
  }, []);

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Order</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <Cart />
          </div>
          <div className="md:w-3/4 md:pl-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coffeeItems.map((coffee) => (
                <Card key={coffee._id} {...coffee} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default OrderPage;