module.exports = app => {
    const masters = require("../controllers/master.controller.js");
    let router = require("express").Router();

    // Crée un nouveau master
    router.post("/", masters.create);

    // Récupère tous les masters
    router.get("/", masters.findAll);

    // Récupère un master en fonction de son id
    router.get("/:id", masters.findOne);

    // Modifie un master
    router.patch("/:id", masters.update);

    // Supprime un master
    router.delete("/:id", masters.delete);

    // Supprime tous les masters
    router.delete("/", masters.deleteAll);

    app.use('/api/masters', router);
};