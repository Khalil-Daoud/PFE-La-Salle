import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { ENDPOINTS } from "@/api/config";
import { toast } from "sonner";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    numReviews: "",
    countInStock: "",
    featured: true,
  });
  type Errors = {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    image?: string;
    rating?: string;
    numReviews?: string;
    countInStock?: string;
    submit?: string;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const categories = [
    "audio",
    "objets portables",
    "cameras",
    "ordinateur",
    "gaming",
    "tvs",
    "tablets",
    "internet",
    "smartphone",
  ];

  useEffect(() => {
    document.title = isEditMode
      ? "Modifier un produit - Votre Boutique"
      : "Ajouter un produit - Votre Boutique";

    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          console.log("Fetching product from:", ENDPOINTS.PRODUCTS.GET_ONE(id));
          const token = localStorage.getItem("token");
          if (!token) throw new Error("Authentification requise");

          const response = await fetch(ENDPOINTS.PRODUCTS.GET_ONE(id), {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("Produit non trouvé");
          const data = await response.json();
          console.log("Fetched product:", data);
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            category: data.category,
            image: data.image,
            rating: data.rating.toString(),
            numReviews: data.numReviews.toString(),
            countInStock: data.countInStock.toString(),
            featured: data.featured,
          });
        } catch (err) {
          console.error("Fetch error:", err);
          setFetchError(err.message);
          toast.error(err.message);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const validateForm = (): Errors => {
    console.log("Validating form data:", formData);
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.description.trim())
      newErrors.description = "La description est requise";
    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    )
      newErrors.price = "Le prix doit être un nombre positif";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (
      !formData.image.trim() ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|svg)(\?.*)?$|^https?:\/\/.+/.test(
        formData.image.trim()
      )
    )
      newErrors.image = "Veuillez fournir une URL d'image valide (http/https)";

    if (
      !formData.rating ||
      isNaN(Number(formData.rating)) ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    )
      newErrors.rating = "La note doit être entre 0 et 5";
    if (
      !formData.numReviews ||
      isNaN(Number(formData.numReviews)) ||
      Number(formData.numReviews) < 0
    )
      newErrors.numReviews = "Le nombre d’avis doit être un nombre positif";
    if (
      !formData.countInStock ||
      isNaN(Number(formData.countInStock)) ||
      Number(formData.countInStock) < 0
    )
      newErrors.countInStock = "Le stock doit être positif";
    console.log("Validation errors:", newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Validation failed:", validationErrors);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentification requise");

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image.trim(),
        rating: parseFloat(formData.rating),
        numReviews: parseInt(formData.numReviews),
        countInStock: parseInt(formData.countInStock),
        featured: formData.featured,
      };

      const endpoint = isEditMode
        ? ENDPOINTS.PRODUCTS.UPDATE(id)
        : ENDPOINTS.PRODUCTS.CREATE;
      const method = isEditMode ? "PUT" : "POST";

      console.log(`Sending ${method} to:`, endpoint);
      console.log("Payload:", payload);

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${token}",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (!response.ok) {
        console.error("Erreur serveur:", result);
        throw new Error(
          result.message || isEditMode
            ? "Erreur lors de la modification du produit"
            : "Erreur lors de l’ajout du produit"
        );
      }

      console.log(isEditMode ? "Produit modifié:" : "Produit ajouté:", payload);
      toast.success(
        isEditMode
          ? "Produit modifié avec succès"
          : "Produit ajouté avec succès"
      );
      navigate("/products");
    } catch (error) {
      console.error("Erreur lors de la requête:", error.message, error);
      setErrors({ submit: error.message });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchError) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-muted-foreground mb-8">{fetchError}</p>
          <Button asChild>
            <Link to="/adminproduct">Retour à la gestion des produits</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <nav className="flex items-center text-sm space-x-1">
            <Link to="/" className="text-muted-foreground hover:text-red-600">
              Accueil
            </Link>
            <ChevronRight size={16} className="text-muted-foreground" />
            <Link
              to="/adminproduct"
              className="text-muted-foreground hover:text-red-600"
            >
              Gestion des produits
            </Link>
            <ChevronRight size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">
              {isEditMode ? "Modifier un produit" : "Ajouter un produit"}
            </span>
          </nav>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            {isEditMode ? "Modifier le produit" : "Ajouter un nouveau produit"}
          </h1>
          {errors.submit && (
            <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nom du produit</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrez le nom du produit"
                className={errors.name ? "text-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Entrez la description du produit"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Prix ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Entrez le prix"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                onValueChange={handleCategoryChange}
                value={formData.category}
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <Label htmlFor="image">URL de l'image</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Entrez l'URL de l'image"
                className={errors.image ? "border-red-500" : ""}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
            <div>
              <Label htmlFor="rating">Note (0-5)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Entrez la note"
                className={errors.rating ? "border-red-500" : ""}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
              )}
            </div>
            <div>
              <Label htmlFor="numReviews">Nombre d’avis</Label>
              <Input
                id="numReviews"
                name="numReviews"
                type="number"
                value={formData.numReviews}
                onChange={handleChange}
                placeholder="Entrez le nombre d’avis"
                className={errors.numReviews ? "border-red-500" : ""}
              />
              {errors.numReviews && (
                <p className="text-red-500 text-sm mt-1">{errors.numReviews}</p>
              )}
            </div>
            <div>
              <Label htmlFor="countInStock">Quantité en stock</Label>
              <Input
                id="countInStock"
                name="countInStock"
                type="number"
                value={formData.countInStock}
                onChange={handleChange}
                placeholder="Entrez la quantité en stock"
                className={errors.countInStock ? "border-red-500" : ""}
              />
              {errors.countInStock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.countInStock}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 rounded-full"
                disabled={loading}
              >
                {loading
                  ? isEditMode
                    ? "Modification en cours..."
                    : "Ajout en cours..."
                  : isEditMode
                  ? "Modifier le produit"
                  : "Ajouter le produit"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => navigate("/products")}
                disabled={loading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
