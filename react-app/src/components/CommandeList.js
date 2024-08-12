import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import ReactPaginate from 'react-paginate';
import './css/CommandeList.css';

const CommandeList = () => {
  const [commandes, setCommandes] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [filter, setFilter] = useState({ burger: '', date: '', etat: '', client: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCommandes();
    fetchBurgers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [commandes, filter, currentPage]);

  const fetchCommandes = () => {
    axios.get('http://localhost:3001/commandes')
      .then(response => {
        setCommandes(response.data);
        setPageCount(Math.ceil(response.data.length / itemsPerPage));
        setFilteredCommandes(response.data.slice(0, itemsPerPage));
      })
      .catch(error => console.error("Error fetching orders!", error));
  };

  const fetchBurgers = () => {
    axios.get('http://localhost:3001/burgers')
      .then(response => {
        setBurgers(response.data);
      })
      .catch(error => console.error("Error fetching burgers!", error));
  };

  const changeEtat = (id, newEtat) => {
    axios.patch(`http://localhost:3001/commandes/${id}`, { etat: newEtat })
      .then(response => {
        const updatedCommandes = commandes.map(commande =>
          commande.id === id ? { ...commande, etat: newEtat } : commande
        );
        setCommandes(updatedCommandes);

        Swal.fire({
          title: 'Succès',
          text: `Commande ${id} marquée comme ${newEtat}.`,
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top-right',
          showConfirmButton: false
        });

        applyFilters();
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de la commande!", error);
        Swal.fire({
          title: 'Erreur',
          text: `Erreur lors de la mise à jour de la commande ${id}.`,
          icon: 'error',
          timer: 3000,
          toast: true,
          position: 'top-right',
          showConfirmButton: false
        });
      });
  };

  const applyFilters = () => {
    let filtered = commandes;

    if (filter.burger) {
      const burgerName = filter.burger.toLowerCase();
      filtered = filtered.filter(c => c.burgerNom.toLowerCase().includes(burgerName));
    }
    if (filter.date) {
      filtered = filtered.filter(c => new Date(c.date).toLocaleDateString() === filter.date);
    }
    if (filter.etat) {
      filtered = filtered.filter(c => c.etat === filter.etat);
    }
    if (filter.client) {
      filtered = filtered.filter(c => c.nomClient.toLowerCase().includes(filter.client.toLowerCase()) ||
                                        c.prenomClient.toLowerCase().includes(filter.client.toLowerCase()));
    }

    const offset = currentPage * itemsPerPage;
    setFilteredCommandes(filtered.slice(offset, offset + itemsPerPage));
    setPageCount(Math.ceil(filtered.length / itemsPerPage));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <Navbar type="gestionnaire" />
      <h2 style={{ textAlign: 'center', marginTop: '40px', color:'#ffeb3b' }}>Gérer les Commandes</h2>
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrer par client"
              value={filter.client}
              onChange={(e) => setFilter({ ...filter, client: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrer par nom de burger"
              value={filter.burger}
              onChange={(e) => setFilter({ ...filter, burger: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={filter.etat}
              onChange={(e) => setFilter({ ...filter, etat: e.target.value })}
            >
              <option value="">Filtrer par état</option>
              <option value="En cours">En cours</option>
              <option value="Terminée">Terminée</option>
              <option value="Payée">Payée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
        </div>

        <table className="table table-hover table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nom Client</th>
              <th>Prénom Client</th>
              <th>Téléphone Client</th>
              <th>Burger</th>
              <th>État</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommandes.map(commande => (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{commande.nomClient}</td>
                <td>{commande.prenomClient}</td>
                <td>{commande.telephoneClient}</td>
                <td>{commande.burgerNom}</td>
                <td>{commande.etat}</td>
                <td>{new Date(commande.date).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => changeEtat(commande.id, "Terminée")}
                    disabled={commande.etat === 'Payée'}
                    title="Terminer"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => changeEtat(commande.id, "Payée")}
                    disabled={commande.etat === 'Payée'}
                    title="Payer"
                  >
                    <FontAwesomeIcon icon={faDollarSign} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => changeEtat(commande.id, "Annulée")}
                    disabled={commande.etat === 'Payée'}
                    title="Annuler"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={'Précédent'}
          nextLabel={'Suivant'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
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
  );
};

export default CommandeList;
