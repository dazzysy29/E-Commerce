/**
 * Created by dazzysy on 5/17/2017.
 */
let sequelize = require('../models/LocalDBConn');
let Sequelize = require('sequelize');

const User = sequelize.define("User", {
    "Id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "Address": Sequelize.STRING,
    "Birthday": Sequelize.STRING,
    "City": Sequelize.STRING,
    "EmailAddress": {
        type: Sequelize.STRING,
        validate: {
            formatValidation: function(value, next){
                let temp = value.split('@');
                if(temp[0] == undefined || temp[1] == undefined) {
                    next("EmailAddress is not in right format.");
                }
                return next();
            }
        }
    },
    "FirstName": Sequelize.STRING,
    "LastName": Sequelize.STRING,
    "Password": Sequelize.STRING,
    "PhoneNumber": Sequelize.STRING,
    "PostalCode": Sequelize.STRING,
    "State": Sequelize.STRING,
    "Type": Sequelize.INTEGER,
    "Avatar": Sequelize.STRING,
    "Username": {
        type: Sequelize.STRING,
        validate: {
            isUnique: function(value, next){
                User.findOne({
                    where: {"Username": value}
                }).then(function(res){
                    if(res){
                        return next("This Username has already existed.");
                    }
                    return next();
                }, function(err){
                    return next(err);
                });
            }
        }
    }
}, {
    timestamps: false,
    freezeTaleName: true,
    tableName: "users"
});

module.exports = User;