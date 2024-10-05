import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../api/user.api";
import { IUserUpdate } from "../interface/user-interface";


const UserDataForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateUserData,
    onError: (error) => {
      toast.error("Error al actualizar los datos: " + error.message);
    },
    onSuccess: () => {
      toast.success("Datos actualizados con éxito");
      reset();
    },
  });

  const handleUpdate = (formData:IUserUpdate) => {
    mutate(formData);
  };

  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-6">
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            {...register('username', { required: 'El nombre de usuario es obligatorio' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Correo electrónico no válido',
              },
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Actualizar Datos</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default UserDataForm;
