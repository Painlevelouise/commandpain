import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const filePath = path.join(process.cwd(), 'data', 'commandes.json');

    // Vérification d'existence et accès
    fs.access(filePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('Fichier commandes.json introuvable:', err);
                return res.status(500).json({ message: 'Fichier commandes.json introuvable' });
            } else if (err.code === 'EACCES') {
                console.error('Permission refusée sur commandes.json:', err);
                return res.status(500).json({ message: 'Permission refusée sur commandes.json' });
            } else {
                console.error('Erreur inconnue d\'accès:', err);
                return res.status(500).json({ message: 'Erreur inconnue d\'accès', error: err.message });
            }
        }

        if (req.method === 'POST') {
            const nouvelleCommande = req.body;

            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error('Erreur de lecture:', readErr);
                    return res.status(500).json({ message: 'Erreur interne du serveur lors de la lecture' });
                }

                let commandes = [];
                try {
                    commandes = JSON.parse(data || '[]');
                } catch (parseErr) {
                    console.error('Erreur de parsing JSON:', parseErr);
                    return res.status(500).json({ message: 'Erreur de parsing JSON' });
                }

                commandes.push(nouvelleCommande);

                fs.writeFile(filePath, JSON.stringify(commandes, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Erreur d\'écriture:', writeErr);
                        return res.status(500).json({ message: 'Erreur interne du serveur lors de l\'écriture' });
                    }
                    res.status(201).json({ message: 'Commande enregistrée avec succès' });
                });
            });
        } else if (req.method === 'GET') {
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error('Erreur de lecture:', readErr);
                    return res.status(500).json({ message: 'Erreur interne du serveur lors de la lecture' });
                }
                res.status(200).json(JSON.parse(data || '[]'));
            });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Méthode ${req.method} non autorisée`);
        }
    });
};
