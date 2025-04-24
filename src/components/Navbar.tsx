import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, LogIn, LogOut, User, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string, email?: string } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location.pathname]);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    
    // Navigate to home page
    navigate('/');
    
    // Show success message
    toast.success("Successfully signed out");
  };

  const getUserInitials = () => {
    if (!user || !user.name) return '?';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  // return (
  //   <header
  //     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  //       isScrolled || isMenuOpen ? 'glass-navbar' : 'bg-transparent'
  //     }`}
  //   >
  //     <div className="container mx-auto px-6 py-4">
  //       <div className="flex items-center justify-between">
  //         {/* Logo */}
  //         <Link 
  //           to="/" 
  //           className="text-xl md:text-2xl font-bold text-primary transition-colors duration-200"
  //         >
  //           Ooredoo el Hamma
  //         </Link>

  //         {/* Desktop Navigation */}
  //         <nav className="hidden md:flex items-center space-x-8">
  //           {navLinks.map((link) => (
  //             <Link
  //               key={link.path}
  //               to={link.path}
  //               className={`font-medium transition-all duration-200 hover:text-primary ${
  //                 location.pathname === link.path
  //                   ? 'text-primary'
  //                   : 'text-primary/80'
  //               }`}
  //             >
  //               {link.name}
  //             </Link>
  //           ))}
  //         </nav>

  //         {/* Desktop Right Icons */}
  //         <div className="hidden md:flex items-center space-x-5">
  //           <button 
  //             className="relative text-primary hover:text-primary transition-colors duration-200"
  //             onClick={() => setIsCartOpen(true)}
  //             aria-label="Open Cart"
  //           >
  //             <ShoppingCart size={20} />
  //             {totalItems > 0 && (
  //               <Badge 
  //                 className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 bg-primary text-white text-xs rounded-full"
  //               >
  //                 {totalItems}
  //               </Badge>
  //             )}
  //           </button>
            
  //           {isLoggedIn ? (
  //             <DropdownMenu>
  //               <DropdownMenuTrigger asChild>
  //                 <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary">
  //                   <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  //                   <AvatarFallback>{getUserInitials()}</AvatarFallback>
  //                 </Avatar>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent align="end" className="w-56">
  //                 <div className="flex items-center justify-start gap-2 p-2">
  //                   <Avatar className="h-8 w-8">
  //                     <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  //                     <AvatarFallback>{getUserInitials()}</AvatarFallback>
  //                   </Avatar>
  //                   <div className="flex flex-col space-y-0.5">
  //                     <p className="text-sm font-medium">{user?.name || 'User'}</p>
  //                     <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
  //                   </div>
  //                 </div>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
  //                   <User className="mr-2 h-4 w-4" />
  //                   <span>Profile</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/orders')}>
  //                   <Package className="mr-2 h-4 w-4" />
  //                   <span>Orders</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
  //                   <LogOut className="mr-2 h-4 w-4" />
  //                   <span>Sign out</span>
  //                 </DropdownMenuItem>
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           ) : (
  //             <Button 
  //               variant="outline" 
  //               size="sm" 
  //               className="flex items-center gap-1.5"
  //               onClick={handleSignIn}
  //             >
  //               <LogIn size={16} />
  //               Sign In
  //             </Button>
  //           )}
  //         </div>

  //         {/* Mobile Menu Button */}
  //         <div className="flex md:hidden items-center space-x-4">
  //           <button 
  //             className="relative text-foreground/80 hover:text-primary transition-colors duration-200"
  //             onClick={() => setIsCartOpen(true)}
  //             aria-label="Open Cart"
  //           >
  //             <ShoppingCart size={20} />
  //             {totalItems > 0 && (
  //               <Badge 
  //                 className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 bg-primary text-white text-xs rounded-full"
  //               >
  //                 {totalItems}
  //               </Badge>
  //             )}
  //           </button>
  //           <button
  //             onClick={() => setIsMenuOpen(!isMenuOpen)}
  //             className="text-foreground/80 hover:text-primary transition-colors duration-200"
  //             aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
  //           >
  //             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
  //           </button>
  //         </div>
  //       </div>

  //       {/* Mobile Menu */}
  //       <div
  //         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
  //           isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
  //         }`}
  //       >
  //         <nav className="flex flex-col space-y-4 py-2">
  //           {navLinks.map((link) => (
  //             <Link
  //               key={link.path}
  //               to={link.path}
  //               className={`font-medium transition-colors duration-200 hover:text-primary ${
  //                 location.pathname === link.path
  //                   ? 'text-primary'
  //                   : 'text-foreground/80'
  //               }`}
  //             >
  //               {link.name}
  //             </Link>
  //           ))}
  //           <button 
  //             className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors duration-200"
  //             aria-label="Search"
  //           >
  //             <Search size={18} />
  //             <span>Search</span>
  //           </button>
            
  //           {isLoggedIn ? (
  //             <div className="flex items-center justify-between">
  //               <div className="flex items-center space-x-2">
  //                 <Avatar className="h-8 w-8 cursor-pointer border-2 border-primary">
  //                   <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  //                   <AvatarFallback>{getUserInitials()}</AvatarFallback>
  //                 </Avatar>
  //                 <span className="text-sm">{user?.name || 'User'}</span>
  //               </div>
  //               <div className="flex gap-2">
  //                 <Button 
  //                   variant="outline" 
  //                   size="sm"
  //                   onClick={() => navigate('/profile')}
  //                 >
  //                   <User size={16} />
  //                   <span className="ml-1">Profile</span>
  //                 </Button>
  //                 <Button 
  //                   variant="outline" 
  //                   size="sm"
  //                   onClick={() => navigate('/checkout')}
  //                 >
  //                   <Package size={16} />
  //                   <span className="ml-1">Orders</span>
  //                 </Button>
  //                 <Button 
  //                   variant="ghost" 
  //                   size="sm" 
  //                   className="text-destructive hover:text-destructive hover:bg-destructive/10"
  //                   onClick={handleSignOut}
  //                 >
  //                   <LogOut size={16} />
  //                   <span className="ml-1">Sign out</span>
  //                 </Button>
  //               </div>
  //             </div>
  //           ) : (
  //             <Button 
  //               variant="outline" 
  //               size="sm" 
  //               className="flex items-center justify-start gap-1.5 w-full"
  //               onClick={handleSignIn}
  //             >
  //               <LogIn size={16} />
  //               Sign In
  //             </Button>
  //           )}
  //         </nav>
  //       </div>
  //     </div>
  //   </header>
  // );


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'glass-navbar' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold text-red-600 transition-colors duration-200"
          >
            Ooredoo el Hamma
          </Link>
  
          {/* Navigation bureau */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-200 hover:text-red-600 ${
                  location.pathname === link.path
                    ? 'text-red-600'
                    : 'text-red-600/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
  
          {/* Icônes bureau droite */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              className="relative text-red-600 hover:text-red-600 transition-colors duration-200"
              onClick={() => setIsCartOpen(true)}
              aria-label="Ouvrir le panier"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 bg-danger text-white text-xs rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </button>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-red">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Utilisateur" />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Utilisateur" />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.name || 'Utilisateur'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Commandes</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleSignIn}
              >
                <LogIn size={16} />
                Se connecter
              </Button>
            )}
          </div>
  
          {/* Bouton menu mobile */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              className="relative text-foreground/80 hover:text-red-600 transition-colors duration-200"
              onClick={() => setIsCartOpen(true)}
              aria-label="Ouvrir le panier"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 bg-red text-white text-xs rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/80 hover:text-red-600 transition-colors duration-200"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
  
        {/* Menu mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-red-600 ${
                  location.pathname === link.path
                    ? 'text-red-600'
                    : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              className="flex items-center space-x-2 text-foreground/80 hover:bg-primary transition-colors duration-200"
              aria-label="Recherche"
            >
              <Search size={18} />
              <span>Rechercher</span>
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 cursor-pointer border-2 border-danger">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Utilisateur" />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user?.name || 'Utilisateur'}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/profile')}
                  >
                    <User size={16} />
                    <span className="ml-1">Profil</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/checkout')}
                  >
                    <Package size={16} />
                    <span className="ml-1">Commandes</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} />
                    <span className="ml-1">Se déconnecter</span>
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center justify-start gap-1.5 w-full"
                onClick={handleSignIn}
              >
                <LogIn size={16} />
                Se connecter
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
  

};

export default Navbar;