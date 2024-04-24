import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await axios.get('/api/films');
        setFilms(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchFilms();
  }, []);

  const deleteFilm = async filmId => {
    try {
      const res = await axios.delete(`/api/films/${filmId}`);
      setFilms(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateStatus = async (filmId, newStatus) => {
    try {
      const res = await axios.put(`/api/films/${filmId}`, { status: newStatus });
      setFilms(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Liste des films</h2>
      <ul>
        {films.map(film => (
          <li key={film._id}>
            {film.title} - {film.status}
            <button onClick={() => deleteFilm(film._id)}>Supprimer</button>
            <select value={film.status} onChange={e => updateStatus(film._id, e.target.value)}>
              <option value="À Voir">À Voir</option>
              <option value="Vu">Vu</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;