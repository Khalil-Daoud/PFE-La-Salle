import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderConfirmationProps {
  orderId: string | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  if (!orderId) {
    return null;
  }

  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Commande passée avec succès !</h2>
      <p className="text-muted-foreground mb-6">
        Merci pour votre commande. Votre numéro de commande est #{orderId.substring(orderId.length - 8)}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link to={`/orders/${orderId}`}>
          <Button className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Voir les détails de la commande
          </Button>
        </Link>
        
        <Link to="/products">
          <Button variant="outline" className="w-full">
            Continuer vos achats
          </Button>
        </Link>
      </div>

      <div className="bg-muted p-4 rounded-lg text-left max-w-md mx-auto">
        <p className="text-sm font-medium mb-2">Que se passe-t-il ensuite ?</p>
        <ul className="text-sm space-y-2 text-muted-foreground">
          <li>• Vous recevrez un e-mail de confirmation de commande.</li>
          <li>• Nous traiterons votre commande dans les 24 heures.</li>
          <li>• Vous pouvez suivre votre commande dans votre tableau de bord.</li>
          <li>• Pour toute question, veuillez contacter notre service client.</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;
