/*
import {Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from '../api/user.api';
import { IUserLogin } from '../interface/user-interface';
import ErrorMensaje from './ErrorMessage';
import  {toast} from 'react-hot-toast';



function  LoginForm() {
  const initialValues: IUserLogin= {
    email: '',
    password: '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({

    mutationFn: loginUser,

    onError: (error) => {
      toast.error( error.message);
      


    },
    onSuccess: () => {
      toast.success('Bienvenido');
        navigate('/')
    },

  })
  const handleLogin = (formData: IUserLogin) => {
    mutate(formData);
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Introduce tu correo"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
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
              id="password"
              placeholder="Introduce tu contraseña"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMensaje>{errors.password.message}</ErrorMensaje>
            )}
          </div>
          <button type="submit" className="btn  w-100" style={{"color:#9146FF"}}>Iniciar Sesión</button>
        </form>
        <p className="text-center text-muted mt-3">
          ¿No puedes iniciar sesión?{' '}
          <Link to="/register" className="text-primary">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>

  )
}


export default LoginForm;  
*/



import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from '../api/user.api';
import { IUserLogin } from '../interface/user-interface';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const initialValues: IUserLogin = {
    email: '',
    password: '',
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Bienvenido');
      navigate('/');
    },
  });

  const handleLogin = (formData: IUserLogin) => {
    mutate(formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#191A1D' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4" style={{ color: '#9146FF' }}>Iniciar Sesión</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Introduce tu correo"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
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
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Introduce tu contraseña"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: '#9146FF', color: 'white', width: '100%' }}>
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center text-muted mt-3">
          ¿No puedes iniciar sesión?{' '}
          <Link to="/register" className="text-primary">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
