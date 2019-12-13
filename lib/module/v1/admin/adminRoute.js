var _ = require("lodash");
var express = require('express');
var app = express();
const adminRouter = require("express").Router();

const resHndlr      = require('../../../responseHandler');
const middleware    = require("../../../middleware");
const adminFacade   = require("./adminFacade");
const constants     = require("../../../constant");
const jwtHandler    = require("../../../jwtHandler");
const adminValidator = require('./adminValidator');

adminRouter.route("/create")
    .post([adminValidator.validateAdminLogin], function (req, res) {
        let {name, email, password } = req.body;
        adminFacade.addUser({name, email, password })
            .then(function (result) {
                resHndlr.sendSuccess(res, result,req);
            })
            .catch(function (err) {
                resHndlr.sendError(res, err,req);
            })
    });

adminRouter.route("/login")
    .post([adminValidator.validateAdminLogin], function (req, res) {
        let {name, email, password } = req.body;
        adminFacade.adminLogin({name, email, password })
            .then(function (result) {
                resHndlr.sendSuccess(res, result,req);
            })
            .catch(function (err) {
                resHndlr.sendError(res, err,req);
            })
    });

adminRouter.route("/forgetPassword")
    .post([adminValidator.validateEmail],function(req,res){
    let { email } = req.body;
    adminFacade.forgetPassword({email})
        .then(function(result){
            resHndlr.sendSuccess(res,result,req);
        })
        .catch(function(err){
            resHndlr.sendError(res,err,req);
        })

});


module.exports = adminRouter