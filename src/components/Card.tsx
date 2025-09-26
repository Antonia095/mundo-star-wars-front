import '../styles/components/Card.css';
import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  details?: Record<string, string>;
}

const Card: React.FC<CardProps> = ({ title, description, image, details }) => {
  return (
    <div className="sw-card">
      {image && (
        <div className="sw-card-img-wrapper">
          <img src={image} alt={title} className="sw-card-img" />
        </div>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {details && (
        <ul>
          {Object.entries(details).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
