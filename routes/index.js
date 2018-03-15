/**
 * Created by dazzysy on 5/17/2017.
 */
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;