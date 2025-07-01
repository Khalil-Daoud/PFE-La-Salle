import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import { ENDPOINTS } from "../api/config";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeeEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    isAdmin: false,
    poste: "Vendeur",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Modifier un employé - Votre Boutique";
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        console.log("Fetching employee from:", ENDPOINTS.EMPLOYEES.GET_ONE(id));
        const response = await fetch(ENDPOINTS.EMPLOYEES.GET_ONE(id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors du chargement de l'employé");
        }
        const data = await response.json();
        console.log("Fetched employee:", data);
        setEmployee({
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin || false,
          poste: data.poste || "Vendeur",
        });
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Sending PUT to:", ENDPOINTS.EMPLOYEES.UPDATE(id), "with body:", employee);
      const response = await fetch(ENDPOINTS.EMPLOYEES.UPDATE(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour de l'employé");
      }
      toast.success("Employé mis à jour avec succès");
      navigate("/admin/employees");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Link to="/admin/employees" className="text-red-600 hover:underline">
            Retour à la liste des employés
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
            <Link
              to="/admin/employees"
              className="text-muted-foreground hover:text-red-600"
            >
              Gestion des employés
            </Link>
            <ChevronRight size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">
              Modifier un employé
            </span>
          </nav>
        </div>

        <h1 className="text-3xl font-bold mb-6">Modifier un employé</h1>

        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="poste">Poste</Label>
              <Select
                value={employee.poste}
                onValueChange={(value) => setEmployee({ ...employee, poste: value })}
              >
                <SelectTrigger id="poste">
                  <SelectValue placeholder="Sélectionner un poste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Vendeur">Vendeur</SelectItem>
                  <SelectItem value="Technicien">Technicien</SelectItem>
                  <SelectItem value="Comptable">Comptable</SelectItem>
                  <SelectItem value="Assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                checked={employee.isAdmin}
                onCheckedChange={(checked: boolean) =>
                  setEmployee({ ...employee, isAdmin: checked })
                }
              />
              <Label htmlFor="isAdmin">Administrateur</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployeeEdit;