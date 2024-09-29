import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/user-interface";
import { createAcount } from "../api/user.api";
import   ErrorMensaje from './ErrorMessage';
import { toast } from'react-hot-toast';
interface LoginFormProps {
    handleToggle: () => void;
  }
function RegisterForm({ handleToggle }: LoginFormProps) {
    const initialValues: IUser = {
        username: "",
        email: "",
        password: "",
    
      };
      const navigate = useNavigate()
    
      const {
        register,
    
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IUser>({ defaultValues: initialValues });
    
    
    
      const { mutate, } = useMutation({
        mutationFn: createAcount,
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
        toast.success("Cuenta creada exitosamente!");
          reset()
          navigate("/login")
        },
    
    
      })
    
      const handleRegister = (formData: IUser) => {
        mutate(formData)
      };
    
    
      return (
    
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Registrase</h3>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Introduce tu nombre"
                  {...register('username', {
                    required: 'El Nombre de usuario es obligatorio',
                  })}
                />
                {errors.username && <ErrorMensaje>{errors.username.message}</ErrorMensaje>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Introduce tu correo"
                  {...register('email', {
                    required: 'El Email de registro es obligatorio',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'E-mail no válido',
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMensaje>{errors.email.message}</ErrorMensaje>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
    
                  {...register('password', {
                    required: 'El Password es obligatorio',
                    minLength: {
                      value: 8,
                      message: 'El Password debe ser mínimo de 8 caracteres',
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMensaje>{errors.password.message}</ErrorMensaje>
                )}
              </div>
              <button type="submit" className="btn btn-success w-100">Registrar</button>
            </form>
    
            <p className="text-center text-muted"
              onClick={handleToggle}
            >
                ¿Ya tienes una cuenta? Inicia sesión.  {' '}
                Login{' '}
  
            </p>
          </div>
        </div>
      )
    }
    
export default RegisterForm;