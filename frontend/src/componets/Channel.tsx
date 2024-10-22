import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getChannelsById, deleteChannel } from "../api/channel.api";
import Loader from "./Loader";
import { useState } from "react";
import SettingChannelPage from "./SettingChannel";
import CommentSection from "./CommentsList";

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleComments = () => setShowComments((prev) => !prev);

  // Mutación para eliminar el canal
  const { mutate } = useMutation({
    mutationFn: deleteChannel,
    onSuccess: () => {
      console.log("Canal eliminado con éxito");
      // Redirigir a la página principal o a la lista de canales después de eliminar
      navigate("/");
    },
    onError: (error) => {
      console.error("Error al eliminar el canal:", error);
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error al cargar el canal.</p>;
  if (!channelData) return <p>No se encontró el canal.</p>;

  // Función para redirigir a la sala de chat grupal
  const redirectToChatRoom = () => {
    navigate(`/channel/${id}/${channelData.title}/chat`);
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#2c2f33', color: '#fff', borderRadius: '10px', padding: '20px' }}>
    <div className="row mb-4">
      <div className="col-md-4">
        <img
          src={channelData.avatarUrl || "https://via.placeholder.com/150"}
          alt="Canal"
          className="img-fluid rounded shadow-sm"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="col-md-8 d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="h3" style={{ color: '#7289da' }}>{channelData.title}</h1>

          {currentUsername === channelData.user && (
            <div>
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={openModal}
                style={{ borderRadius: '50%', padding: '5px 10px' }}
                title="Ajustes del Canal"
              >
                <i className="bi bi-gear"></i>
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => mutate(id!)}
                style={{ borderRadius: '50%', padding: '5px 10px' }}
                title="Eliminar Canal"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
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
    <div className="d-flex justify-content-between">
      <button
        className="btn btn-outline-success mb-3"
        onClick={redirectToChatRoom}
        style={{ borderRadius: '20px' }}
      >
        Ingresar a la Sala de Chat Grupal
      </button>
      <button
        className="btn btn-outline-primary mb-3"
        onClick={toggleComments}
        style={{ borderRadius: '20px' }}
      >
        {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
      </button>
    </div>

    {showComments && <CommentSection channelId={id!} />}

    {isModalOpen && (
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ backgroundColor: '#36393f', color: '#fff' }}>
            <div className="modal-header">
              <h5 className="modal-title">Configuración del Canal</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
                style={{ backgroundColor: '#7289da' }}
              ></button>
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