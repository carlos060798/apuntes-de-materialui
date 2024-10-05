
import { Outlet } from 'react-router-dom';
import Navbar from '../componets/Navarbar';
import Sidebar from '../componets/Sidebar';

function LayoutApp() {
  return (
<div className="d-flex flex-column vh-100">
      {/* Navbar arriba */}
      <div>
        <Navbar />
      </div>

      {/* Contenedor principal con Sidebar y contenido */}
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar lateral */}
          <div className="col-12 col-md-6 col-lg-3 p-0">
            <Sidebar />
          </div>

          {/* Contenido principal */}
          <div className="col-12 col-md-6 col-lg-9 bg-light">
            <div className="container-fluid mt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutApp;



