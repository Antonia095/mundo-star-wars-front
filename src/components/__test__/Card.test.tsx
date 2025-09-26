import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';

describe('Card', () => {
  it('deve renderizar o título corretamente', () => {
    render(<Card title="Luke Skywalker" />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('deve renderizar a descrição se fornecida', () => {
    render(<Card title="Luke" description="Jedi Master" />);
    expect(screen.getByText('Jedi Master')).toBeInTheDocument();
  });

  it('deve renderizar detalhes se fornecidos', () => {
    render(
      <Card
        title="Luke"
        details={{ Gênero: 'Masculino', Altura: '172' }}
      />
    );
    expect(screen.getByText(/Gênero:/)).toBeInTheDocument();
    expect(screen.getByText(/Masculino/)).toBeInTheDocument();
    expect(screen.getByText(/Altura:/)).toBeInTheDocument();
    expect(screen.getByText(/172/)).toBeInTheDocument();
  });

  it('deve renderizar imagem se fornecida', () => {
    render(
      <Card
        title="Luke"
        details={{ Gênero: 'Masculino' }}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/fake-path/luke.jpg');
    expect(img).toHaveAttribute('alt', 'Luke');
  });
});
