/**
 * Created by dazzysy on 6/6/2017.
 */
let sequelize = require("./LocalDBConn");
let Sequelize = require("sequelize");

const shoppingCartItem = sequelize.define('ShoppingCartItem', {
    "Id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "Productsid": Sequelize.INTEGER,
    "Quantity": Sequelize.INTEGER,
    "ShoppingCartId": Sequelize.INTEGER,
    "TotalPrice": Sequelize.INTEGER
}, {
    timestamps: false,
    freezeTaleName: true,
    tableName: "shoppingcartitems"
});

module.exports = shoppingCartItem;