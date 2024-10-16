import { getChannelsusers } from "../api/channel.api";
import { useQuery } from "@tanstack/react-query";
import { Ichannel } from "../interface/channel-interface";
import Loader from "../componets/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateChannelModal from "../componets/ModalChanel";

function DashboardPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannelsusers,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;


    return (
      <div className="container mt-4">
        <button className="btn btn-primary mb-4" onClick={openModal}>
          Crear nuevo canal
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
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{channel.title}</h5>
                    <p className="card-text">
                      {channel.username} ·{" "}
                      {channel.isOnline ? "Online" : "Offline"}
                    </p>
                    <div className="d-flex justify-content-between mt-auto">
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

export default DashboardPage;
