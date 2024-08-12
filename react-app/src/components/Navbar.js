import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Navbar.css'; // Assurez-vous de créer ce fichier CSS pour les styles personnalisés

const Navbar = ({ type }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/img/logo2.png" alt="Logo" style={{width:'150px', height:'100px'}} className="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {type === 'client' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/client/">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/client/burgers">Catalogue des Burgers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/client/commander">Passer une Commande</Link>
                </li>
              </>
            )}
            {type === 'gestionnaire' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/gestionnaire/">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/gestionnaire/burgers">Gérer les Burgers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/gestionnaire/commandes">Gérer les Commandes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/gestionnaire/statistiques">Statistiques</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
