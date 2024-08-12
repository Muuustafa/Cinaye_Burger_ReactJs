import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { Modal, Button } from 'react-bootstrap';
import BurgerForm from './BurgerForm'; // Importez votre formulaire ici

const BurgerList = () => {
  const [burgers, setBurgers] = useState([]);
  const [filter, setFilter] = useState({ name: '', price: '' });
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false); // Etat pour gérer l'affichage du modal
  const [currentBurger, setCurrentBurger] = useState(null); // Burger actuellement sélectionné
  const burgersPerPage = 5;

  useEffect(() => {
    fetchBurgers();
  }, []);

  const fetchBurgers = () => {
    axios.get('http://localhost:3001/burgers')
      .then(response => setBurgers(response.data))
      .catch(error => console.error("Error fetching burgers!", error));
  };

  const archiveBurger = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous êtes sur le point d'archiver ce burger !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, archiver !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/burgers/${id}`)
          .then(() => {
            setBurgers(burgers.filter(burger => burger.id !== id));
            setNotification(`Burger ${id} archivé`);
            setTimeout(() => setNotification(null), 3000);
            Swal.fire({
              title: 'Burger archivé !',
              text: 'Le burger a été archivé avec succès.',
              icon: 'success',
              confirmButtonColor: '#ffc107'
            });
          })
          .catch(error => console.error("Error archiving burger!", error));
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const filteredBurgers = burgers.filter(burger => 
    burger.nom.toLowerCase().includes(filter.name.toLowerCase()) &&
    burger.prix.toString().includes(filter.price)
  );

  // Paginate burgers
  const pageCount = Math.ceil(filteredBurgers.length / burgersPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const currentBurgers = filteredBurgers.slice(
    currentPage * burgersPerPage,
    (currentPage + 1) * burgersPerPage
  );

  const handleShowModal = (burger = null) => {
    setCurrentBurger(burger);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBurger(null);
    fetchBurgers(); // Rafraîchir la liste des burgers après modification ou ajout
  };

  return (
    <div className="burger-list-container">
      <Navbar type="gestionnaire" />
      {notification && <div className="notification alert alert-info">{notification}</div>}
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={{color:'#ffeb3b'}}>Gérer les Burgers</h2>
        <Button onClick={() => handleShowModal()} className="btn btn-warning mb-4">Ajouter Burger</Button>
        <div className="row mb-4">
          <div className="col-md-4 mb-2 mb-md-0">
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              placeholder="Filtrer par nom" 
              value={filter.name} 
              onChange={handleFilterChange} 
            />
          </div>
          <div className="col-md-4">
            <input 
              type="text" 
              name="price" 
              className="form-control" 
              placeholder="Filtrer par prix" 
              value={filter.price} 
              onChange={handleFilterChange} 
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBurgers.map(burger => (
                <tr key={burger.id}>
                  <td>{burger.id}</td>
                  <td>{burger.nom}</td>
                  <td>{burger.description}</td>
                  <td>{burger.prix} FCFA</td>
                  <td>
                    <img 
                      src={burger.image} 
                      alt={burger.nom} 
                      className="img-thumbnail img-fluid" 
                      width="100" 
                      style={{ objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <button 
                      onClick={() => archiveBurger(burger.id)} 
                      className="btn btn-danger me-2"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <Button 
                      onClick={() => handleShowModal(burger)} 
                      className="btn btn-warning"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentBurger ? 'Modifier Burger' : 'Ajouter Burger'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BurgerForm 
            burger={currentBurger} 
            onSave={handleCloseModal} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BurgerList;
