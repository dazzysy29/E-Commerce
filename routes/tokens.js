/**
 * Created by dazzysy on 7/6/2017.
 */
let express = require('express');
let router = express.Router();

let user = require('../models/user');
let jwt = require('../models/JWT');
let Token = require('../models/token');

router.get('/Validation', (req, res) =>{
    const token = req.get('token');
    jwt.verifyToken(token, (result) => {
        if(result.success === true) {
            const userId = jwt.decode(token).Id;
            user.findOne({
                where: { 'Id': userId },
                attributes: [
                    'Username',
                    'Avatar'
                ]
            }).then((user) => {
                res.json({
                    success: true,
                    userAvatar: user.Avatar,
                    userName: user.Username
                });
            }, (error) => {
                res.json({
                    success: false,
                    error: error
                });
            });
        }else{
            res.json(result);
        }
    });
});

router.post('/signOut', (req, res) => {
    const token = req.body.token;
    Token.create({
        'Token': token
    }).then(() => {
        res.json({success: true});
    }, (error) => console.log(error));
});
module.exports = router;