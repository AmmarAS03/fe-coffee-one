import React from 'react';
import Card from '../components/Card';
import Cart from '../components/Cart';
import { CartProvider } from '../context/CartContext';

const coffeeOptions = [
  { image: "https://athome.starbucks.com/sites/default/files/styles/recipe_banner_xlarge/public/2024-05/CaffeLatte_RecipeHeader_848x539_%402x.jpg.webp?itok=YSe_HTiQ", name: "Latte", price: "$3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDkwMZLgOZ1M9VbzhhjdXooCdiIEEr_L6ivND5s5Omq0YzawbBA0ajjiJQcmKdyAA3iI&usqp=CAU", name: "Long Black", price: "$3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL5OnIkVKLC8OjMhNGA71lcsqn4sQXI9q01tg7UGDbtSbHXFDb-0Hq8GiQyQSrJUzO1o&usqp=CAU", name: "Cappuccino", price: "$3" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ97Atbggvff461mN470aPZG4psebAHRp6bg&s", name: "Kopi Gula Aren (Brown Sugar Coffee)", price: "$3" },
  { image: "https://littlebitrecipes.com/wp-content/uploads/2023/07/iced-americano-sq.jpg", name: "Americano", price: "$3" },
];

const OrderPage: React.FC = () => {
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
              {coffeeOptions.map((coffee, index) => (
                <Card key={index} {...coffee} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default OrderPage;