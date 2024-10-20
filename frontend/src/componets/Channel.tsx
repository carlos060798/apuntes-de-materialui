import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChannelsById } from "../api/channel.api";
import Loader from "./Loader";
import { useState } from "react";
import SettingChannelPage from "./SettingChannel";
import CommentSection from "./CommentsList";
import { useNavigate } from "react-router-dom";

function Channel() {
  const navigate = useNavigate();  // Para redirigir a otras páginas
  const { id } = useParams<{ id: string }>();
  const { data: channelData, isLoading, error } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => getChannelsById(id as string),
    enabled: !!id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Obtener el username del usuario logueado
  const currentUsername = localStorage.getItem("username");
  console.log(currentUsername);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleComments = () => setShowComments((prev) => !prev);

  if (isLoading) return <Loader />;
  if (error) return <p>Error al cargar el canal.</p>;
  if (!channelData) return <p>No se encontró el canal.</p>; 

    // Función para redirigir a la sala de chat grupal
    const redirectToChatRoom = () => {
      navigate(`/channel/${id}/chat`);
    };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={channelData.avatarUrl || "https://via.placeholder.com/150"}
            alt="Canal"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="h3">{channelData.title}</h1>

            {/* Mostrar el botón de ajustes solo si el usuario es el dueño del canal */}
            {currentUsername === channelData.user && (
              <button className="btn btn-secondary" onClick={openModal}>
                Ajustes
              </button>
            )}
          </div>
          <p className="text-muted mb-1">{channelData.description}</p>
          <p className="mb-1">
            <strong>Usuario:</strong> {channelData.user}
          </p>
          <p className="mb-1">
            <strong>Estado:</strong>{" "}
            <span className={`badge ${channelData.isActivated ? "bg-success" : "bg-danger"}`}>
              {channelData.isOnline ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>
      <button className="btn btn-success mb-3" onClick={redirectToChatRoom}>
        Ingresar a la Sala de Chat Grupal
      </button>
      <button className="btn btn-primary mb-3" onClick={toggleComments}>
        {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
      </button>

      {showComments && <CommentSection channelId={id!} />}

      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Configuración del Canal</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <SettingChannelPage data={channelData} channelId={id!} closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Channel;

