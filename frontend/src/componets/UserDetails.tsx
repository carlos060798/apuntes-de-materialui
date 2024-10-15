import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUserData } from "../api/user.api"; // Asegúrate de que la función está correctamente importada

function ProfileUser() {
  // Usa react-query para obtener los datos del usuario
  const { data:user, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    onError: () => {
      toast.error("Error al obtener los datos del usuario.");
    },
    onSuccess: () => {
      toast.success("Datos del usuario obtenidos correctamente.");
    },
  });
console.log("data de user",user);
  if (isLoading) {
    return <p>Cargando usuario...</p>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <p>Error al cargar los datos del usuario.</p>; // Muestra un mensaje en caso de error
  }

  // Asegúrate de que los datos del usuario existen antes de acceder a ellos
  const followedChannelsCount = user?.followedChannels?.length || 0;
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex align-items-center">
          <img
            src={
              user.avatarurl ||
              "https://via.placeholder.com/80"}
            alt="Avatar del Usuario"
            className="rounded-circle me-3"
          />
          <div>
            <h5 className="card-title mb-0">{user?.username || "Desconocido"}</h5>
          </div>
        </div>

        <div className="card-body">
          <h6 className="text-primary">Información Personal</h6>
          <p>
            <strong>Email:</strong> {user?.email || "No disponible"}
          </p>

          <h6 className="text-primary mt-3">Estadísticas</h6>
          <p>
            <strong>Canales Seguidos:</strong> {followedChannelsCount}
          </p>
          <p>
            <strong>Seguidores:</strong> {followersCount}
          </p>
          <p>
            <strong>Siguiendo:</strong> {followingCount}
          </p>
        </div>

        <div className="card-footer text-muted">
          Última actualización: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "No disponible"}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;


