import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { ENDPOINTS } from "@/api/config";
import { toast } from "sonner";

const AdminProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    document.title = "Gestion des produits - Votre Boutique";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products from:", ENDPOINTS.PRODUCTS.GET_ALL);
      const response = await fetch(ENDPOINTS.PRODUCTS.GET_ALL);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des produits");
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      setLoading(true);

      console.log("Sending DELETE to:", ENDPOINTS.PRODUCTS.DELETE(id));
      const response = await fetch(ENDPOINTS.PRODUCTS.DELETE(id), {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la suppression du produit"
        );
      }

      // Refetch products
      await fetchProducts();
      toast.success("Produit supprimé avec succès");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calcul des produits filtrés et triés
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return filtered;
  }, [products, selectedCategory, sortOrder]);

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Link to="/" className="text-red-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto mt-[50px] bg-white rounded-lg shadow border border-gray-100">
      <div className="container mx-auto px-6">
        
        <div className="mb-8">
          <nav className="flex items-center text-sm space-x-1">
            <Link to="/" className="text-muted-foreground hover:text-red-600">
              Accueil
            </Link>
            <ChevronRight size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">
              Gestion des produits
            </span>
          </nav>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des produits</h1>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">Toutes</option>
              {[...new Set(products.map((p) => p.category))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tri par prix */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
          <Button asChild>
            <Link to="/addproduct">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
            </Link>
          </Button>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-muted-foreground">Aucun produit disponible.</p>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.price.toFixed(2)} $</TableCell>
                    <TableCell className="capitalize">
                      {product.category}
                    </TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/products/add/${product._id}`)
                          }
                          disabled={loading}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
