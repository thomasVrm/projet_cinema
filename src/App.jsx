import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddFilm from './AddFilm';
import FilmList from './FilmList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-film" element={<AddFilm />} />
        <Route path="/films" element={<FilmList />} />
      </Routes>
    </Router>
  );
};

export default App;