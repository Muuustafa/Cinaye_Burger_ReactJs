import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Accueil.css'; // Import your custom styles here

const Accueil = () => {
  return (
    <div className="d-flex flex-column min-vh-100 accueil-container">
      <div className="container d-flex flex-column  align-items-center flex-grow-1">
        <h2 className="text-center my-5 accueil-title" style={{marginTop:'50px'}}>
          Bienvenue chez Cinaye Burger
        </h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <div className="card accueil-card mx-3">
            <div className="card-body d-flex align-items-center justify-content-center">
              <Link to="/client" className="card-link">Interface Client</Link>
            </div>
          </div>
          <div className="card accueil-card mx-3">
            <div className="card-body d-flex align-items-center justify-content-center">
              <Link to="/gestionnaire" className="card-link">Interface Gestionnaire</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
