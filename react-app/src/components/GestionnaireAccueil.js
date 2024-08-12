import React from 'react';
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/GestionnaireAccueil.css';  // Assurez-vous que votre fichier CSS est correctement importé

const GestionnaireAccueil = () => {
  return (
    <div className="gestionnaire-accueil">
      <Navbar type="gestionnaire" />
      <div className="content">
        <h2 style={{color:'white', fontSize:'3.4rem', fontFamily:'monospace'}}>Interface Gestionnaire</h2>
        <p style={{color:'white', fontSize:'2.1rem', fontFamily:'monospace'}}>Bienvenue dans l'interface de gestion des commandes et des burgers.</p>
      </div>
    </div>
  );
};

export default GestionnaireAccueil;
