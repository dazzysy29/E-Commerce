/**
 * Created by dazzysy on 5/20/2017.
 */
let sequelize = require('./LocalDBConn');
let Sequelize = require('sequelize');

const shoppingCart = sequelize.define("ShoppingCart", {
    "Id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "CreatedTime": Sequelize.STRING,
    "UserId": {
        type: Sequelize.INTEGER,
        validate: {
            isUnique: function(value, next){
                shoppingCart.findOne({where: {"UserId": value}}).then(function(result){
                    if(result){
                        next("ShoppingCart already exists");
                    }else next()
                }, function(err){
                    next(err);
                })
            }
        }
    },
    "UpdatedTime": Sequelize.STRING,
    "ExpiredTime": Sequelize.STRING
}, {
    timestamps: false,
    freezeTaleName: true,
    tableName: "shoppingcart",

    //
    // hooks: {
    //     afterFind: (shoppingCarts)=>{
    //         if(shoppingCarts instanceof Array){
    //             shoppingCarts.forEach(function(shoppingCart){
    //                 console.log(shoppingCart.dataValues);
    //             });
    //         }else{
    //             console.log(shoppingCarts.dataValues);
    //         }
    //     }
    // }
});

module.exports = shoppingCart;