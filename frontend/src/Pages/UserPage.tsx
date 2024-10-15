import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, followUser, unfollowUser } from "../api/user.api";
import toast from "react-hot-toast";
import Loader from "../componets/Loader";

function UserPage() {
  const queryClient = useQueryClient();

  // Consulta para obtener usuarios
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Mutación para seguir usuarios
  const { mutate: follow, reset: resetFollow } = useMutation({
    mutationFn: followUser,
    onError: () => {
      toast.error("Error al seguir al usuario");
      resetFollow();
    },
    onSuccess: () => {
      toast.success("Usuario seguido con éxito");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Mutación para dejar de seguir usuarios
  const { mutate: unfollow, reset: resetUnfollow } = useMutation({
    mutationFn: unfollowUser,
    onError: () => {
      toast.error("Error al dejar de seguir al usuario");
      resetUnfollow();
    },
    onSuccess: () => {
      toast.success("Dejaste de seguir al usuario con éxito");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Funciones para manejar el seguimiento o dejar de seguir a un usuario
  const handleFollow = (userId: string) => {
    follow(userId);
  };

  const handleUnfollow = (userId: string) => {
    unfollow(userId);
  };

  // Muestra el loader mientras se cargan los datos
  if (isLoading) return <Loader />;
  
   return (
    <div className="container mt-4">
      <h5>Usuarios</h5>
      {data.length}
      <div className="row">
        {data.Users && data.Users.length > 0 ? (
          data.Users.map((user: any) => (
            <div className="col-lg-4 col-md-6 mb-4" key={user._id}>
              <div className="card h-100 shadow-sm rounded">
                <img
                  src={user.avatarurl}
                  className="card-img-top rounded-top"
                  alt="Avatar del usuario"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text text-muted">{user.email}</p>
                  <div className="d-flex justify-content-between mt-auto">
                    {/* Botón para seguir al usuario */}
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleFollow(user._id)}
                    >
                      <i className="bi bi-person-plus-fill me-1"></i> 
                    </button>

                    {/* Botón para dejar de seguir al usuario */}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleUnfollow(user._id)}
                    >
                      <i className="bi bi-person-dash-fill me-1"></i> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;

