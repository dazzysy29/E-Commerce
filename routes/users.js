/**
 * Created by dazzysy on 5/17/2017.
 */
let express             = require('express');
let router              = express.Router();
let sequelize           = require('../models/LocalDBConn');

let User                = require('../models/user');
let jwt                 = require('../models/JWT');
let shoppingCart        = require('../models/shoppingCart');
let shoppingCartItem    = require('../models/shoppingCartItem');
let product             = require('../models/product');
let Category            = require('../models/category');

let association         = require('../models/association/associations');
association();

/* GET users listing. */
router.get('/', function(req, res){
    res.json({ success: true});
});

router.put('/ProfileUpdate', function(req, res){

});

router.post('/Validation', function(req, res){
    User.findOne({where: {Username: req.body.Username}}).then(function(user){
        if(user){
            if(user.Password == req.body.Password){
                let tempUser = {};
                tempUser.Id = user.Id;
                let token = jwt.issuingToken(tempUser);
                res.json({success: true,
                    token: token,
                    userId: new Buffer(tempUser.Id).toString('base64'),
                    userAvatar: user.Avatar,
                    userName: user.Username
                });
            }else res.json({success: false, error: "invalid password"});
        }else {
            res.json({success: false, error: "invalid username"});
        }
        }
    );
});

router.post("/Registration", function(req, res){
    let nullList = [];
    let counter = 0;
    for(let prop in req.body){
        counter = counter + 1;
        if(req.body.hasOwnProperty(prop)){
            if(req.body[prop] == null || req.body[prop] == ""){
                nullList.push(prop);
            }
        }
    }
    if (nullList[0] == null && counter == 12) {
        User.create({
            "Address": req.body.Address,
            "Birthday": req.body.Birthday,
            "City": req.body.City,
            "EmailAddress": req.body.EmailAddress,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "Password": req.body.Password,
            "PhoneNumber": req.body.PhoneNumber,
            "PostalCode": req.body.PostalCode,
            "State": req.body.State,
            "Type": req.body.Type,
            "Username": req.body.Username
        }).then(function () {
            res.json({success: true});
        }, function (err) {
            res.json({
                success: false,
                error: err.errors
            });
        });
    } else {
        res.json({
            success: false,
            BodyPropertiesWithoutValue: nullList,
            RequiredPropertiesNum: 12,
            TotalRecievedPropertiesNum: counter
        });
    }
});

router.get('/:id/ShoppingCart',function(req, res){
    let token = req.body.token || req.get("token");
    if(token){
        jwt.verifyToken(token, function(msg){
           if(msg.success){
               let id = jwt.decode(token).Id;
               shoppingCart.findOne({
                   where: {"UserId": id},
                   include: [{
                       model: shoppingCartItem,
                       include: [{
                           model: product,
                           include: [
                               {model: User, as: 'Seller', attributes: ['Username', 'EmailAddress']},
                               {model: Category, attributes: ['ProductCategory']}
                           ]
                       }],
                       attributes: ['Quantity', 'TotalPrice']
                   }],
                   attributes: ['CreatedTime']
               }).then(function(shoppingCart){
                   if(!shoppingCart){
                       res.json({success: false, error: "Current user does not have a shoppingCart"});
                   }else{
                       res.json({success: true, shoppingCartItems: shoppingCart});
                   }
               });
           }else{
               res.json(msg);
           }
        });
    }else{
        res.json({success: false, error: "no token found in the request"});
    }
});

router.post('/:id/ShoppingCart', function(req, res){
    let token = req.body.token || req.get("token");
    if(token){
        jwt.verifyToken(token, function(msg){
            if(msg.success){
                let id = jwt.decode(token).Id;
                let currentdate = new Date();
                let datetime = currentdate.getMonth()+1 + "/"
                    + (currentdate.getDate())  + "/"
                    + currentdate.getFullYear() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
                shoppingCart.create({
                    "CreatedTime": datetime,
                    "UserId": id
                }).then(function(){
                    res.json({success: true});
                }, function(err){
                    res.json({success: false, error: err});
                });
            }else{
                res.json(msg);
            }
        });
    }else{
        res.json({success: false, error: "no token found in the request"});
    }
});

router.put('/:id/ShoppingCart', (req, res) => {
    let token = req.body.token || req.get('token');
    let shoppingCartItems = req.body.ShoppingCartItems;
    jwt.verifyToken(token, (msg) => {
        if(msg.success) {
            const id = jwt.decode(token).Id;
            shoppingCart.findOne({
                where: { 'UserId': id }
            })
                .then(shoppingCart => {
                    const shoppingCartId = shoppingCart.Id;
                    shoppingCartItem.destroy({
                        where: { 'ShoppingCartId': shoppingCartId }
                    }).then(result => {
                        for (let index in shoppingCartItems) {
                            shoppingCartItem.create({
                                'Quantity': shoppingCartItems[index].Quantity,
                                'ShoppingCartId': shoppingCartId,
                                'Productsid': shoppingCartItems[index].product.Id
                            }).then(() => {
                                console.log(123);
                                if (index == shoppingCartItems.length - 1) {
                                    console.log(321);
                                    res.json({ success: true });
                                }
                            }, err => {
                                throw err;
                            });
                        }
                    });
                }, err => {
                    throw err;
                });
        }
    });
});

router.get('/:id/orders', function(req, res){
    let token = req.body.token || req.get("token");
    if(token){
        jwt.verifyToken(token, function(msg){
            if(msg.success){
                let id = jwt.decode(token).Id;

            }else{
                res.json(msg);
            }
        });
    }else{
        res.json({success: false, error: "no token found in the request"});
    }
});

module.exports = router;