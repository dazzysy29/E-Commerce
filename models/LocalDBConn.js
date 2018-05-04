/**
 * Created by dazzysy on 5/18/2017.
 */
let Sequelize = require('sequelize');

const sequelize = new Sequelize('onlineshoppingdb', 'dazzysy@dazzecommerceback-mysqldbserver', 'Mima@123', {
    host: 'dazzecommerceback-mysqldbserver.mysql.database.azure.com',
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 10,
        idle: 10000
    }
});

module.exports = sequelize;
