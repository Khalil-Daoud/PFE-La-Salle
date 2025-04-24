
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import ShippingStep from '../components/checkout/ShippingStep';
import PaymentStep from '../components/checkout/PaymentStep';
import ReviewStep from '../components/checkout/ReviewStep';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import { Steps } from '../components/checkout/Steps';

const Checkout = () => {
  const { cartItems, totalItems  } = useCart();
  const { checkoutState } = useCheckout();
  const navigate = useNavigate();
  const [ orderId,setOrderId] = useState<string | null>(null);
  console.log(totalItems)
  // Check if cart is empty, redirect to products if it is
  useEffect(() => {
    if (totalItems === 0 && !orderId) {
      navigate('/products');
    }
  }, [totalItems, navigate, orderId]);

  console.log(orderId)


  const renderStep = () => {
    switch (checkoutState.step) {
      case 1:
        return <ShippingStep />;
      case 2:
        return <PaymentStep />;
      case 3:
        return <ReviewStep setOrderId={setOrderId} />;
      case 4:
        return <OrderConfirmation orderId={orderId} />;
      default:
        return <ShippingStep />;
    }
  };

  if (totalItems === 0 && !orderId) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <Steps currentStep={checkoutState.step} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
