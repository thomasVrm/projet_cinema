import React, { useState } from 'react';
import axios from 'axios';

const AddFilm = ({ updateFilmList }) => {
  const [title, setTitle] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/films', { title });
      updateFilmList(res.data); // Mettre à jour la liste des films après l'ajout
      setTitle('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Ajouter un film</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Titre du film"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddFilm;