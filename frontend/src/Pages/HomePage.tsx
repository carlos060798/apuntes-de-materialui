import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      {/* Título y Logo */}
      <div className="text-center mb-4">
        < i  className = "bi bi-twitch text-primary" style = {{ fontSize: "3rem" }}></i>
        <h1 className="mt-3">¡Bienvenido a clon de Twitch!</h1>
        <p>Conéctate con millones de streamers y espectadores.</p>
      </div>

      {/* Botones de Inicio de Sesión y Registro */}
      <div className="d-flex flex-column align-items-center">
        <Link to={'/login'} className="btn btn-light btn-lg mb-2">
          <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar Sesión
        </Link>

        <Link to={'/register'} className="btn btn-outline-light btn-lg mb-2">
          <i className="bi bi-person-plus me-2"></i> Crear Cuenta
        </Link>
        
        <p className="mt-3">¿No tienes una cuenta? ¡Únete a nosotros!</p>
      </div>

      {/* Imagen de fondo */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{ zIndex: -1 }}>
       <i className = "bi bi-film-play text-light" style = {{ fontSize: "10rem" }}></i>
      </div>
    </div>
  );
};

export default HomePage;
