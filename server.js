const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data storage (in-memory, for simplicity)
let commandes = [];

// API routes
app.post('/api/commandes', (req, res) => {
    commandes.push(req.body);
    res.status(201).send('Commande enregistrée avec succès');
});

app.get('/api/commandes', (req, res) => {
    res.json(commandes);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
