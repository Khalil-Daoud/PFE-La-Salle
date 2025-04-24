
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience exceptional sound quality with these premium noise-cancelling headphones. Perfect for music lovers and audiophiles.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "audio",
    featured: true
  },
  {
    id: "2",
    name: "Montre connectée série 5",
    description: "Restez connecté et suivez votre forme physique avec cette montre connectée élégante. Elle comprend un moniteur de fréquence cardiaque, un GPS et bien plus encore.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "wearables",
    featured: true
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with this professional-grade camera. Includes multiple lenses and accessories.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "cameras",
    featured: true
  },
  {
    id: "4",
    name: "Ultra-Thin Laptop Pro",
    description: "Powerful yet lightweight laptop perfect for professionals. Features a stunning display and all-day battery life.",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "computers",
    featured: true
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with remarkable sound quality and comfort. Perfect for workouts and daily use.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "audio",
    featured: false
  },
  {
    id: "6",
    name: "Gaming Console XS",
    description: "Next-generation gaming console with stunning graphics and extensive game library. Includes one controller.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "gaming",
    featured: false
  },
  {
    id: "7",
    name: "4K Smart TV",
    description: "Immerse yourself in stunning 4K resolution. This smart TV features voice control and access to all your favorite streaming services.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "tvs",
    featured: true
  },
  {
    id: "8",
    name: "Tablet Pro 12.9\"",
    description: "The ultimate tablet experience for creatives and professionals. Features a stunning display and powerful processor.",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "tablets",
    featured: false
  },

  {
    id: "9",
    name: "Ooredoo 4G+ Home Box",
    description: "Profitez d'une connexion Internet illimitée à haute vitesse avec la Home Box 4G+ de Ooredoo. Idéale pour toute la famille.",
    price: 999.99,
    image: "https://www.ooredoo.tn/Business/5843-large_default/4g-box.jpg",
    category: "internet",
    featured: true
  },

  {
    id: "10",
    name: "Ooredoo FIXE JDID 5G",
    description: "Profitez d'une connexion Internet illimitée à haute vitesse avec la Home Box 5G de Ooredoo. Idéale pour toute la famille.",
    price: 70,
    image: "https://www.ooredoo.tn/Personal/img/cms/VAS/la%20Liga/1200x1200-Fixe-JDID-5G.png",
    category: "internet",
    featured: false
  },

  {
    id: "12",
    name: "Samsung Galaxy S23 Ultra",
    description: "Le Samsung Galaxy S23 Ultra allie performance extrême, appareil photo de 200 MP et S Pen intégré pour une productivité accrue.",
    price: 4200,
    image: "https://www.samsungtunisie.tn/11155-home_default/samsung-galaxy-s23-ultra-prix-tunisie.jpg",
    category: "smartphone",
    featured: false
  },

  {
    id: "13",
    name: "Redmi Note 13 Pro+ 5G",
    description: "Le Redmi Note 13 Pro+ 5G est un smartphone puissant avec un écran AMOLED 120Hz, une batterie longue durée et un appareil photo de 200 MP.",
    price: 1600,
    image: "https://www.xiaomistore.tn/wp-content/webp-express/webp-images/uploads/2024/01/Redmi-Note-13-Pro-Plus-5G-purple.png.webp",
    category: "smartphone",
    featured: false
  },


  {
    id: "14",
    name: "iPhone 15 Pro Max",
    description: "L’iPhone 15 Pro Max, avec sa puce A17 Pro, son châssis en titane et ses fonctionnalités photo avancées, offre une expérience haut de gamme.",
    price: 5900,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692904322634",
    category: "smartphone",
    featured: false
  }







];

export const categories: Category[] = [
  {
    id: "1",
    name: "Audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "2",
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "4",
    name: "Computers",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];
