// Importa los hooks necesarios
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChannelsById } from "../api/channel.api";
import Loader from "./Loader";

function Channel() {
  // Capturar el ID de la URL usando useParams
  const { id } = useParams<{ id: string }>();

  // Usar useQuery para consultar el canal por ID
  const { data, isLoading, error } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => getChannelsById(id as string), // Llamar la función con el id de la URL
    enabled: !!id, // Asegurarse de que el id esté disponible antes de ejecutar la consulta
  });

  if (isLoading) return <Loader />; // Mostrar loader mientras se cargan los datos

  if (error) return <p>Error al cargar el canal.</p>; // Manejar errores

  if (!data) return <p>No se encontró el canal.</p>; // Verificar si no hay datos

  // Mostrar los datos del canal
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p>Usuario: {data.username}</p>
      <p>Estado: {data.isOnline ? "Online" : "Offline"}</p>
      <p>Stream: <a href={data.streamUrl}>{data.streamUrl}</a></p>
    </div>
  );
}

export default Channel;
