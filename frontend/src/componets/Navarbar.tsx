import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión
    localStorage.removeItem('token'); // Ejemplo de eliminación de token
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo con ícono de Bootstrap */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/home">
        < i  className = "bi bi-twitch text-primary" style = {{ fontSize: "3rem" }}></i>
        </NavLink>

        {/* Botón de toggle para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del Navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Barra de búsqueda */}
          <form className="d-flex me-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>

          {/* Links de navegación */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/channels">
                Channels
              </NavLink>
            </li>
          </ul>

          {/* Íconos de notificaciones y menú de cuenta */}
          <div className="d-flex align-items-center">
            <i className="bi bi-bell-fill text-white mx-3"></i>

            {/* Dropdown de cuenta */}
            <div className="dropdown">
              <i
                className="bi bi-person-fill text-white mx-3 dropdown-toggle"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: 'pointer' }}
              ></i>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <NavLink className="dropdown-item" to="/settings">
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Botón de login estilo Twitch */}
          <NavLink to="/login" className="btn btn-login ms-3">
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


