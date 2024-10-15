import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUsers } from "../api/user.api"; // Asegúrate de que la función está correctamente importada

function UserPages() {
  // Usa react-query para obtener los datos de los usuarios
  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: () => {
      toast.error("Error al obtener los datos de los usuarios.");
    },
    onSuccess: () => {
      toast.success("Datos de usuarios obtenidos correctamente.");
    },
  });

  if (isLoading) {
    return <p>Cargando usuarios...</p>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <p>Error al cargar los usuarios.</p>; // Muestra un mensaje en caso de error
  }

  return (
    <div>
      <h4>Detalles de los Usuarios</h4>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
            <p>
              <strong>Dirección:</strong> {user.address}
            </p>
            {user.friends && (
              <>
                <p>
                  <strong>Amigos:</strong> {user.friends.length} amigos
                </p>
                <ul>
                  {user.friends.map((friend: any, index: number) => (
                    <li key={index}>
                      <p>Nombre del amigo: {friend.name}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {user.projects && (
              <>
                <p>
                  <strong>Proyectos:</strong> {user.projects.length} proyectos
                </p>
                <ul>
                  {user.projects.map((project: any, index: number) => (
                    <li key={index}>
                      <p>Nombre del proyecto: {project.name}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPages;
