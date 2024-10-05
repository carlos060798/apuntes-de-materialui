import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../api/setting.api';
import { IUserPassword } from "../interface/user-interface";

function PasswordChangeForm() {
  const { register, handleSubmit,  formState: { errors } } = useForm<IUserPassword>();

  // useMutation para manejar la lógica de cambio de contraseña
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Contraseña cambiada con éxito");
    },
    onError: () => {
      toast.error("Error al cambiar la contraseña");
    },
  });

  const handlePasswordChange = (formData: IUserPassword) => {
    mutation.mutate(formData);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <form onSubmit={handleSubmit(handlePasswordChange)}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña Actual</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                {...register('password', { 
                  required: 'La contraseña actual es obligatoria', 
                  minLength: { 
                    value: 8, 
                    message: 'La contraseña debe tener al menos 8 caracteres' 
                  } 
                })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                id="newPassword"
                {...register('newPassword', {
                  required: 'La nueva contraseña es obligatoria',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
            </div>

           

            <button type="submit" className="btn btn-primary w-100" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordChangeForm;
