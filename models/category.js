/**
 * Created by dazzysy on 6/28/2017.
 */
let sequelize = require('./LocalDBConn');
let Sequelize = require('sequelize');

const Category = sequelize.define('category', {
    "Id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "ProductCategory": Sequelize.STRING
},{
    timestamps: false,
    freezeTaleName: true,
    tableName: "productcategories"
});


module.exports = Category;