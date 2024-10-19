const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface OrderSummary {
  coffee_name: string;
  quantity: number;
  name: string;
  email: string;
  delivery_option: string;
  building: string;
  room_location: string | null;
  selected_time: string;
}

export const fetchOrderSummary = async (date: string): Promise<OrderSummary[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/orders/summary?date=${date}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order summary');
    }
    const data: OrderSummary[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order summary:", error);
    throw error;
  }
};