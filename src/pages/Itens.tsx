
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import { itens } from '../constants';
import '../styles/pages/Itens.css';

const Itens = () => {
  useAuth();
  return (
    <div className="itens-container">
    <h2>Star Wars</h2>
      
      <div className='card-container'>
        {itens.map((item, idx) => (
          <Card
            key={item.title + idx}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Itens;
