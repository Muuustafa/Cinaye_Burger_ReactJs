import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommandeForm = () => {
  const [nomClient, setNomClient] = useState('');
  const [prenomClient, setPrenomClient] = useState('');
  const [telephoneClient, setTelephoneClient] = useState('');
  const [burgerNom, setBurgerNom] = useState('');
  const [burgers, setBurgers] = useState([]);
  const [lastCommandeId, setLastCommandeId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/burgers')
      .then(response => setBurgers(response.data))
      .catch(error => console.error("Erreur lors de la récupération des burgers!", error));

    // Récupérer toutes les commandes pour déterminer le plus grand ID
    axios.get('http://localhost:3001/commandes')
      .then(response => {
        if (response.data.length > 0) {
          const maxId = Math.max(...response.data.map(commande => commande.id));
          setLastCommandeId(maxId);
        } else {
          setLastCommandeId(0); // Si aucune commande n'existe, commencer avec ID 1
        }
      })
      .catch(error => console.error("Erreur lors de la récupération des commandes!", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nouvelleCommande = {
      id: (lastCommandeId + 1)?.toString(),
      nomClient,
      prenomClient,
      telephoneClient,
      burgerNom,
      etat: "En cours",
      date: new Date().toISOString()
    };

    axios.post('http://localhost:3001/commandes', nouvelleCommande)
      .then(response => {
        Swal.fire({
          title: 'Commande passée avec succès !',
          text: 'Votre commande a été enregistrée.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ffc107'
        });

        // Mettre à jour le dernier ID de commande
        setLastCommandeId(lastCommandeId + 1);

        // Réinitialiser les champs du formulaire
        setNomClient('');
        setPrenomClient('');
        setTelephoneClient('');
        setBurgerNom('');
      })
      .catch(error => {
        console.error("Erreur lors de la création de la commande!", error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la passation de votre commande. Veuillez réessayer.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc3545'
        });
      });
  };

  return (
    <div className="commande-form-container" style={{ backgroundColor: 'white' }}>
      <Navbar type="client" />
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={{color:'#ffeb3b'}}>Passer une Commande</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
          <div className="mb-3">
            <label htmlFor="nomClient" className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nomClient"
              value={nomClient}
              onChange={e => setNomClient(e.target.value)}
              placeholder="Nom"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prenomClient" className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="prenomClient"
              value={prenomClient}
              onChange={e => setPrenomClient(e.target.value)}
              placeholder="Prénom"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telephoneClient" className="form-label">Téléphone</label>
            <input
              type="text"
              className="form-control"
              id="telephoneClient"
              value={telephoneClient}
              onChange={e => setTelephoneClient(e.target.value)}
              placeholder="Téléphone"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="burgerNom" className="form-label">Sélectionner un burger</label>
            <select
              className="form-select"
              id="burgerNom"
              value={burgerNom}
              onChange={e => setBurgerNom(e.target.value)}
              required
            >
              <option value="">Sélectionner un burger</option>
              {burgers.filter(burger => !burger.archived).map(burger => (
                <option key={burger.id} value={burger.nom}>{burger.nom}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-warning w-100">Passer Commande</button>
        </form>
      </div>
    </div>
  );
};

export default CommandeForm;
