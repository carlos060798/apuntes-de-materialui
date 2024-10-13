import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateChannel } from "../api/channel.api";
import { Ichannel } from "../interface/channel-interface";

interface PropsChannel {
  closeModal: () => void;
  channelId: string;
  data: Ichannel;
}

const SettingChannelPage = ({ closeModal, channelId, data }: PropsChannel) => {
  /*const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      avatarUrl: data.avatarUrl,
    },
  });

  // Usar el QueryClient global
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateChannel,
    onError: () => {
      toast.error(
        "Error al actualizar el canal. No tienes los permisos necesarios"
      );
    },
    onSuccess: () => {
      toast.success("Canal actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["channel", channelId] }); // Actualiza el canal en la vista principal en tiempo real
      reset();
      closeModal();
    },
  });

  const handleUpdate = (formData: Partial<Ichannel>) => {
    const dataToUpdate = {
      id: channelId,
      dataChannel: formData,
    };
    mutate(dataToUpdate);
  };
*/ 

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    title: data.title,
    description: data.description,
    avatarUrl: data.avatarUrl,
  },
});

// Usar el QueryClient global
const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: updateChannel,
  onError: () => {
    toast.error(
      "Error al actualizar el canal. No tienes los permisos necesarios"
    );
  },
  onSuccess: () => {
    toast.success("Canal actualizado con éxito");

    // Invalida la query del canal específico
    queryClient.invalidateQueries({ queryKey: ["channel", channelId] });

    // Invalida la query de los canales seguidos
    queryClient.invalidateQueries({ queryKey: ["channelsFollows"] });

    reset();
    closeModal();
  },
});

const handleUpdate = (formData: Partial<Ichannel>) => {
  const dataToUpdate = {
    id: channelId,
    dataChannel: formData,
  };
  mutate(dataToUpdate);
};
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título</label>
        <input
          type="text"
          id="title"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          {...register("title", { required: "El título es obligatorio" })}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea
          id="description"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="avatarUrl" className="form-label">URL del Avatar</label>
        <input
          type="text"
          id="avatarUrl"
          className={`form-control ${errors.avatarUrl ? "is-invalid" : ""}`}
          {...register("avatarUrl", {
            required: "La URL del avatar es obligatoria",
          })}
        />
        {errors.avatarUrl && (
          <div className="invalid-feedback">{errors.avatarUrl.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Actualizar Canal
      </button>
    </form>
  );
};

export default SettingChannelPage;
