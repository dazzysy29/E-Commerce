/**
 * Created by dazzysy on 6/6/2017.
 */
let sequelize = require('./LocalDBConn');
let Sequelzie = require('sequelize');

const token = sequelize.define("Token", {
    "Id": Sequelzie.INTEGER,
    "Token": {
        type: Sequelzie.STRING
    }}, {
        timestamps: false,
        freezeTaleName: true,
        tableName: "invalidtoken"
});


module.exports = token;