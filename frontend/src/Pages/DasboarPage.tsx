


import { followChannel, getChannels, unfollowChannel } from '../api/channel.api';
import { useQuery } from "@tanstack/react-query";
import { Ichannel } from "../interface/channel-interface";
import Loader from "../componets/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 


function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannels,
  });

  const queryClient = useQueryClient();
  const { mutate,reset } = useMutation({

    mutationFn: followChannel,
    onError: () => {
      toast.error("Error al seguir el canal");

      reset();
    },
    onSuccess: () => {
      toast.success("Canal seguido con éxito");
      queryClient.invalidateQueries({ queryKey: ["channelsFollows"] });

    
    }
  });
 

  const { mutate:unfollow} = useMutation({

    mutationFn:unfollowChannel,
    onError: () => {
      toast.error("Error al seguir el canal");

      reset();
    },
    onSuccess: () => {
      toast.success("dejaste de seguir el canal con éxito");
      queryClient.invalidateQueries({ queryKey: ["channelsFollows"] });

      reset();
    }
  });

  
  if (isLoading) return <Loader />;

  const handleFollow = (channelId: string) => {
    
  mutate(channelId);
  };

  const handleUnfollow = (channelId: string) => {
    unfollow(channelId);
  };

  if (data && data.length > 0) {
    return (
      <div className="container mt-4">
        <div className="row">
          {data.map((channel: Ichannel) => (
            <div className="col-lg-4 col-md-6 mb-4" key={channel.id}>
              <div className="card">
                <img
                  src={channel.avatarUrl || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt="Stream thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title">{channel.title}</h5>
                  <p className="card-text">
                    {channel.username} · {channel.isOnline ? "Online" : "Offline"}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success"
                      onClick={() => handleFollow(channel.id)}
                    >
                      Seguir
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnfollow(channel.id)}
                    >
                      Dejar de seguir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <p>No se encontraron canales.</p>;
  }
}

export default DashboardPage;
