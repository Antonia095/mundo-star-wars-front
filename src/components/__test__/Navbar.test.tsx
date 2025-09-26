import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
  });
  it('deve renderizar o logo', () => {
    expect(screen.getByAltText(/Logo Star Wars/i)).toBeInTheDocument();
  });

  it('deve renderizar os links principais', () => {
    expect(screen.getByText(/início/i)).toBeInTheDocument();
    expect(screen.getByText(/sobre/i)).toBeInTheDocument();
  });

  it('deve renderizar o botão de login', () => {
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('deve renderizar o botão de cadastro', () => {
    expect(screen.getByText(/cadastra-se/i)).toBeInTheDocument();
  });

  it('os links devem apontar para as rotas corretas', () => {
    expect(screen.getByText(/início/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/sobre/i).closest('a')).toHaveAttribute('href', '/sobre');
    expect(screen.getByText(/login/i).closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText(/cadastra-se/i).closest('a')).toHaveAttribute('href', '/cadastro');
  });
});
