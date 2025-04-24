import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ENDPOINTS } from "../api/config";
import { format, parseISO } from "date-fns";

interface Order {
  _id: string;
  user: { name: string; email: string };
  total: number;
  isPaid: boolean;
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(ENDPOINTS.ORDERS.GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterQuery, orders]);

  const applyFilters = () => {
    let result = [...orders];

    if (filterStatus !== "all") {
      result = result.filter((order) =>
        filterStatus === "paid" ? order.isPaid : !order.isPaid
      );
    }

    if (filterQuery) {
      const query = filterQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.user.name.toLowerCase().includes(query) ||
          order.user.email.toLowerCase().includes(query)
      );
    }

    setFilteredOrders(result);
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      // Use ENDPOINTS.ORDERS.DELETE to construct the correct URL
      const response = await fetch(ENDPOINTS.ORDERS.DELETE(orderId), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      // Refetch orders
      const fetchResponse = await fetch(ENDPOINTS.ORDERS.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!fetchResponse.ok) throw new Error("Failed to refetch orders");
      const data = await fetchResponse.json();
      setOrders(data);
      setFilteredOrders(data);

      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-[100px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Historique des orders
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search customer..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Statuts</option>
            <option value="paid">Payé</option>
            <option value="pending">En Attente</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">Pas de produit trouvés</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(parseISO(order.createdAt), "dd MMM yyyy")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(parseISO(order.createdAt), "HH:mm")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                      {order.total.toFixed(2)} DT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="text-blue-600 hover:text-blue-900 font-medium transition-colors mr-4"
                      >
                        Voir Détails →
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-900 font-medium transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
