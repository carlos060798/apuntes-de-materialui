

import { followChannel, getChannels, unfollowChannel } from '../api/channel.api';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ichannel } from "../interface/channel-interface";
import Loader from "../componets/Loader";
import toast from "react-hot-toast"; 
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import CreateChannelModal from '../componets/ModalChanel';

function ChannelsPage() {

  const navigate = useNavigate();

  const queryClient = useQueryClient();
 
  const { data, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannels,
  });
  
  // Mutación para seguir el canal
  const { mutate: follow, reset: resetFollow } = useMutation({
    mutationFn: followChannel,
    onError: () => {
      toast.error("Error al seguir el canal");
      resetFollow();
    },
    onSuccess: () => {
      toast.success("Canal seguido con éxito");
      queryClient.invalidateQueries({ queryKey: ["channelsFollows"] });
    },
  });

  // Mutación para dejar de seguir el canal
  const { mutate: unfollow, reset: resetUnfollow } = useMutation({
    mutationFn: unfollowChannel,
    onError: () => {
      toast.error("Error al dejar de seguir el canal");
      resetUnfollow();
    },
    onSuccess: () => {
      toast.success("Dejaste de seguir el canal con éxito");
      queryClient.invalidateQueries({ queryKey: ["channelsFollows"] });
      resetUnfollow();
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFollow = (channelId: string) => {
    follow(channelId);
  };

  const handleUnfollow = (channelId: string) => {
    unfollow(channelId);
  };
 
  const handleDetailChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

 
console.log("console data",data);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;

  if (data && data.length > 0) return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-4" onClick={openModal}>
        <i className="bi bi-plus-circle me-2"></i>Crear nuevo canal
      </button>
      
      {/* Modal para crear un nuevo canal */}
      <CreateChannelModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <div className="row">
        {data && data.length > 0 ? (
          data.map((channel: Ichannel) => (
            <div className="col-lg-4 col-md-6 mb-4" key={channel.id}>
              <div className="card h-100 shadow-sm rounded">
                <img
                  src={channel.avatarUrl || "https://via.placeholder.com/150"}
                  className="card-img-top rounded-top"
                  alt="Stream thumbnail"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{channel.title}</h5>
                  <p className="card-text text-muted">
                    {channel.username} ·{" "}
                    <span className={`badge ${channel.isOnline ? 'bg-success' : 'bg-secondary'}`}>
                      {channel.isOnline ? "Online" : "Offline"}
                    </span>
                  </p>
                  <div className="d-flex justify-content-between mt-auto">
                    {/* Botón de seguir */}
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleFollow(channel.id as string)}
                     
                    >
                      <i className="bi bi-person-plus-fill me-1"></i>
                    </button>

                    {/* Botón de dejar de seguir */}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleUnfollow(channel.id as string)}
                     
                    >
                      <i className="bi bi-person-dash-fill me-1"></i>
                    
                    </button>

                    {/* Detalles del canal */}
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleDetailChannel(channel.id as string)
                        }
                      >
                        <i className="bi bi-info-circle-fill"></i>
                      </button>
              
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron canales.</p>
        )}
      </div>
    </div>
  );
}

export default ChannelsPage;
