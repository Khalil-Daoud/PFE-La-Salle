
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
    INIT: `${API_URL}/products/init`,
    CREATE: `${API_URL}/products/create`, // Fixed typo
    UPDATE: (id: string) => `${API_URL}/products/${id}`,
    DELETE: (id: string) => `${API_URL}/products/${id}`,
    GET_ONE_DATA: (id: string) => `${API_URL}/products/data/${id}`


  },
  ORDERS: {
    GET_ALL: `${API_URL}/orders/all`, // Updated from "/api/orders" to "/api/orders/all"
    CREATE: `${API_URL}/orders`,
    GET_ONE: (id: string) => `${API_URL}/orders/${id}`,
    UPDATE_TO_PAID: (id: string) => `${API_URL}/orders/${id}/pay`,
    DELETE: (id: string) => `${API_URL}/orders/${id}`, // Add this line

  },

  DATA: {
    GET_ONE: (id: string) => `${API_URL}/data/${id}`,
    GET_ALL: `${API_URL}/data`,
    CREATE: `${API_URL}/data`,
    UPDATE: (id: string) => `${API_URL}/data/${id}`,
  },

  CONTACT: {
    CREATE: `${API_URL}/contact`,
    GET_ALL: `${API_URL}/contact`,

  },

  EMPLOYEES: {
    GET_ALL: `${API_URL}/users`,
    CREATE: `${API_URL}/users`,
    GET_ONE: (id) => `${API_URL}/users/${id}`,
    UPDATE: (id) => `${API_URL}/users/${id}`,
    DELETE: (id) => `${API_URL}/users/${id}`
  }





};
