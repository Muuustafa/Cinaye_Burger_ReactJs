import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

const BurgerForm = ({ burger, onSave }) => {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [lastBurgerId, setLastBurgerId] = useState(null);

  useEffect(() => {
    if (burger) {
      // Charger les données si le burger est passé en props
      setNom(burger.nom);
      setPrix(burger.prix);
      setImageURL(burger.image);
      setDescription(burger.description);
    } else {
      axios.get('http://localhost:3001/burgers')
        .then(response => {
          if (response.data.length > 0) {
            const maxId = Math.max(...response.data.map(b => b.id));
            setLastBurgerId(maxId);
          } else {
            setLastBurgerId(0);
          }
        })
        .catch(error => console.error("Error fetching burgers for ID increment!", error));
    }
  }, [burger]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const burgerData = {
      id: burger ? burger.id : (lastBurgerId + 1).toString(),
      nom,
      prix: parseFloat(prix),
      description,
      image: imageURL || `/img/img${lastBurgerId + 1}.jpg`
    };

    try {
      if (burger) {
        await axios.put(`http://localhost:3001/burgers/${burger.id}`, burgerData);
        Swal.fire({
          title: 'Burger modifié avec succès !',
          icon: 'success',
          confirmButtonColor: '#ffc107'
        });
      } else {
        await axios.post('http://localhost:3001/burgers', burgerData);
        Swal.fire({
          title: 'Burger ajouté avec succès !',
          icon: 'success',
          confirmButtonColor: '#ffc107'
        });
      }
      onSave();
    } catch (error) {
      console.error("Error saving burger!", error);
      Swal.fire({
        title: 'Erreur !',
        text: 'Une erreur est survenue lors de la sauvegarde du burger.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom du Burger</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="prix">Prix</label>
        <input
          type="number"
          className="form-control"
          id="prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">URL de l'image</label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
      </div>
      <button type="submit" className="btn btn-warning btn-block" style={{marginTop:'20px'}}>
        {burger ? 'Modifier' : 'Ajouter'} Burger
      </button>
    </form>
  );
};

export default BurgerForm;
