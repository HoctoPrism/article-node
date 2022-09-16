const {sequelize} = require("../config/mysql.config");
const {DataTypes } = require('sequelize');

const Master = sequelize.define('masters', {
  name: { type: DataTypes.STRING }
},{ tableName: 'masters' });

//Créer un produit
Master.new = (req, result) => {
    Master.create({name: req}).then((res) => {
        result(null, { id: res.insertId, ...{name: req} })
    });
};

//Affichage d'un produit grâce à son identifiant
Master.findById = (id, result) => {
    Master.findOne({where: {id: id}}).then((res) => {
        result(null,res);
    })
};

//Affichage de tous les produits
Master.getAll = (result) => {
    Master.findAll({raw: true}).then((res) => {
        result(null, res);
    });
};

//Modification d'un produit
Master.updateById = (id, master, result) => {
    Master.update({name: master}, {where: {id: id}}).then((res) => {
        result(null, res);
    });
};

//Suppression d'un produit
Master.remove = (id, result) => {
    Master.destroy({where: {id: id}}).then((res) => {
        result(null, res);
    });
};

//Suppression de tous les produits
Master.removeAll = result => {
    Master.truncate().then((res) => {
        result(null, res);
    });
};
module.exports = Master;