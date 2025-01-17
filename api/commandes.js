import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const filePath = path.join(process.cwd(), 'data', 'commandes.json');

    if (req.method === 'POST') {
        const nouvelleCommande = req.body;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture:', err);
                return res.status(500).json({ message: 'Erreur interne du serveur' });
            }

            const commandes = JSON.parse(data || '[]');
            commandes.push(nouvelleCommande);

            fs.writeFile(filePath, JSON.stringify(commandes, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erreur d\'écriture:', err);
                    return res.status(500).json({ message: 'Erreur interne du serveur' });
                }
                res.status(201).json({ message: 'Commande enregistrée avec succès' });
            });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
};
