const API_BASE_URL = 'http://localhost:5432';

export interface CoffeeItem {
  _id: string;
  image: string;
  name: string;
  price: string;
}

export const fetchCoffeeItems = async (): Promise<CoffeeItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch coffee items');
    }
    const data: CoffeeItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coffee items:", error);
    throw error;
  }
};