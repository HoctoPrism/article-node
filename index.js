const express = require("express");
const app = express();

const api = require("./app/config/api.config");
app.use(api);

// Route de base
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue au pays du dev!" });
});

// Renseigne les port d'écoute pour les requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur à l\'écoute sur ${PORT}.`);
});

require("./app/routes/product.route")(app)
require("./app/routes/master.route")(app)
