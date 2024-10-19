import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loadCart } = useCart();
  const [orderDate, setOrderDate] = useState<string>("");
  const [orderTime, setOrderTime] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState<string>("pickup");
  const [building, setBuilding] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    setOrderDate(minDate);
  }, []);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const timeOptions = ["7am", "10am", "1pm", "5pm"];
  const buildingOptions = ["Elizabeth Building", "Charlotte Building"];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!orderDate) {
      newErrors.orderDate = "Please select an order date.";
    }
    if (!orderTime) {
      newErrors.orderTime = "Please select an order time.";
    }
    if ((deliveryOption === "delivery" && !roomNumber)) {
      newErrors.roomNumber =
        "Please enter your room number for delivery.";
    }

    if ((deliveryOption === "delivery" && !building)) {
        newErrors.building =
          "Please enter your building for delivery.";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      const orderDetails = {
        orderDate,
        orderTime,
        deliveryOption,
        building,
        roomNumber,
        notes,
      };

      navigate("/confirmation", { state: orderDetails });
    } else {
      console.log("Form validation failed");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="mt-4 mb-8 flex justify-between">
        <Link to="/order" className="text-blue-500 hover:text-blue-700">
          Back to Order
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="mb-4">
          <label htmlFor="orderDate" className="block mb-2">
            Order Date:
          </label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-2 border rounded ${
              errors.orderDate ? "border-red-500" : ""
            }`}
          />
          {errors.orderDate && (
            <p className="text-red-500 text-sm mt-1">{errors.orderDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="orderTime" className="block mb-2">
            Order Time:
          </label>
          <select
            id="orderTime"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.orderTime ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.orderTime && (
            <p className="text-red-500 text-sm mt-1">{errors.orderTime}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Delivery Option:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
                className="mr-2"
              />
              Pickup
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
                className="mr-2"
              />
              Delivery to Room
            </label>
          </div>
        </div>
        {deliveryOption === "pickup" && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Pickup location: Room 1103 StudentOne Elizabeth Street
            </p>
          </div>
        )}

        {deliveryOption === "delivery" && (
          <>
            <div className="px-2 mb-2">
              <label htmlFor="roomNumber" className="block mb-2">
                Room Number:
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors.roomNumber ? "border-red-500" : ""
                }`}
                placeholder="Enter your room number"
              />
              {errors.roomNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>
              )}
            </div>
            <div className="px-2 mb-2">
              <label htmlFor="orderTime" className="block mb-2">
                Building
              </label>
              <select
                id="orderTime"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className={`w-full p-2 mb-4 border rounded ${
                  errors.building ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Building</option>
                {buildingOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.building && (
                <p className="text-red-500 text-sm mt-1">{errors.building}</p>
              )}
            </div>
          </>
        )}
        <div className="mb-4">
          <label htmlFor="notes" className="block mb-2">
            Notes:
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          ></textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlaceOrder}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
