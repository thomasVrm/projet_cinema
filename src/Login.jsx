import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        email,
        password 
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={onSubmit} className="login-form">
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
            required
            className="form-control"
          />
        </div>
        <input type="submit" value="Se connecter" className="btn btn-primary" />
      </form>
      <div className="register-link">
        <p>Vous n'avez pas de compte ?</p>
        <Link to="/register" className="link">S'inscrire</Link>
      </div>
    </div>
  );
};

export default Login;