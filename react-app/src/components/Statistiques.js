import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Statistiques.css';

const Statistiques = () => {
  const [commandes, setCommandes] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [recettesJour, setRecettesJour] = useState(0);

  useEffect(() => {
    // Fetch orders and burgers data
    axios.get('http://localhost:3001/commandes')
      .then(response => {
        const fetchedCommandes = response.data;
        setCommandes(fetchedCommandes);
      })
      .catch(error => console.error("Error fetching orders!", error));

    axios.get('http://localhost:3001/burgers')
      .then(response => {
        const fetchedBurgers = response.data;
        setBurgers(fetchedBurgers);
      })
      .catch(error => console.error("Error fetching burgers!", error));
  }, []);

  useEffect(() => {
    // Update revenue whenever commandes or burgers change
    if (commandes.length > 0 && burgers.length > 0) {
      updateRecettesJour();
    }
  }, [commandes, burgers]);

  const today = new Date().toISOString().split('T')[0];

  const updateRecettesJour = () => {
    const recettes = commandes
      .filter(commande => commande.date.split('T')[0] === today && commande.etat === "Payée")
      .reduce((total, commande) => {
        // Trouvez le burger correspondant à la commande
        const burger = burgers.find(b => b.nom === commande.burgerNom);
        // Ajoutez le prix du burger au total si trouvé
        const prixBurger = burger ? burger.prix : 0;
        return total + prixBurger;
      }, 0);
    setRecettesJour(recettes);
  };

  // Update data for pie chart
  const commandesDuJour = commandes.filter(commande => commande.date.split('T')[0] === today);
  const commandesPayees = commandesDuJour.filter(c => c.etat === "Payée");
  const commandesEnCours = commandesDuJour.filter(c => c.etat === "En cours");
  const commandesValidees = commandesDuJour.filter(c => c.etat === "Terminée");
  const commandesAnnulees = commandesDuJour.filter(c => c.etat === "Annulée");

  const data = {
    labels: ['En cours', 'Terminées', 'Annulées', 'Payées'],
    datasets: [
      {
        label: 'Commandes',
        data: [commandesEnCours.length, commandesValidees.length, commandesAnnulees.length, commandesPayees.length],
        backgroundColor: ['#ff6347', '#4caf50', '#f44336', '#2196f3'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Navbar type="gestionnaire" />
      <div className="container mt-4" style={{ backgroundColor: 'white' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color:'#ffeb3b' }}>Statistiques</h2>
        <div className="d-flex justify-content-center mb-4">
          <div className="card me-2" style={{ width: 'auto', height: '30%' }}>
            <div className="card-body">
              <h5 className="card-title">Recette journalière</h5>
              <h3 className="card-text">{recettesJour.toFixed(2)} FCFA</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Statut des commandes de la journée</h5>
              <div className="d-flex justify-content-center">
                <div className="pie-container" style={{ width: '500px', height: '500px' }}>
                  <Pie data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
