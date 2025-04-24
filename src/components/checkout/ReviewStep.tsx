
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard } from 'lucide-react';

interface ReviewStepProps {
  setOrderId: (id: string | null) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ setOrderId }) => {
  const { cartItems, subtotal } = useCart();
  const { checkoutState, setStep, placeOrder, isLoading } = useCheckout();
  
  // Fixed shipping price calculation
  const shippingPrice = subtotal > 100 ? 0 : 10;
  const taxRate = 0.15; // 15% tax
  const tax = parseFloat((subtotal * taxRate).toFixed(2));
  const total = subtotal + shippingPrice + tax;

  const handlePlaceOrder = async () => {
    const orderId = await placeOrder();
    if (orderId) {
      setOrderId(orderId);
      setStep(4);
    }
  };

  const handleBack = () => {
    setStep(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="tex
        t-2xl font-semibold mb-1">Vérification de la commande</h2>
        <p className="text-muted-foreground">Veuillez vérifier votre commande avant de la valider</p>
      </div>
  
      {/* Informations de livraison */}
      <div className="bg-secondary/30 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium text-lg">Informations de livraison</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setStep(1)}
            className="text-xs"
          >
            Modifier
          </Button>
        </div>
        <div className="pl-7">
          <p>{checkoutState.shippingAddress.address}</p>
          <p>
            {checkoutState.shippingAddress.city}, {checkoutState.shippingAddress.postalCode}
          </p>
          <p>{checkoutState.shippingAddress.country}</p>
        </div>
      </div>
  
      {/* Méthode de paiement */}
      <div className="bg-secondary/30 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium text-lg">Méthode de paiement</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setStep(2)}
            className="text-xs"
          >
            Modifier
          </Button>
        </div>
        <div className="pl-7">
          <p>{checkoutState.paymentMethod.method}</p>
        </div>
      </div>
  
      {/* Articles de la commande */}
      <div className="bg-secondary/30 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <ShoppingBag className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium text-lg">Articles commandés</h3>
        </div>
        <div className="space-y-4 mt-2">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded overflow-hidden bg-secondary flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.product.price.toFixed(2)} DT x {item.quantity}
                </p>
              </div>
              <p className="font-medium">{(item.product.price * item.quantity).toFixed(2)} DT</p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Résumé de la commande */}
      <div className="bg-secondary/50 p-6 rounded-lg">
        <h3 className="font-medium text-lg mb-4">Résumé de la commande</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} DT</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>{shippingPrice === 0 ? 'Gratuit' : `${shippingPrice.toFixed(2)} DT`}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxe (15%)</span>
            <span>{tax.toFixed(2)} DT</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)} DT</span>
          </div>
        </div>
      </div>
  
      <div className="flex justify-between">
        <Button type="button" variant="outline" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au paiement
        </Button>
        
        <Button 
          type="button" 
          className="rounded-full" 
          onClick={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? 'Traitement en cours...' : 'Valider la commande'}
        </Button>
      </div>
    </div>
  );
  
};

export default ReviewStep;
