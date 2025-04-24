
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  // return (
  //   <footer className="bg-secondary pt-16 pb-6">
  //     <div className="container mx-auto px-6">
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
  //         {/* Company Info */}
  //         <div>
  //           <h3 className="text-xl font-bold mb-4">Ooredoo el Hamma</h3>
  //           <p className="text-muted-foreground mb-4">
  //             Premium shopping experience for technology enthusiasts and lifestyle connoisseurs.
  //           </p>
  //           <div className="flex space-x-4">
  //             <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Facebook">
  //               <Facebook size={20} />
  //             </a>
  //             <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Twitter">
  //               <Twitter size={20} />
  //             </a>
  //             <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Instagram">
  //               <Instagram size={20} />
  //             </a>
  //             <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Youtube">
  //               <Youtube size={20} />
  //             </a>
  //           </div>
  //         </div>

  //         {/* Quick Links */}
  //         <div>
  //           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
  //           <ul className="space-y-2">
  //             <li>
  //               <Link to="/" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Home
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/products" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Products
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/about" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 About Us
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/contact" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Contact
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Privacy Policy
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>

  //         {/* Customer Service */}
  //         <div>
  //           <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
  //           <ul className="space-y-2">
  //             <li>
  //               <Link to="/faq" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 FAQ
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/shipping" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Shipping Information
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/returns" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Returns & Exchanges
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/payment" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Payment Methods
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/warranty" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 Warranty Information
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>

  //         {/* Contact Info */}
  //         <div>
  //           <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
  //           <ul className="space-y-3">
  //             <li className="flex items-start">
  //               <MapPin size={18} className="mr-2 text-red-600 flex-shrink-0 mt-1" />
  //               <span className="text-muted-foreground">
  //               11 Av. Kheireddine Pacha, Tunis 1002
  //               </span>
  //             </li>
  //             <li className="flex items-center">
  //               <Phone size={18} className="mr-2 text-red-600 flex-shrink-0" />
  //               <a href="tel:+11234567890" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                +216 27-985-366
  //               </a>
  //             </li>
  //             <li className="flex items-center">
  //               <Mail size={18} className="mr-2 text-red-600 flex-shrink-0" />
  //               <a href="mailto:info@Ooredoo.com" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //                 info@Ooredoo.com
  //               </a>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>

  //       {/* Bottom Section */}
  //       <div className="pt-8 border-t border-border">
  //         <div className="flex flex-col md:flex-row justify-between items-center">
  //           <p className="text-sm text-muted-foreground mb-4 md:mb-0">
  //             &copy; {new Date().getFullYear()} Ooredoo el Hamma. All rights reserved.
  //           </p>
  //           <div className="flex space-x-4">
  //             <Link to="/terms" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //               Terms of Service
  //             </Link>
  //             <Link to="/privacy" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //               Privacy Policy
  //             </Link>
  //             <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
  //               Sitemap
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // );


  return (
    <footer className="bg-secondary pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Infos Entreprise */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ooredoo el Hamma</h3>
            <p className="text-muted-foreground mb-4">
              Expérience de shopping premium pour les passionnés de technologie et les amateurs de lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-red-600 transition-colors duration-200" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
  
          {/* Liens Rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Service Client */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Informations sur la livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Moyens de paiement
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  Informations sur la garantie
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Infos Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                Franchise Ooredoo El Hamma
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-red-600 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  +216 27-985-366
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-red-600 flex-shrink-0" />
                <a href="mailto:service.zouinkhi@gmail.com" className="text-muted-foreground hover:text-red-600 transition-colors duration-200">
                  service.zouinkhi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        {/* Section inférieure */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ooredoo el Hamma. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-200">
                Plan du site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  


};

export default Footer;
