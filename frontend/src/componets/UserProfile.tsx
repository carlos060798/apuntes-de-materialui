import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; // Importamos el hook para los parámetros de la URL
import { getUserById } from "../api/user.api"; // Asumiendo que tienes esta función en un archivo de API separado
import toast from "react-hot-toast";

function UserProfile()  {
  const { id } = useParams<{ id: string }>(); // Extraemos el id de los parámetros de la URL
  const [showChatModal, setShowChatModal] = useState(false);

  // Usar el hook de React Query para obtener los datos del usuario basado en el id
  const { data: user, error, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!), // Llamamos a la función con el id extraído
    onError: () => {
      toast.error("Error al obtener los datos del usuario.");
    },
    onSuccess: () => {
      toast.success("Datos del usuario obtenidos correctamente.");
    },
    enabled: !!id, // Solo se ejecuta si id está presente
  });

  // Manejo del modal de chat
  const handleShowChatModal = () => setShowChatModal(true);
  const handleCloseChatModal = () => setShowChatModal(false);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos del usuario.</p>;

  return (
    <div className="container mt-5">
      {/* Perfil de Usuario */}
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center">
          <img
            src={user.avatarurl || "https://via.placeholder.com/150"}
            alt={user.username}
            className="rounded-circle me-3"
            width="80"
            height="80"
          />
          <div>
            <h3 className="mb-1">{user.username}</h3>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
        
        {/* Seguidores */}
        <div className="mt-4">
          <h6>Seguidores</h6>
          {user.followers.length > 0 ? (
            <ul className="list-group">
              {user.followers.map((follower: any) => (
                <li key={follower._id} className="list-group-item">
                  {follower.username}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sin seguidores</p>
          )}
        </div>

        {/* Botón para abrir el chat */}
        <button
          className="btn btn-primary mt-4"
          onClick={handleShowChatModal}
        >
          Iniciar Chat
        </button>
      </div>

      {/* Modal para iniciar un chat */}
      {showChatModal && (
        <div className="modal fade show d-block" role="dialog" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Iniciar Chat</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseChatModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Aquí puedes iniciar un chat estilo Facebook con el usuario {user.username}</p>
                {/* Aquí agregarías el componente de chat */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseChatModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
