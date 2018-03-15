/**
 * Created by dazzysy on 5/18/2017.
 */
let Sequelize = require('sequelize');

const sequelize = new Sequelize('onlineshoppingdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 10,
        idle: 10000
    }
});

module.exports = sequelize;