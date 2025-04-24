
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentTab, setCurrentTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Find the product by id
  const product = products.find(p => p.id === id);
  
  // Related products (same category, excluding current product)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setIsImageLoaded(false);
    window.scrollTo(0, 0);
  }, [id]);
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Mock product images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    // Additional images could be added here
  ];
  

return (
  <div className="min-h-screen pt-24 pb-16 bg-background">
    <div className="container mx-auto px-6">
      {/* Fil d'Ariane */}
      <div className="mb-8">
        <nav className="flex items-center text-sm space-x-1">
          <Link to="/" className="text-muted-foreground hover:text-red-600">
            Accueil
          </Link>
          <ChevronRight size={16} className="text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-red-600">
            Produits
          </Link>
          <ChevronRight size={16} className="text-muted-foreground" />
          <Link 
            to={`/products?category=${product.category}`} 
            className="text-muted-foreground hover:text-red-600"
          >
            {product.category}
          </Link>
          <ChevronRight size={16} className="text-muted-foreground" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Images du produit */}
        <div className="lg:w-1/2 space-y-4">
          <div className="relative bg-white rounded-xl overflow-hidden h-[400px] sm:h-[500px] shadow-sm">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
            )}
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Badge vedette */}
            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-primary font-medium">
                Vedette
              </Badge>
            )}
          </div>
          
          {/* Miniatures */}
          {productImages.length > 1 && (
            <div className="flex space-x-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-md h-20 w-20 border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                  aria-label={`Voir l'image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Infos produit */}
        <div className="lg:w-1/2">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">{product.category}</Badge>
              <span className="text-sm text-muted-foreground">ID : {product.id}</span>
            </div>
            
            <div className="text-2xl font-bold mb-6">
              {product.price.toFixed(2)} $
            </div>
            
            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>
            
            {/* Sélecteur de quantité */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Quantité</h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-l-md border border-border flex items-center justify-center bg-secondary hover:bg-secondary/80 disabled:opacity-50"
                  aria-label="Diminuer la quantité"
                >
                  -
                </button>
                <div className="h-10 w-14 border-y border-border flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="h-10 w-10 rounded-r-md border border-border flex items-center justify-center bg-secondary hover:bg-secondary/80"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                size="lg" 
                className="flex-1 rounded-full"
                onClick={handleAddToCart}
              >
                Ajouter au panier
                <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 rounded-full"
              >
                Ajouter à la liste de souhaits
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Avantages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Truck className="h-5 w-5 text-red-600" />
                <span className="text-sm">Livraison gratuite dès 100 $</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="text-sm">Garantie 2 ans incluse</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <RotateCcw className="h-5 w-5 text-red-600" />
                <span className="text-sm">Retour facile sous 30 jours</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Paiement sécurisé</span>
              </div>
            </div>
          </div>
          
          {/* Onglets produit */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="animate-fade-in">
              <div className="space-y-4">
                <p>
                  {product.description} Ce produit haut de gamme offre une qualité et des performances exceptionnelles, conçu avec soin et fabriqué avec les meilleurs matériaux disponibles.
                </p>
                <p>
                  Découvrez le mélange parfait de style, de fonctionnalité et d'innovation qui distingue {product.name} de la concurrence. Que vous soyez un professionnel ou un passionné, ce produit dépassera vos attentes.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="animate-fade-in">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <div className="font-medium">Catégorie</div>
                  <div className="col-span-2 capitalize">{product.category}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <div className="font-medium">Modèle</div>
                  <div className="col-span-2">{product.name} Série Pro</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <div className="font-medium">Garantie</div>
                  <div className="col-span-2">Garantie limitée de 2 ans</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <div className="font-medium">Dimensions</div>
                  <div className="col-span-2">Varie selon le modèle</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2">
                  <div className="font-medium">Contenu de la boîte</div>
                  <div className="col-span-2">1x {product.name}, Manuel d'utilisation, Carte de garantie</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-fade-in">
              <div className="space-y-4">
                <p className="text-center py-4">
                  Aucun avis pour l’instant. Soyez le premier à donner votre avis.
                </p>
                
                <Button className="w-full" variant="outline">
                  Écrire un avis
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Produits similaires */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Produits similaires</h2>
            <Button variant="ghost" asChild>
              <Link to={`/products?category=${product.category}`}>
                Voir tout <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <div 
                key={relatedProduct.id}
                className="animate-slide-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);


};

export default ProductDetail;
