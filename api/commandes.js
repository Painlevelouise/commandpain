export default (req, res) => {
    if (req.method === 'POST') {
        const nouvelleCommande = req.body;

        // Logique pour traiter et enregistrer la commande
        res.status(201).json({ message: 'Commande enregistrée avec succès' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
};
