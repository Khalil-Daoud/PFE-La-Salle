import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen,
    subtotal 
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] flex flex-col bg-background shadow-xl animate-slide-in">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Votre panier</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Articles du panier */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Votre panier est vide</h3>
              <p className="text-muted-foreground mb-6">
                Il semble que vous n'ayez encore rien ajouté à votre panier.
              </p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="rounded-full"
                asChild
              >
                <Link to="/products">
                  Commencer vos achats
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex items-start space-x-4 pb-6 border-b"
                >
                  <Link 
                    to={`/products/${item.product.id}`}
                    className="h-20 w-20 rounded-md overflow-hidden bg-secondary flex-shrink-0"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/products/${item.product.id}`}
                      className="font-medium hover:text-primary transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      {item.product.name}
                    </Link>
                    
                    <p className="text-sm text-muted-foreground">
                      {item.product.price.toFixed(2)} DT
                    </p>
                    
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 flex items-center justify-center rounded-full border text-foreground/70 hover:text-foreground disabled:opacity-50"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="mx-3 w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-full border text-foreground/70 hover:text-foreground"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-medium">
                      {(item.product.price * item.quantity).toFixed(2)} DT
                    </span>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="mt-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Supprimer l'article"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Résumé */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-medium">{subtotal.toFixed(2)} DT</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="font-medium">Calculée lors du paiement</span>
            </div>
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{subtotal.toFixed(2)} DT</span>
            </div>
            
            <div className="rounded-md bg-secondary/50 p-4 flex items-start space-x-3">
              <AlertCircle size={20} className="flex-shrink-0 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Les taxes et frais de livraison sont calculés lors du paiement. Livraison gratuite à partir de 100 DT d’achat.
              </p>
            </div>
            
            <Button 
              size="lg"
              className="w-full rounded-full"
              onClick={handleCheckout}
            >
              Passer à la caisse <ChevronRight size={16} />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full"
              onClick={() => setIsCartOpen(false)}
            >
              Continuer vos achats
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
