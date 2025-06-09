import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "@/api/config";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  FiSearch,
  FiMail,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentification requise");

        const response = await fetch(ENDPOINTS.CONTACT.GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok)
          throw new Error("Impossible de récupérer les messages");

        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, contacts]);

  // Delete contact
  //   const handleDelete = async (id: string) => {
  //     if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch(`${ENDPOINTS.CONTACT.DELETE}/${id}`, {
  //         method: "DELETE",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (!response.ok) throw new Error("Impossible de supprimer le message");

  //       setContacts(contacts.filter((contact) => contact._id !== id));
  //       toast.success("Message supprimé avec succès");
  //     } catch (error) {
  //       toast.error((error as Error).message);
  //     }
  //   };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border p-4 rounded shadow-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Messages de contact
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou sujet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Rechercher des messages"
          />
        </div>

        {/* Loading State */}
        {loading && <SkeletonLoader />}

        {/* Contacts List */}
        {!loading && filteredContacts.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun message reçu pour le moment.
          </p>
        ) : (
          <div className="space-y-4">
            {currentContacts.map((contact) => (
              <div
                key={contact._id}
                className="border p-4 rounded-lg shadow-sm flex flex-col gap-3 transition-all hover:shadow-md bg-white"
                role="article"
                aria-labelledby={`contact-${contact._id}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      id={`contact-${contact._id}`}
                      className="font-semibold text-gray-800"
                    >
                      {contact.name}{" "}
                      <span className="text-gray-500">({contact.email})</span>
                    </p>
                    <p className="text-sm text-red-500">
                      Sujet: {contact.subject}
                    </p>
                  </div>
                  {/* <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Supprimer le message de ${contact.name}`}
                  >
                    <FiTrash2 size={20} />
                  </button> */}
                </div>

                <p className="text-gray-700">
                  {" "}
                  <span className="font-semibold text-gray-800">
                    Contenu :{" "}
                  </span>{" "}
                  {contact.message}
                </p>
                <p className="text-xs text-gray-400">
                  Envoyé le:{" "}
                  {contact.createdAt &&
                  !isNaN(new Date(contact.createdAt).getTime())
                    ? format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")
                    : "Date inconnue"}
                </p>
                <a
                  href={`mailto:${
                    contact.email
                  }?subject=Re: ${encodeURIComponent(contact.subject)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label={`Répondre à ${contact.name}`}
                >
                  <FiMail /> Répondre
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredContacts.length > contactsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
              aria-label="Page précédente"
            >
              <FiChevronLeft /> Précédent
            </button>
            <span className="text-gray-600">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
              aria-label="Page suivante"
            >
              Suivant <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
