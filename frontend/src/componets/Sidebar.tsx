import { useQuery } from "@tanstack/react-query";
import { Ichannel } from "../interface/channel-interface";
import { Link} from "react-router-dom";
import Loader from "./Loader";
import { getChannelsfollows } from "../api/channel.api";

function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ["channelsFollows"],
    queryFn: getChannelsfollows,
  });

  // Loader mientras se cargan los datos
  if (isLoading) return <Loader />;

  // Verificar si hay canales
  if (data && data.length > 0) {
    return (
      <div className="bg-light border-end">
        <h5 className="text-center mt-3">Canales seguidos</h5>
        <ul className="list-group list-group-flush">
          {data.map((channel: Ichannel) => (
            <li key={channel._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>
                    Titulo:
                    {/* Link para redirigir a la página del canal */}
                    <Link to={`/channel/${channel._id}`} className="text-decoration-none">
                      {channel.title}
                    </Link>
                  </h6>
                  <p className="text-muted">Descripcion:<span className="px-1">{channel.description}</span></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>No se encontraron canales.</p>;
  }
}

export default Sidebar;




