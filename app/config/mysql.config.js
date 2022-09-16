const {Sequelize} = require("sequelize");
const dbConfig = require("./db.config");

// Créer une connexion à la base de données
const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
});

try {
    sequelize.authenticate().then(r => console.log("Connexion à la base de données réalisée avec succès"));
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = { sequelize }