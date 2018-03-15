/**
 *
 * Created by dazzysy on 5/31/2017.
 */
let sequelize = require('../models/LocalDBConn');
let Sequelize = require('sequelize');

const Product = sequelize.define("product", {
    "Id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "AvailableQuantity": Sequelize.INTEGER,
    "EstimateddeliveryDays": Sequelize.INTEGER,
    "Price": Sequelize.INTEGER,
    "ProductCategoryIndex": Sequelize.INTEGER,
    "ProductDescription": Sequelize.STRING,
    "ProductName": Sequelize.STRING,
    "ProductThumbnail": Sequelize.STRING,
    "ProductPhotosLinks": Sequelize.STRING,
    "SellerId": Sequelize.INTEGER,
    "PublishDate": Sequelize.STRING,
    "Rate": Sequelize.DOUBLE
}, {
    timestamps: false,
    freezeTaleName: true,
    tableName: "products"
});


module.exports = Product;