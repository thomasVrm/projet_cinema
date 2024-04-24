import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez le composant Link
import './Login.css'; // Importez votre fichier CSS pour les styles personnalisés

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', {
        name,
        email,
        password
      });
      console.log(res.data); 
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Inscription</h1>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
            className="form-control"
          />
        </div>
        <input type="submit" value="S'inscrire" className="btn btn-primary" />
      </form>
      <div className="login-link">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/" className="link">Se connecter</Link>
      </div>
    </div>
  );
};

export default Register;