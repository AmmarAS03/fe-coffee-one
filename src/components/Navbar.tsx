import React from "react";
import { Link } from "react-router-dom";
import OrdersIcon from "../icon/order";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold w-5 h-5">
            <OrdersIcon />
          </div>
          <div>
            <Link to="/" className="text-white mr-4 hover:text-gray-300">
              Home
            </Link>
            <Link to="/order" className="text-white mr-4 hover:text-gray-300">
              Order
            </Link>
            <Link to="/admin/dashboard" className="text-white mr-4 hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
