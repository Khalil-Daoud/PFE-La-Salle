import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCheckout } from '../../context/CheckoutContext';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';

const PaymentStep = () => {
  const { checkoutState, savePaymentMethod, setStep } = useCheckout();
  const [paymentMethod, setPaymentMethod] = React.useState(
    checkoutState.paymentMethod.method || 'Carte de crédit'
  );

  const handleContinue = () => {
    savePaymentMethod({ method: paymentMethod });
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Méthode de paiement</h2>
        <p className="text-muted-foreground">Choisissez votre méthode de paiement</p>
      </div>

      <div className="bg-secondary/50 p-6 rounded-lg">
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-all duration-200">
            <RadioGroupItem value="Carte de crédit" id="creditCard" />
            <Label htmlFor="creditCard" className="flex items-center flex-1 cursor-pointer">
              <CreditCard className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="font-medium">Carte de crédit / débit</p>
                <p className="text-sm text-muted-foreground">Payez en toute sécurité avec votre carte</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-all duration-200">
            <RadioGroupItem value="PayPal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center flex-1 cursor-pointer">
              <Wallet className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-muted-foreground">Payez via votre compte PayPal</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <p className="text-sm text-muted-foreground">
        Toutes les transactions sont sécurisées et cryptées. Vos informations de paiement ne sont jamais stockées.
      </p>

      <div className="flex justify-between">
        <Button type="button" variant="outline" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la livraison
        </Button>
        
        <Button type="button" className="rounded-full" onClick={handleContinue}>
          Vérifier la commande
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
