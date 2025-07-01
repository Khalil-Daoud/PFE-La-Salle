import React, { useEffect, useState } from "react";
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
import { ChevronRight, Pencil, Trash2, Plus } from "lucide-react";
import { ENDPOINTS } from "../api/config";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isAdminFilter, setIsAdminFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Gestion des employés - Votre Boutique";
    fetchEmployees();
  }, [search, isAdminFilter]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (isAdminFilter !== "all") queryParams.append("isAdmin", isAdminFilter);

      const url = `${ENDPOINTS.EMPLOYEES.GET_ALL}?${queryParams.toString()}`;
      console.log("Fetching employees from:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors du chargement des employés"
        );
      }
      const data = await response.json();
      console.log("Fetched employees:", data);
      setEmployees(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) return;

    try {
      setLoading(true);
      console.log("Sending DELETE to:", ENDPOINTS.EMPLOYEES.DELETE(id));
      const response = await fetch(ENDPOINTS.EMPLOYEES.DELETE(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la suppression de l'employé"
        );
      }

      // Refetch employees
      await fetchEmployees();
      toast.success("Employé supprimé avec succès");
    } catch (error) {
      console.error("Delete error:", error);
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
              Gestion des employés
            </span>
          </nav>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des employés</h1>
          <Button
            onClick={() => navigate("/admin/employees/add")}
            disabled={loading}
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter un employé
          </Button>
        </div>

        <div className="mb-6 flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Select value={isAdminFilter} onValueChange={setIsAdminFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="true">Administrateurs</SelectItem>
                <SelectItem value="false">Non-administrateurs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : employees.length === 0 ? (
          <p className="text-muted-foreground">Aucun employé disponible.</p>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>poste</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.isAdmin ? "Oui" : "Non"}</TableCell>
                    <TableCell>{employee.poste}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/employees/edit/${employee._id}`)
                          }
                          disabled={loading}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(employee._id)}
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

export default EmployeesList;
