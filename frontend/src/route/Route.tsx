
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import LayautAuth from "../layouts/LayautAuth";

import LayautApp from "../layouts/LayautApp";
import DashboardPage from "../Pages/DasboarPage";
import PageNotFound from "../Pages/PageNotFound";
import HomePage from "../Pages/HomePage";
import LoginForm from "../componets/Login";
import RegisterForm from "../componets/Register";
import SettingPage from "../Pages/SettingPage";
import ChannelsList from "../componets/Channels";
import Channel from "../componets/Channel";

// Componente para rutas protegidas
const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const token = localStorage.getItem('token'); // Verificamos si el usuario está autenticado
  return token ? element : <Navigate to="/home" />; // Redirigir a home si no está autenticado
};

// Componente para redirigir a la página correcta
const RootRedirect = () => {
  const token = localStorage.getItem('token'); // Verificamos si el usuario está autenticado
  return <Navigate to={token ? "/dashboard" : "/home"} />; // Redirigir a /dashboard o /home según corresponda
};

// Protege las rutas de autenticación (Login, Register)
const AuthRedirect = ({ element }: { element: ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : element; // Redirigir al dashboard si ya está autenticado
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route element={<LayautAuth />}>
          <Route path="/home" element={<AuthRedirect element={<HomePage />} />} />
          <Route path="/login" element={<AuthRedirect element={<LoginForm />} />} />
          <Route path="/register" element={<AuthRedirect element={<RegisterForm/>} />} />
        </Route>
        <Route element={<ProtectedRoute element={<LayautApp />} />}>
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/settings" element={<SettingPage/>} />
          <Route path="/channels" element={<ChannelsList/>} />
          <Route path="/channel/:id" element={<Channel/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
