import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import AddProduct from "./pages/AddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminPanel from "./pages/AdminPannel";
import MineOrder from "./pages/MineOrder";
import ContactList from "./pages/ContactList";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <CartProvider>
          <CheckoutProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Routes principales pour la partie publique */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="order/:id" element={<OrderDetails />} />
                <Route path="/commandes" element={<MineOrder />} />
                <Route path="/addproduct" element={<AddProduct />} />{" "}
                {/* publique ? sinon à déplacer */}
              </Route>

              {/* Authentification */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Espace d’administration (routage imbriqué) */}
              <Route path="/admin" element={<AdminPanel />}>
                <Route path="products" element={<AdminProductList />} />
                <Route path="addproduct" element={<AddProduct />} />
                <Route path="products/add/:id" element={<AddProduct />} />
                <Route path="orders" element={<Orders />} />
                <Route path="order/:id" element={<OrderDetails />} />
                <Route path="message" element={<ContactList />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CheckoutProvider>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
