import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './css/CatalogueBurger.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const CatalogueBurgers = () => {
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/burgers')
      .then(response => setBurgers(response.data))
      .catch(error => console.error("Error fetching burgers!", error));
  }, []);

  return (
   <div>
    <Navbar type="client" />
      <div className="catalogue-burgers">
      <div className="container mt-4">
        <h2 className="text-center" style={{marginBottom: '45px', color:'#ffeb3b'}}>Catalogue des Burgers</h2>
        <div className="row">
          {burgers.filter(burger => !burger.archived).map(burger => (
            <div key={burger.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={burger.image} alt={burger.nom} className="card-img-top img-hover" />
                <div className="card-body">
                  <h5 className="card-title">{burger.nom}</h5>
                  <p className="card-text">{burger.description}</p>
                  <p className="card-text">Prix: {burger.prix} FCFA</p>
                  <Link to={`/client/burgers/${burger.id}`} className="btn btn-warning details-button">Détails</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default CatalogueBurgers;
