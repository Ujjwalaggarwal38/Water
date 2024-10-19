const API_BASE_URL = 'http://192.168.171.178:3000'; // Use ngrok URL if remote

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const fetchProductByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${name}:`, error);
  }
};
