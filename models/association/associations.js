/**
 * Created by dazzysy on 6/29/2017.
 */
let shoppingCart = require ('../shoppingCart');
let shoppingCartItem = require('../shoppingCartItem');
let user = require('../user');
let product = require('../product');
let category = require('../category');


module.exports = function(){
    product.belongsTo(category, {
        foreignKey: 'ProductCategoryIndex',
        targetKey: 'Id'
    });
    category.hasMany(product, {
        foreignKey: 'ProductCategoryIndex',
        targetKey: 'Id'
    });

    product.belongsTo(user, {
        foreignKey: 'SellerId',
        targetKey: 'Id',
        as: 'Seller'
    });
    user.hasMany(product, {
        foreignKey: 'SellerId',
        targetKey: 'Id'
    });

    shoppingCartItem.belongsTo(shoppingCart, {
        foreignKey: 'ShoppingCartId',
        targetKey: 'Id'
    });
    shoppingCart.hasMany(shoppingCartItem, {
        foreignKey: 'ShoppingCartId',
        targetKey: 'Id'
    });

    shoppingCartItem.belongsTo(product, {
        foreignKey: 'ProductsId',
        targetKey: 'Id'
    });
    product.hasMany(shoppingCartItem, {
        foreignKey: 'ProductsId',
        targetKey: 'Id'
    })
}
