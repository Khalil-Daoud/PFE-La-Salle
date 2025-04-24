
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Categories />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi nous choisir</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
             Nous nous engageons à fournir des produits haut de gamme avec un service client exceptionnel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm animate-slide-up">
              <div className="h-14 w-14 rounded-full text-red-600/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualité premium</h3>
              <p className="text-muted-foreground">
                Nous nous approvisionnons uniquement en produits de la meilleure qualité, vous garantissant ainsi une qualité supérieure à chaque achat.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="h-14 w-14 rounded-full text-red-600/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Livraison rapide</h3>
              <p className="text-muted-foreground">
                Bénéficiez d'options d'expédition rapides et fiables, avec une livraison accélérée gratuite sur les commandes éligibles.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="h-14 w-14 rounded-full text-red-600/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Paiement sécurisé</h3>
              <p className="text-muted-foreground">
                Achetez en toute confiance en sachant que vos transactions sont protégées par des mesures de sécurité de pointe.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Rester à jour</h2>
            <p className="text-muted-foreground mb-8">
              Abonnez-vous à notre newsletter pour recevoir des mises à jour sur les nouveaux produits, des offres spéciales et des conseils techniques.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 rounded-l-full rounded-r-full sm:rounded-r-none px-5 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="text-red-600 text-white rounded-l-full rounded-r-full sm:rounded-l-none px-6 py-3 font-medium hover:text-red-600/90 transition-colors">
                S'abonner
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              En vous abonnant, vous acceptez notre politique de confidentialité et consentez à recevoir des mises à jour de notre entreprise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
