"use strict";
//========================== Load Modules Start ===========================
var Promise = require("bluebird");
//========================== Load internal Module =========================
var exceptions = require("../customException.js");
var jwtHandler = require("../jwtHandler");
var constants = require("../constant");

const adminService  = require("../module/v1/admin/adminService");
const userService   = require("../module/v1/user/userService");

//========================== Load Modules End =============================

var __verifyTok = function (acsTokn) {
    return jwtHandler.verifyToken(acsTokn)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw err
        })
};

var expireToken = function(req, res, next) {
    return jwtHandler.expireToken(req)
        .then(function(result) {
            //return result;
            next();
        })
        .catch(function (err) {
                next(err)
        })
}

var autntctTkn = function (req, res, next) {

    var acsToken = req.get('accessToken');
        __verifyTok(acsToken)
        .bind({})
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .then(function (paylod) {
            this.payload = paylod;
        })
        .then(function (result) {
            req.user = this.payload;
            next()
        })
        .catch(function (err) {
            next(err)
        })
}

var verifyClientSecreate = function (req, res, next) {
 //  req.body=JSON.parse(req.body);
     var clientSecret = req.body.clientSecret
    
       console.log("jsonData...",clientSecret)
            if (clientSecret != "Mi6lhaR10HyWOxjMqITx3ONWHFkTcHuebIZPYNi1") {
                throw exceptions.invalidClientSecreate();
            }
       next()
       
    
};


var authSocketTkn = function (socket, next) {

   var accessToken=socket.handshake.query.accessToken;
    next();
        __verifyTok(accessToken)
        .bind({})
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .then(function (paylod) {
            this.payload = paylod;
            socket.payload=paylod;
            if(paylod.isAdmin==0){
                return userService.getByKey({_id:paylod.userId});
            }else{
                return adminService.findByKey({_id:paylod.userId});
            }
        })
        .then(function (user) {
            socket.user = user;
            next()
        })
        .catch(function (err) {
            next(new Error('Authentication error'));
        })
}

//========================== Export Module Start ===========================

module.exports = {
    autntctTkn,
    expireToken,
    verifyClientSecreate,
    authSocketTkn
};

//========================== Export Module End ===========================
