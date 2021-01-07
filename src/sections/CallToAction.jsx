import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToAction({ section }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={section.photo.url} className="card-img-top" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{section.heading}</h5>
        <p className="card-text">{section.description}</p>
        <Link to={section.buttonUrl} className="btn btn-primary">
          Order Now
        </Link>
      </div>
    </div>
  );
}
