const {sequelize} = require("../config/mysql.config");
const {DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    master: {
        type: DataTypes.INTEGER
    },
});

//Créer un produit
Product.new = (req, result) => {
    Product.create(req).then((res) => {
        result(null, { id: res.insertId, ...req })
    });
};

//Affichage d'un produit grâce à son identifiant
Product.findById = (id, result) => {
    Product.findOne({where: {id: id}}).then((res) => {
        result(null,res);
    })
};

//Affichage de tous les produits
Product.getAll = (result) => {
    Product.findAll({raw: true}).then((res) => {
        result(null, res);
    });
};

//Modification d'un produit
Product.updateById = (id, master, result) => {
    Product.update(master.get(), {where: {id: id}}).then((res) => {
        result(null, res);
    });
};

//Suppression d'un produit
Product.remove = (id, result) => {
    Product.destroy({where: {id: id}}).then((res) => {
        result(null, res);
    });
};

//Suppression de tous les produits
Product.removeAll = result => {
    Product.truncate().then((res) => {
        result(null, res);
    });
};
module.exports = Product;