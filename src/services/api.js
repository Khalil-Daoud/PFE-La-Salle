import { ENDPOINTS } from "../api/config.ts";

const apiRequest = async (url, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return apiRequest(ENDPOINTS.AUTH.UPDATE_PROFILE, "PUT", profileData, token);
};

export const login = async (credentials) => {
  return apiRequest(ENDPOINTS.AUTH.LOGIN, "POST", credentials);
};

export const register = async (userData) => {
  return apiRequest(ENDPOINTS.AUTH.REGISTER, "POST", userData);
};

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  // Ensure product IDs are valid ObjectIds
  const validatedOrderData = {
    ...orderData,
    items: orderData.items.map((item) => ({
      ...item,
      productId: item.productId, // Make sure this is a 24-character hex string
    })),
  };

  return apiRequest(ENDPOINTS.ORDERS.CREATE, "POST", validatedOrderData, token);
};
