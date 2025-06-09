import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ENDPOINTS } from "../api/config";
import { format } from "date-fns";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  total: number;
  isPaid: boolean;
  createdAt: string;
}

const MineOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentification requise");

        const response = await fetch(ENDPOINTS.ORDERS.GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok)
          throw new Error("Impossible de récupérer les commandes");

        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const toggleDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-sm animate-pulse"
        >
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-[70px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Commandes</h1>

        {loading && <SkeletonLoader />}

        {!loading && orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            Vous n’avez pas encore passé de commande.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-sm bg-white transition-all hover:shadow-md"
                role="article"
                aria-labelledby={`order-${order._id}`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDetails(order._id)}
                >
                  <p
                    id={`order-${order._id}`}
                    className="font-semibold text-gray-800"
                  >
                    Commande <span className="text-gray-600">#{order._id}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded ${
                        order.isPaid
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Payée" : "Non payée"}
                    </span>
                    {expandedOrder === order._id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="mt-3 text-sm text-gray-700 space-y-2">
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span>{" "}
                      {order.total} €
                    </p>
                    <div>
                      <h2 className="font-semibold">Produits:</h2>
                      <ul className="list-disc list-inside">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} x {item.quantity} — {item.price} €
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-semibold">Adresse de livraison:</h2>
                      <p>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.country}
                      </p>
                    </div>
                    <p>
                      <span className="font-semibold">
                        Méthode de paiement:
                      </span>{" "}
                      {order.paymentMethod}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MineOrder;
