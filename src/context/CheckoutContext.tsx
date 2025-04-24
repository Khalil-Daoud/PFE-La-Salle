import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { ENDPOINTS } from '../api/config';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  method: string;
}

interface User {
  name: string;
  email: string;
  id?: string; // Ensure id, not userId
}

interface CheckoutState {
  step: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  user: User | null;
}

interface CheckoutContextType {
  checkoutState: CheckoutState;
  setStep: (step: number) => void;
  saveShippingAddress: (data: ShippingAddress) => void;
  savePaymentMethod: (data: PaymentMethod) => void;
  saveUserInfo: (data: User) => void;
  placeOrder: () => Promise<string | null>;
  isLoading: boolean;
}

const initialCheckoutState: CheckoutState = {
  step: 1,
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: {
    method: 'Credit Card',
  },
  user: null,
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Initial user from localStorage:', parsedUser);
        if (parsedUser && parsedUser.id) {
          return { ...initialCheckoutState, user: parsedUser };
        } else {
          console.warn('User data missing id:', parsedUser);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    return initialCheckoutState;
  });
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Sync user state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      console.log('Storage change detected, userData:', userData);
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('Parsed user from storage change:', parsedUser);
          if (parsedUser && parsedUser.id) {
            setCheckoutState(prevState => ({
              ...prevState,
              user: parsedUser,
            }));
          } else {
            console.warn('User data missing id on storage change:', parsedUser);
            setCheckoutState(prevState => ({
              ...prevState,
              user: null,
            }));
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error parsing user data on storage change:', error);
          localStorage.removeItem('user');
        }
      } else {
        setCheckoutState(prevState => ({
          ...prevState,
          user: null,
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setStep = (step: number) => {
    setCheckoutState(prevState => ({
      ...prevState,
      step,
    }));
  };

  const saveShippingAddress = (data: ShippingAddress) => {
    setCheckoutState(prevState => ({
      ...prevState,
      shippingAddress: data,
      step: 2,
    }));
  };

  const savePaymentMethod = (data: PaymentMethod) => {
    setCheckoutState(prevState => ({
      ...prevState,
      paymentMethod: data,
      step: 3,
    }));
  };

  const saveUserInfo = useCallback((data: User) => {
    console.log('saveUserInfo called with:', data);
    if (!data.id) {
      console.warn('Attempted to save user without id:', data);
      return;
    }
    setCheckoutState(prevState => ({
      ...prevState,
      user: data,
    }));
    localStorage.setItem('user', JSON.stringify(data));
    console.log('User info saved to localStorage:', data);
  }, []);

  const placeOrder = async (): Promise<string | null> => {
    console.log('placeOrder called, current checkoutState:', JSON.stringify(checkoutState, null, 2));
    if (!checkoutState.user || !checkoutState.user.id) {
      console.error('User or user.id missing:', checkoutState.user);
      toast.error("User information or user ID is missing. Please log in again.");
      navigate('/login');
      return null;
    }

    try {
      setIsLoading(true);

      console.log('User:', JSON.stringify(checkoutState.user, null, 2));
      console.log('Cart items:', JSON.stringify(cartItems, null, 2));

      const shippingPrice = subtotal > 100 ? 0 : 10;
      const taxRate = 0.15;
      const tax = parseFloat((subtotal * taxRate).toFixed(2));
      const total = subtotal + shippingPrice + tax;

      const items = cartItems.map((item, index) => {
        const productId = item.product._id || item.product.id;
        if (!productId) {
          throw new Error(`Product ID missing for cart item at index ${index}`);
        }
        return {
          productId,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity
        };
      });

      const orderData = {
        user: checkoutState.user.id,
        items,
        shippingAddress: checkoutState.shippingAddress,
        paymentMethod: checkoutState.paymentMethod.method,
        subtotal,
        shippingPrice,
        tax,
        total
      };

      console.log('Sending order data:', JSON.stringify(orderData, null, 2));

      const token = localStorage.getItem('token');
      console.log('Token being sent:', token);
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(ENDPOINTS.ORDERS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(`Failed to create order: ${errorData.message || 'Unknown error'}`);
      }

      const createdOrder = await response.json();
      console.log('Order saved successfully:', createdOrder);
      clearCart();
      setCheckoutState(prevState => ({
        ...initialCheckoutState,
        user: prevState.user, // Preserve user
      }));
      toast.success('Order placed successfully!');
      navigate(`/order/${createdOrder._id}`);
      return createdOrder._id;
    } catch (error) {
      console.error('Place order error:', error);
      toast.error(`Failed to place order: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutState,
        setStep,
        saveShippingAddress,
        savePaymentMethod,
        saveUserInfo,
        placeOrder,
        isLoading
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};