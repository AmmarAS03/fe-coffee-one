import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { OrderDetails, placeOrder } from "../../src/api/orderCoffee";
import { useAuth } from "../context/AuthContext";
import { CartItem } from "../context/CartContext";

interface OrderFormData {
  orderDate: string;
  orderTime: string;
  deliveryOption: string;
  building: string;
  roomNumber?: string;
  notes: string;
}

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const orderFormData = location.state as OrderFormData;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const orderPromises = cart.map((item: CartItem) => {
        const orderDetails: OrderDetails = {
          coffee_name: item.name,
          quantity: item.quantity,
          name: user?.name || "Anonymous",
          email: user?.email || "Anonymous",
          delivery_option: orderFormData.deliveryOption,
          room_location:
            orderFormData.deliveryOption === "delivery"
              ? orderFormData.roomNumber || null
              : null,
          building: orderFormData.building,
          selected_time: orderFormData.orderTime,
          order_date: orderFormData.orderDate,
          notes: orderFormData.notes,
        };
        return placeOrder(orderDetails);
      });

      await Promise.all(orderPromises);

      clearCart();
      navigate("/order", { state: { orderDetails: orderFormData } });
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Order Confirmation
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-3">
        <p className="text-xl font-bold text-gray-800">Notes: </p>
        <p className="text-lg text-gray-800">
          For any changes please contact +61 0488888888
        </p>
        <p className="text-lg text-gray-800">
          Please show your transfer confirmation when picking up/delivery or
          send through whatsapp
        </p>
        <p className="text-lg text-gray-800">Pay id +61 0488888888</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cart.map((item, index) => (
          <div key={index} className="mb-2 flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{item.price}</span>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="mb-2">
          <span className="font-semibold">Order Date:</span>
          {orderFormData.orderDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Order Time:</span>{" "}
          {orderFormData.orderTime}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Delivery Option:</span>{" "}
          {orderFormData.deliveryOption}
        </div>
        {orderFormData.deliveryOption === "delivery" && (
          <div className="mb-2">
            <span className="font-semibold">Room Number:</span>{" "}
            {orderFormData.roomNumber}
          </div>
        )}
        {orderFormData.building === "delivery" && (
          <div className="mb-2">
            <span className="font-semibold">Building:</span>{" "}
            {orderFormData.building}
          </div>
        )}
        {orderFormData.deliveryOption === "pickup" && (
          <div className="mb-2">
            <span className="font-semibold">Pickup Location:</span> Room 1103
            StudentOne Elizabeth Street
          </div>
        )}
        {orderFormData.notes && (
          <div className="mb-2">
            <span className="font-semibold">Notes:</span> {orderFormData.notes}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold mb-4">Ready to confirm?</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleConfirmOrder}
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Confirm Delivery"}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
