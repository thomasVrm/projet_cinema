const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Modèle de l'utilisateur

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Configuration de la stratégie locale pour la connexion
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Email non trouvé' });
      }

      // Vérifiez le mot de passe
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Mot de passe incorrect' });
        }
      });
    })
    .catch(err => console.log(err));
}));

// Configuration de la stratégie JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretkey'
};
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => console.log(err));
}));

// Connexion à MongoDB Atlas

mongoose.connect('mongodb+srv://thomas230801:<mFhNKWLryFwGyqJi>@cluster0.txfnmpg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB Atlas:', err));
  
// Routes pour les films


// Ajouter un film
app.post('/api/films', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Votre code pour ajouter un film
});

// Supprimer un film
app.delete('/api/films/:filmId', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Votre code pour supprimer un film
});

// Mettre à jour le statut d'un film (À Voir / Vu)
app.put('/api/films/:filmId', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Votre code pour mettre à jour le statut d'un film
});

// Obtenir tous les films de l'utilisateur connecté
app.get('/api/films', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Votre code pour obtenir tous les films de l'utilisateur connecté
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));

