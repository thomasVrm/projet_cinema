// Route pour l'enregistrement d'un utilisateur
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({ email, password: hashedPassword });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});