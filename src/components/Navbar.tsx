import { Link } from 'react-router-dom';
import logo from '../assets/mundo-star-wars.png';
import '../styles/components/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo Star Wars" className="logo-star-wars" />
      </div>

      <ul className="navbar-pages">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li className='navbar-btn'><Link to="/cadastro">Cadastra-se</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;