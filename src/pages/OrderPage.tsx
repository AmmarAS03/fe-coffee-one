import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext";
import { fetchCoffeeItems, CoffeeItem } from "../api/coffeeItems";

const OrderPage: React.FC = () => {
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoffeeItems()
      .then((data) => {
        setCoffeeItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coffee items:", error);
        setError("Failed to load coffee items. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-5 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            Coffee Order
          </h1>
          <p className="text-gray-600 mt-2">
            Select your favorite brews and enjoy!
          </p>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-2/3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coffeeItems?.map((coffee: CoffeeItem) => (
                  <Card key={coffee._id} {...coffee} />
                ))}
              </div>
            )}
          </main>
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              <Cart />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
