const Master = require("../models/master.model.js");

// Création et sauvegarde d'un master
exports.create = (req, res) => {

    // Validation de la requete
    if (!req.body) {
        res.status(400).send({ message: "Le contenu ne peut être vide" });
    }

    // Création du master
    let name = req.body.name;

    // sauvegarde du master dans la base de données
    Master.new(name, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "apparition d'erreurs lors de la création d'un master" });
        else res.send(data);
    });

};

//Récupération de tous les masters
exports.findAll = (req, res) => {
    Master.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Erreurs lors de la récupération des masters" });
        else res.send(data);
    });
};


// Récupération d'un master en fonction de son identifiant
exports.findOne = (req, res) => {
    Master.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Aucun master trouvé") {
                res.status(404).send({ message: `Pas de master avec l'id ${req.params.id}.` });
            } else {
                res.status(500).send({ message: "Erreur de récupération du master avec l'identifiant " +  req.params.id });
            }
        } else res.send(data);
    });
};


// Modification d'un master
exports.update = (req, res) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({ message: "Le contenu ne peut être vide!" });
    }
    Master.updateById( req.params.id, req.body.name, (err, data) => {
        if (err) {
            if (err.kind === "Aucun master trouvé") {
                res.status(404).send({ message: `Pas de master avec l'id ${req.params.id}.` });
            } else {
                res.status(500).send({ message: "Erreur de récupération du master avec l'identifiant " + req.params.id });
            }
        } else res.send(data);
    });
};

// Suppression d'un master
exports.delete = (req, res) => {
    Master.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Aucun master trouvé") {
                res.status(404).send({ message: `Pas de master avec l'id ${req.params.id}.` });
        } else {
            res.status(500).send({ message: "Impossible de supprimé le master avec l'id " + req.params.id });
        }
        } else res.send({ message: `Le master a été supprimé avec succès!` });
    });
};

// Suppression de tous les masters
exports.deleteAll = (req, res) => {
    Master.removeAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Apparition d'erreurs lors de la suppression de tous les masters." });
        else res.send({ message: `Tous les masters ont été supprimés!` });
    });
};