/**
 * Created by dazzysy on 6/6/2017.
 */
let jwt = require('jsonwebtoken');
let Token = require('./token');

process.env.SECRET_KEY = "hellohello";

module.exports.issuingToken = function(user){
    let token = jwt.sign(user, process.env.SECRET_KEY, {
        /* set the token expires in 5 hours*/
        expiresIn: 5*60*60
    });
    return token;
};

module.exports.verifyToken = function(token, callback){
    jwt.verify(token, process.env.SECRET_KEY, function(err){
        if(err){
            callback({success: false ,error: "Bad token"});
        }else{
          Token.findOne({ where: {Token: token}}).then(function(result){
              if(result){
                  callback({success: false, error: "Token in the blacklist (already logged out)"});
              }else {
                  callback({success: true});
              }
          });
        }
    });
};

module.exports.decode = function(token){
    return jwt.decode(token);
};