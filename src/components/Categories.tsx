
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/data';

const Categories = () => {
  // return (
  //   <section className="py-20 bg-secondary/50">
  //     <div className="container mx-auto px-6">
  //       <div className="text-center mb-12 animate-fade-in">
  //         <h2 className="text-3xl md:text-4xl font-bold mb-4">Acheter par catégorie</h2>
  //         <p className="text-muted-foreground max-w-2xl mx-auto">
  //           Parcourez nos collections organisées par catégorie pour trouver exactement ce que vous recherchez.
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //         {categories.map((category, index) => (
  //           <Link 
  //             key={category.id}
  //             to={`/products?category=${category.name.toLowerCase()}`}
  //             className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover-lift animate-slide-up"
  //             style={{ animationDelay: `${index * 0.1}s` }}
  //           >
  //             <div className="relative h-60 overflow-hidden">
  //               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
  //               <img
  //                 src={category.image}
  //                 alt={category.name}
  //                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  //               />
  //               <div className="absolute inset-0 flex items-center justify-center">
  //                 <div className="text-center text-white">
  //                   <h3 className="text-xl font-bold mb-2 drop-shadow-md">{category.name}</h3>
  //                   <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm transition-all duration-300 group-hover:bg-white/30">
  //                     Parcourir les produits
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Categories;
