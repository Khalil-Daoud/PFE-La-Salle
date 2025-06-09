import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckCircle } from "lucide-react";

const API_URL = "http://localhost:5000/api/products"; // URL de ton API

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const sortOption = queryParams.get("sort") || "featured";

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFilter
  );
  const [priceRange, setPriceRange] = useState([
    minPrice ? parseInt(minPrice) : 0,
    maxPrice ? parseInt(maxPrice) : 3000,
  ]);
  const categories = [
    "audio",
    "objets portables",
    "cameras",
    "ordinateur",
    "gaming",
    "tvs",
    "tablets",
    "internet",
  ]; // Liste des catégories

  // Récupération des produits
  const fetchProducts = async () => {
    try {
      const url = new URL(API_URL);

      // Ajouter les paramètres de filtre à l'URL
      if (selectedCategory)
        url.searchParams.append("category", selectedCategory);
      if (priceRange[0] > 0 || priceRange[1] < 1500) {
        url.searchParams.append("minPrice", priceRange[0].toString());
        url.searchParams.append("maxPrice", priceRange[1].toString());
      }
      if (sortOption && sortOption !== "featured")
        url.searchParams.append("sort", sortOption);

      console.log("Fetching products from:", url.toString()); // Debugging

      const response = await fetch(url.toString());
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched data:", data); // Debugging
      setFilteredProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceRange, sortOption]);

  // Changement de catégorie
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(location.search);
    if (category) params.set("category", category);
    else params.delete("category");
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Changement de prix
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    const params = new URLSearchParams(location.search);
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Changement du tri
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);
    if (value !== "featured") params.set("sort", value);
    else params.delete("sort");
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 1500]);
    navigate("?"); // Supprime tous les query params
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre latérale / Filtres */}
          <div className="lg:w-1/4 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Catégorie</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? "bg-primary/10 text-red-600 font-medium"
                      : "hover:bg-secondary"
                  }`}
                >
                  <CheckCircle
                    size={16}
                    className={`mr-2 ${
                      selectedCategory === null ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span>Toutes les catégories</span>
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-primary/10 text-red-600 font-medium"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <CheckCircle
                      size={16}
                      className={`mr-2 ${
                        selectedCategory === category
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    <span>
                      {category.slice(0, 1).toUpperCase() + category.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Plage de prix</h2>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-secondary px-3 py-1 rounded-md text-sm">
                    {priceRange[0]} DT
                  </span>
                  <span className="inline-block bg-secondary px-3 py-1 rounded-md text-sm">
                    {priceRange[1]} DT
                  </span>
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={resetFilters} className="w-full">
              Réinitialiser les filtres
            </Button>
          </div>

          {/* Zone principale */}
          <div className="lg:w-3/4">
            {/* Tri & Résultats */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Produits</h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "produit trouvé"
                    : "produits trouvés"}
                </p>
              </div>

              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm">
                  Trier par :
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:text-red-600"
                >
                  <option value="featured">En vedette</option>
                  <option value="price-low">Prix : Croissant</option>
                  <option value="price-high">Prix : Décroissant</option>
                  <option value="name-asc">Nom : A à Z</option>
                  <option value="name-desc">Nom : Z à A</option>
                </select>
              </div>
            </div>

            {/* Grille des produits */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-secondary/50 rounded-xl">
                <h3 className="text-xl font-medium mb-2">
                  Aucun produit trouvé
                </h3>
                <Button onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
