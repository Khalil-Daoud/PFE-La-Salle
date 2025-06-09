import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../api/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
  FileText,
  User,
} from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface User {
  name: string;
  email: string;
}

interface Order {
  _id: string;
  user: User;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shippingPrice: number;
  tax: number;
  total: number;
  isPaid: boolean;
  createdAt: Date;
}

const fetchOrder = async (id: string): Promise<Order> => {
  const response = await fetch(ENDPOINTS.ORDERS.GET_ONE(id));
  if (!response.ok) {
    throw new Error("Échec de la récupération des détails de la commande");
  }
  return response.json();
};

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id || ""),
    enabled: !!id,
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="text-center py-16">
        Chargement des détails de la commande...
      </div>
    );
  if (error) {
    toast.error("Échec du chargement des détails de la commande");
    return (
      <div className="text-center py-16">
        Erreur lors du chargement de la commande
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-12 mt-[100px]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FileText className="h-8 w-8 mr-3 text-red-600" />
          <h1 className="text-3xl font-bold">Détails de la commande </h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Résumé de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Sous-total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      {item.price.toFixed(2)} DT
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{order.total.toFixed(2)} DT</span>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
