
/*interface PropsChannel {
    isModalOpen: boolean;
    closeModal: () => void;
    channelId: string;
    data: Ichannel
  }
  
  // Cambia el nombre del componente a 'SettingChannel' (capitalizado)
  function SettingChannelPage({ isModalOpen, closeModal,channelId,data}: PropsChannel) {
    console.log("data canal: ", data);
    // Aquí puedes usar isModalOpen para controlar la visibilidad del modal
    return (
      <>
        {isModalOpen && (
          <div>
            <h2>Configuración del Canal</h2>
             
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </>
    );
  }
  
  export default SettingChannelPage;
  

  */

  import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateChannel } from "../api/channel.api";  // Importa la función de actualización
import { Ichannel } from "../interface/channel-interface";

interface PropsChannel {
  isModalOpen: boolean;
  closeModal: () => void;
  channelId: string;
  data: Ichannel;
}

const SettingChannelPage = ({ isModalOpen, closeModal, channelId, data }: PropsChannel) => {
  // Configuración del formulario
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      avatarUrl: data.avatarUrl,
      isActivated: data.isActivated,
    },
  });

  // Mutación para actualizar el canal
  const { mutate } = useMutation({
    mutationFn: updateChannel,
    onError: (error: any) => {
      toast.error("Error al actualizar el canal: " + error.message);
    },
    onSuccess: () => {
      toast.success("Canal actualizado con éxito");
      reset();  // Reinicia el formulario después de la actualización
      closeModal();  // Cierra el modal
    },
  });

  // Función que se ejecuta cuando el formulario es enviado
  const handleUpdate = (formData: Partial<Ichannel>) => {
    const dataToUpdate = {
      id: channelId,
      dataChannel: formData,
    };
    mutate(dataToUpdate);  // Llama a la mutación con los datos actualizados
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-container">
          <h2>Configuración del Canal</h2>
          <form onSubmit={handleSubmit(handleUpdate)}>
            {/* Campo: Título */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Título</label>
              <input
                type="text"
                id="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                {...register('title', { required: 'El título es obligatorio' })}
              />
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </div>

            {/* Campo: Descripción */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                id="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                {...register('description', { required: 'La descripción es obligatoria' })}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            {/* Campo: URL del Avatar */}
            <div className="mb-3">
              <label htmlFor="avatarUrl" className="form-label">URL del Avatar</label>
              <input
                type="text"
                id="avatarUrl"
                className={`form-control ${errors.avatarUrl ? 'is-invalid' : ''}`}
                {...register('avatarUrl', { required: 'La URL del avatar es obligatoria' })}
              />
              {errors.avatarUrl && <div className="invalid-feedback">{errors.avatarUrl.message}</div>}
            </div>

            {/* Campo: ¿Está Activado? */}
            <div className="mb-3">
              <label htmlFor="isActivated" className="form-label">¿Está Activado?</label>
              <input
                type="checkbox"
                id="isActivated"
                {...register('isActivated')}
              />
            </div>

            <button type="submit" className="btn btn-primary">Actualizar Canal</button>
          </form>
          <button onClick={closeModal} className="btn btn-secondary mt-3">Cerrar</button>
        </div>
      )}
    </>
  );
};

export default SettingChannelPage;
