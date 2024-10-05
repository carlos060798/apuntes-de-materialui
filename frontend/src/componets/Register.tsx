

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interface/user-interface";
import { createAcount } from "../api/user.api";
import { toast } from 'react-hot-toast';

const RegisterForm = () => {
  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAcount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Cuenta creada exitosamente!");
      reset();
      navigate("/login");
    },
  });

  const handleRegister = (formData: IUser) => {
    mutate(formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#191A1D' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4" style={{ color: '#9146FF' }}>Registrarse</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Introduce tu nombre"
              {...register('username', {
                required: 'El Nombre de usuario es obligatorio',
              })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'El Password es obligatorio',
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres',
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: '#9146FF', color: 'white', width: '100%' }}>
            Registrar
          </button>
        </form>

        <p className="text-center text-muted mt-3">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
