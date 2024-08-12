import React from 'react';
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/ClientAccueil.css';  // Assurez-vous que votre fichier CSS est correctement importé

const ClientAccueil = () => {
  return (
    <div className="client-accueil">
      <Navbar type="client" />
      <div className="content">
        <h2 style={{color:'white', fontSize:'3.4rem', fontFamily:'monospace'}}>Interface Client</h2>
        <p style={{color:'white', fontSize:'1.7rem', fontFamily:'monospace'}}>Bienvenue dans l'interface client de Cinaye Burger. Découvrez notre catalogue de burgers et passez votre commande facilement.</p>
      </div>
    </div>
  );
};

export default ClientAccueil;
