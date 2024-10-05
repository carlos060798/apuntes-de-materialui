import { useState } from 'react';
import UserDataForm from '../componets/UserDataForm';
import PasswordChangeForm from '../componets/PasswordChangeForm';

function UserSettings() {
  const [activeTab, setActiveTab] = useState('userData');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <h2>Configuración de Usuario</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'userData' ? 'active' : ''}`} 
            onClick={() => handleTabChange('userData')}
          >
            Datos de Usuario
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'passwordChange' ? 'active' : ''}`} 
            onClick={() => handleTabChange('passwordChange')}
          >
            Cambiar Contraseña
          </button>
        </li>
      </ul>

      {activeTab === 'userData' && <UserDataForm/>}
      {activeTab === 'passwordChange' && <PasswordChangeForm/>}
    </div>
  );
}

export default UserSettings;
