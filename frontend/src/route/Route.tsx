import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';
import DasboarPage from '../Pages/DasboarPage';

function RouterApp(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DasboarPage/>} />
        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </Router>
  );
};

export default RouterApp;
