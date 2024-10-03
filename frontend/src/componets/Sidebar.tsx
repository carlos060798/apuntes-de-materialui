import { useQuery } from "@tanstack/react-query";
import { Ichannel } from "../interface/channel-interface";
import Loader from "./Loader";
import { getChannelsfollows } from "../api/channel.api";

function Sidebar() {
    const { data, isLoading } = useQuery({
        queryKey: ["channelsFollows"],
        queryFn: getChannelsfollows,
      }); 

      if (isLoading) return   <Loader />;

      if (data && data.length > 0) {
        return (
          <div className="bg-light border-end" style={{ width: '40%' }}>
            <h5 className="text-center mt-3">Historial</h5>
            <ul className="list-group list-group-flush">
              {data.map((channel: Ichannel) => (
                <li key={channel._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{channel.title}</h6>
                      <p className="text-muted">{channel.description}</p>
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

