import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión
    localStorage.removeItem('token'); // Ejemplo de eliminación de token
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      {/* Logo con ícono de Twitch */}
      <NavLink className="navbar-brand d-flex align-items-center" to="/home">
        <i className="bi bi-twitch text-primary" style={{ fontSize: "3rem" }}></i>
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
        {/* Links de navegación, alineados a la derecha */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
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
                  <button className="dropdown-item" >
                   UserName: <span>{username }</span> 
                  </button>
  
              </li>
            </ul>
          </div>

          {/* Botón de login estilo Twitch */}
          <button className="btn btn-login ms-3 text-white" style={{ backgroundColor: '#6441a5', border: 'none' }} onClick={handleLogout}>
            logout<i className="bi bi-box-arrow-in-right me-2"></i> 
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;


