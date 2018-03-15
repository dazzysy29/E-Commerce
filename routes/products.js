/**
 * Created by dazzysy on 5/31/2017.
 */
let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let category = require('../models/category');
let user = require('../models/user');

let association = require('../models/association/associations');

association();

router.get('/', function(req, res){
    Product.findAll({
        include : [{
            model: category,
            attributes: ['ProductCategory']
        },{
            model: user,
            as: 'Seller',
            attributes: [
                'Username',
                'EmailAddress'
            ]
        }]

    }).then(function(result){
        setTimeout( function(){
            res.json(result);
        }, 0 );
    }, function(err){
        console.log(err);
    });
});

router.get('/order/:type', function(req, res){
    const type = req.params.type;
    let order = [];
    if(type == "newest"){
        order = ['PublishDate', 'DESC'];
    }else if(type == "mostRated"){
        order = ['Rate', 'DESC'];
    }
    Product.findAll({
        include : [{
            model: category,
            attributes: ['ProductCategory']
        },{
            model: user,
            as: 'Seller',
            attributes: [
                'Username',
                'EmailAddress'
            ]
        }],
        order: [
            order
        ]
    }).then(function(result){
        setTimeout( function(){
            res.json(result);
        }, 0 );
    }, function(err){
        console.log(err);
        res.status(500).send({ error: 'Something wrong in get products in order.'});
    });
});

router.get('/:productId', function(req, res){
   Product.findOne({
       where: {Id: req.params.productId},
       include : [{
           model: category,
           attributes: ['ProductCategory']
       },{
           model: user,
           as: 'Seller',
           attributes: [
               'Username',
               'EmailAddress'
           ]
       }]
   }).then(function(result){
       if(result){
           res.json(result);
       }else res.status(500).send({error: "cannot found the product"});
   }, function(){
       res.status(500).send({ error: 'Something wrong in get products by Id.'});
   });
});

module.exports = router;