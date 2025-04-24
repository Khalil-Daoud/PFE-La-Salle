
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { products } from '../lib/data';




const API_URL = 'http://localhost:5000/api/products?featured=true'; // URL pour les produits phares

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Récupération des produits phares
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits phares:', error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 animate-fade-in">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits phares</h2>
            <p className="text-muted-foreground max-w-2xl">
              Découvrez notre sélection triée sur le volet de produits haut de gamme, choisis pour leur qualité exceptionnelle et leurs fonctionnalités innovantes.
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/products" className="flex items-center">
              Voir tous les produits <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.length === 0 ? (
            <p className="text-center col-span-full">Aucun produit phare trouvé.</p>
          ) : (
            featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};


export default FeaturedProducts;
