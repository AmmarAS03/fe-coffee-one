import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { cart, loadCart } = useCart();
  const [orderDate, setOrderDate] = useState<string>('');
  const [orderTime, setOrderTime] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<string>('pickup');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    // Set the minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    setOrderDate(minDate);
  }, []);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  const timeOptions = ['07:00', '10:00', '13:00', '17:00'];

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
            <span>{item.name} x {item.quantity}</span>
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
          <label htmlFor="orderDate" className="block mb-2">Order Date:</label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="orderTime" className="block mb-2">Order Time:</label>
          <select
            id="orderTime"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Delivery Option:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={() => setDeliveryOption('pickup')}
                className="mr-2"
              />
              Pickup
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="delivery"
                checked={deliveryOption === 'delivery'}
                onChange={() => setDeliveryOption('delivery')}
                className="mr-2"
              />
              Delivery to Room
            </label>
          </div>
        </div>
        {deliveryOption === 'pickup' && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Pickup location: Room 1103 StudentOne Elizabeth Street</p>
          </div>
        )}

        {deliveryOption === 'delivery' && (
          <div className="mb-4">
            <label htmlFor="roomNumber" className="block mb-2">Room Number:</label>
            <input
              type="text"
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your room number"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="notes" className="block mb-2">Notes:</label>
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
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;