

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChannelsById } from "../api/channel.api";
import Loader from "./Loader";
import { useState } from "react";
import SettingChannelPage from "./SettingChannel";

function Channel() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => getChannelsById(id as string),
    enabled: !!id, // Solo ejecuta la query si id tiene valor
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;
  if (error) return <p>Error al cargar el canal.</p>;
  if (!data) return <p>No se encontró el canal.</p>;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={data.avatarUrl || "https://via.placeholder.com/150"}
            alt="Canal"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="h3">{data.title}</h1>
            <button className="btn btn-secondary" onClick={openModal}>
              Ajustes
            </button>
          </div>
          <p className="text-muted mb-1">{data.description}</p>
          <p className="mb-1">
            <strong>Usuario:</strong> {data.username}
          </p>
          <p className="mb-1">
            <strong>Estado:</strong>{" "}
            <span className={`badge ${data.isOnline ? "bg-success" : "bg-danger"}`}>
              {data.isOnline ? "Online" : "Offline"}
            </span>
          </p>
          <p className="mb-0">
            <strong>Stream:</strong>{" "}
            <a href={data.streamUrl} target="_blank" rel="noopener noreferrer">
              {data.streamUrl}
            </a>
          </p>
        </div>
      </div>

      <SettingChannelPage data={data}channelId={id!} isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Channel;
