
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
      <div className="d-flex flex-grow-1">
        {/* Sidebar lateral */}
        <div  style={{ width: '250px' }}>
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="flex-grow-1 bg-light">
          <div className="container-fluid mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutApp;



