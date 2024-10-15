


import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from 'react';
import { createChannel } from '../api/channel.api';

interface IChannel {
  title: string;
  description: string;
  avatarUrl: string;
}

interface CreateChannelModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CreateChannelModal = ({ isModalOpen, closeModal }: CreateChannelModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChannel>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient(); // Asegúrate de usar el cliente global

  const { mutate } = useMutation({
    mutationFn: createChannel,
    onError: () => {
      toast.error("Error al crear el canal");
      setIsSubmitting(false);
    },
    onSuccess: () => {
      toast.success("Canal creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["channels"] }); // Invalida la lista de canales
      reset();
      closeModal();
      setIsSubmitting(false);
    },
  });

  const handleCreateChannel = (formData: IChannel) => {
    setIsSubmitting(true);
    mutate(formData);
  };

  return (
    <div className={`modal fade ${isModalOpen ? 'show d-block' : ''}`} tabIndex={-1} style={{ display: isModalOpen ? 'block' : 'none', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: '#9146FF', color: '#FFFFFF' }}>
          <div className="modal-header" style={{ borderBottom: 'none' }}>
            <h5 className="modal-title">Crear nuevo canal</h5>
            <button type="button" className="close" onClick={closeModal} style={{ background: 'transparent', border: 'none' }}>
              <i className="bi bi-x-circle-fill" style={{ fontSize: '1.5rem', color: '#FFFFFF' }}></i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleCreateChannel)}>
              <div className="form-group">
                <label htmlFor="channelTitle">Título del canal</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="channelTitle"
                  {...register("title", { required: "El título del canal es obligatorio", minLength: { value: 3, message: "El título debe tener al menos 3 caracteres" } })}
                />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="channelDescription">Descripción del canal</label>
                <input
                  type="text"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="channelDescription"
                  {...register("description", { required: "La descripción es obligatoria", minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" } })}
                />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="channelAvatar">Avatar del canal</label>
                <input
                  type="url"
                  className={`form-control ${errors.avatarUrl ? 'is-invalid' : ''}`}
                  id="channelAvatar"
                  {...register("avatarUrl", { required: "El avatar es obligatorio" })}
                  placeholder="URL del avatar del canal"
                />
                {errors.avatarUrl && <div className="invalid-feedback">{errors.avatarUrl.message}</div>}
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: '#9146FF', border: 'none' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creando...' : 'Crear canal'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                  style={{ backgroundColor: '#F0F0F0', color: '#333', border: 'none' }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelModal;
