/**
 * Created by dazzysy on 6/28/2017.
 */
let express = require('express');
let router = express.Router();
let category = require('../models/category');
let product = require('../models/product');

let association = require('../models/association/associations');

association();

router.get('/', function(req, res){
    category.findAll({
        include: [{
            model: product
        }]
    }).then((result)=>{
        res.json(result);
    });
});

module.exports = router;