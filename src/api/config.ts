
// API Configuration
export const API_URL = 'http://localhost:5000/api';

// API Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    UPDATE_PROFILE: `${API_URL}/auth/profile`
  },
  PRODUCTS: {
    GET_ALL: `${API_URL}/products`,
    GET_ONE: (id: string) => `${API_URL}/products/${id}`,
    INIT: `${API_URL}/products/init`
  },
  ORDERS: {
    GET_ALL: "http://localhost:5000/api/orders/all", // Updated from "/api/orders" to "/api/orders/all"
    CREATE: `${API_URL}/orders`,
    GET_ONE: (id: string) => `${API_URL}/orders/${id}`,
    UPDATE_TO_PAID: (id: string) => `${API_URL}/orders/${id}/pay`,
    DELETE: (id: string) => `${API_URL}/orders/${id}`, // Add this line

  }



};
