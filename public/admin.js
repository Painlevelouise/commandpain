document.addEventListener('DOMContentLoaded', () => {
    async function chargerCommandes() {
        try {
            const response = await fetch('/api/commandes');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des commandes');
            }
            const commandes = await response.json();
            afficherCommandes(commandes);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    function afficherCommandes(commandes) {
        const tableau = document.getElementById('tableau-commandes-admin');
        tableau.innerHTML = ''; // Vide le tableau avant de le remplir
        commandes.forEach((commande) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${commande.nom}</td>
                <td>${commande.prenom}</td>
                <td>${commande.commandes}</td>
            `;
            tableau.appendChild(row);
        });
    }

    chargerCommandes();
});
