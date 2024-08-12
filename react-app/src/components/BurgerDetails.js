import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/BurgerDetails.css';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const BurgerDetails = () => {
  const { id } = useParams();
  const [burger, setBurger] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [prenomClient, setPrenomClient] = useState('');
  const [telephoneClient, setTelephoneClient] = useState('');
  const [lastCommandeId, setLastCommandeId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/burgers/${id}`)
      .then(response => setBurger(response.data))
      .catch(error => console.error("Error fetching burger details!", error));

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
  }, [id]);

  const handleBack = () => {
    window.history.back(); // Retourne à la page précédente
  };

  const handleOrder = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nouvelleCommande = {
      id: (lastCommandeId + 1)?.toString(),
      nomClient,
      prenomClient,
      telephoneClient,
      burgerNom: burger.nom,
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

        setNomClient('');
        setPrenomClient('');
        setTelephoneClient('');
        setShowModal(false);
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

  if (!burger) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="burger-details-container">
      <Navbar type="client" />
      <div className="container mt-5" style={{ padding: 'auto' }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="burger-image-container">
              <img 
                src={burger.image} 
                alt={burger.nom} 
                className="burger-image"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="burger-details-content">
              <h2 className="burger-name">{burger.nom}</h2>
              <p className="burger-description">{burger.description}</p>
              <p className="burger-price">Prix: {burger.prix} FCFA</p>
              <button className="btn btn-danger mt-3" onClick={handleBack}>Retour</button>
              <button className="btn btn-warning mt-3 ms-2" onClick={handleOrder}>Commander</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Passer une Commande</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"><FontAwesomeIcon icon={faTimes} /></button>
              </div>
              <div className="modal-body">
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
                    <label htmlFor="burgerNom" className="form-label">Burger Sélectionné</label>
                    <input
                      type="text"
                      className="form-control"
                      id="burgerNom"
                      value={burger.nom}
                      readOnly
                    />
                  </div>
                  <button type="submit" className="btn btn-warning w-100">Passer Commande</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerDetails;
