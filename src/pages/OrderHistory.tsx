import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchOrderHistory, OrderHistoryItem } from '../api/userHistory';

const OrderHistoryPage: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadOrderHistory = async () => {
      if (user && user.email) {
        try {
          setIsLoading(true);
          const history = await fetchOrderHistory(user.email);
          setOrderHistory(history);
        } catch (err) {
          setError('Failed to load order history. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadOrderHistory();
  }, [user]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orderHistory.map((order) => (
            <div key={order.orderId} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{order.coffee_name}</h2>
                <span className="text-gray-500">Order ID: {order.orderId}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Delivery Option:</strong> {order.delivery_option}</p>
                  <p><strong>Selected Time:</strong> {order.selected_time}</p>
                  <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div>
                  {order.room_location && (
                    <p><strong>Room:</strong> {order.room_location}</p>
                  )}
                  {order.building && (
                    <p><strong>Building:</strong> {order.building}</p>
                  )}
                  <p><strong>Notes:</strong> {order.notes || 'N/A'}</p>
                  <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;