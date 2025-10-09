import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Itens from './pages/Itens';
import Sobre from './pages/Sobre';

import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Cadastro />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/itens" element={
        <PrivateRoute>
          <Itens />
        </PrivateRoute>
      } />
    </Routes>
  </Router>
);

export default AppRoutes;