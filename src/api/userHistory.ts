const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface OrderHistoryItem {
  orderId: string;
  coffee_name: string;
  quantity: number;
  name: string;
  email: string;
  delivery_option: string;
  building: string;
  room_location: string | null;
  selected_time: string;
  order_date: string;
  created_at: string;
  notes: string;
}

export const fetchOrderHistory = async (email: string): Promise<OrderHistoryItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/user/orders?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order history');
    }

    const data: OrderHistoryItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};