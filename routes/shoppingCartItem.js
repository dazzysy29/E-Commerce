/**
 * Created by dazzysy on 7/20/2017.
 */
let router = require('express').Router();
let shoppingCartItem = require('../models/shoppingCartItem');
let shoppingCart = require('../models/shoppingCart');
let jwt = require('../models/JWT');

router.post('/', (req, res) => {
    let token = req.body.token || req.get('token');
    if(token){
        jwt.verifyToken(token, (msg) => {
            if (msg.success) {
                let userId = jwt.decode(token).Id;
                let productId = req.body.ProductId;
                let quantity = req.body.Quantity;
                shoppingCart.findOne(
                    {
                        where: { UserId: userId }
                    }
                    ).then(shoppingCart => {
                        let shoppingCartId = shoppingCart.Id;
                        shoppingCartItem.findOne({
                            where: {
                                ShoppingCartId: shoppingCartId,
                                ProductsId: productId
                            }
                        }).then(existingItem => {
                            if(existingItem) {
                                shoppingCartItem.update(
                                    {
                                        Quantity: quantity + existingItem.Quantity
                                    }, {
                                        where: {
                                            ShoppingCartId: shoppingCartId,
                                            ProductsId: productId
                                        }
                                    }
                                ).then(result => {
                                    console.log(result);
                                    res.json({success: true});
                                }, err => res.json({success: false, error: err}));
                            }else {
                                shoppingCartItem.create(
                                    {
                                        ShoppingCartId: shoppingCartId,
                                        ProductsId: productId,
                                        Quantity: quantity
                                    }
                                ).then(result => {
                                    console.log(result);
                                    res.json({success: true});
                                }, err => res.json({success: false, error: err}));
                            }
                        }, err => console.log(err));
                    });
            } else {
                res.json(msg);
            }
        });
    }else {
        res.json({success: false, error: "no token found in the request"});
    }
});


module.exports = router;