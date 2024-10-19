// src/api/order.ts

const API_BASE_URL = 'http://localhost:5432';

export interface OrderDetails {
    coffee_name: string;
    quantity: number;
    name: string;
    email: string;
    delivery_option: string;
    building: string;
    room_location: string | null;
    selected_time: string;
    order_date: string;
    notes?: string;
  }

export const placeOrder = async (orderData: OrderDetails): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/orders/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};