import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  Package,
  ShoppingBag,
  MessageCircleDashed,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// 👉 Le Navbar
const Navbar: React.FC = () => (
  <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
    <Link to="/" className="text-xl font-bold text-red-600">
      Votre Boutique
    </Link>
    <div className="flex items-center space-x-4">
      <Link to="/" className="text-gray-700 hover:text-red-600 font-medium">
        Accueil
      </Link>

      {/* Tu peux ajouter d’autres liens ici */}
    </div>
  </nav>
);

const AdminPanel: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.isAdmin) {
        navigate("/login");
        toast.error("Accès non autorisé !");
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 👉 Navbar général */}
      <Navbar />

      {/* 👉 Conteneur global avec la sidebar et le contenu */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
          </div>
          <nav className="mt-4">
            <Link
              to="/admin/products"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Package className="mr-2 h-5 w-5" />
              Liste des produits
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Liste des commandes
            </Link>
            <Link
              to="/admin/message"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <MessageCircleDashed className="mr-2 h-5 w-5" />
              Liste des Messages
            </Link>

            <Link
              to="/admin/employees"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users  className="mr-2 h-5 w-5" />
              Liste des Employees
            </Link>
          </nav>
          <div className="absolute bottom-4 w-full px-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Contenu principal */}
        <div className="flex-1 md:ml-64">
          {/* Header pour le bouton menu (mobile) */}
          <header className="bg-white shadow-sm p-4 flex items-center">
            <Button
              variant="ghost"
              className="md:hidden mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold">Tableau de bord</h2>
          </header>

          {/* Contenu dynamique */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
