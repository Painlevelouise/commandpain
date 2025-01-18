// Initialisation d'un tableau pour stocker les commandes temporairement en mémoire
let commandes = []; // Stockage en mémoire pour les commandes

export default (req, res) => {
    if (req.method === 'POST') {
        const nouvelleCommande = req.body;
        commandes.push(nouvelleCommande); // Ajouter la nouvelle commande à la mémoire
        res.status(201).json({ message: 'Commande enregistrée avec succès' });
    } else if (req.method === 'GET') {
        res.status(200).json(commandes); // Retourner les commandes stockées en mémoire
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
};
