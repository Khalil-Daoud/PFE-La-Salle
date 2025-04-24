
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../context/CartContext';
import { Product } from '../lib/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-white/90 hover:bg-white rounded-full shadow-md w-10 h-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              aria-label="Commander"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary"
              className="bg-white/90 hover:bg-white rounded-full shadow-md w-10 h-10"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Link to={`/products/${product.id}`}>
              <Button 
                size="icon" 
                variant="secondary"
                className="bg-white/90 hover:bg-white rounded-full shadow-md w-10 h-10"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <Badge className="absolute top-3 left-3 text-red-600 font-medium">
            Featured
          </Badge>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium mb-1 hover:text-red-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{product.price.toFixed(2)} DT</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-60 hover:text-red-600 -mr-2"
            onClick={() => addToCart(product)}
          >
            
            <ShoppingCart className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
