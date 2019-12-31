//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../../../appUtils");
var userConst = require("./userConstants");
var exceptions = require("../../../customException");

//========================== Load Modules End =============================



//========================== Export Module Start ===========================

var validateSocial = function (req, res, next) {

    var { deviceToken, deviceID, deviceTypeID, socialType, socialId,currentVersion,email,username } = req.body;

    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(deviceToken)) {
        errors.push({ fieldName: "deviceToken", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceToken") });
    }
    if (_.isEmpty(deviceID)) {
        errors.push({ fieldName: "deviceID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceID") });
    }
    if (_.isEmpty(deviceTypeID)) {
        errors.push({ fieldName: "deviceTypeID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceTypeID") });
    }
    if (_.isEmpty(socialType)) {
        errors.push({ fieldName: "socialType", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "socialType") });
    }
    if (_.isEmpty(socialId)) {
        errors.push({ fieldName: "socialId", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "socialId") });
    }
    if (_.isEmpty(username)) {
        errors.push({ fieldName: "username", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "username") });
    }
    if (!_.isEmpty(email)&&!appUtils.isValidEmail(email)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.invalidEmail });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}

var validateGuest = function (req, res, next) {
    console.log('IN VALIDATOR>>',req.body);
    
    var { deviceToken, deviceID, deviceTypeID ,currentVersion } = req.body;
    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(deviceToken)) {
        errors.push({ fieldName: "deviceToken", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceToken") });
    }
    if (_.isEmpty(deviceID)) {
        errors.push({ fieldName: "deviceID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceID") });
    }
    if (_.isEmpty(deviceTypeID)) {
        errors.push({ fieldName: "deviceTypeID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceTypeID") });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}


var validateSignup = function (req, res, next) {

    var { deviceToken, deviceID, deviceTypeID,email,password,currentVersion } = req.body;

    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(deviceToken)) {
        errors.push({ fieldName: "deviceToken", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceToken") });
    }
    if (_.isEmpty(deviceID)) {
        errors.push({ fieldName: "deviceID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceID") });
    }
    if (_.isEmpty(deviceTypeID)) {
        errors.push({ fieldName: "deviceTypeID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceTypeID") });
    }
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "Email id") });
    }else if(appUtils.isValidEmail(email)){
        errors.push({ fieldName: "email", message: userConst.MESSAGES.invalidEmail });
    }
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "Password") });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
}

var validateLogin = function (req, res, next) {

    var { deviceToken, deviceID, deviceTypeID,email,password,currentVersion } = req.body;
    var { } = req.headers;
    var errors = [];

    if (_.isEmpty(deviceToken)) {
        errors.push({ fieldName: "deviceToken", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceToken") });
    }
    if (_.isEmpty(deviceID)) {
        errors.push({ fieldName: "deviceID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceID") });
    }
    if (_.isEmpty(deviceTypeID)) {
        errors.push({ fieldName: "deviceTypeID", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "deviceTypeID") });
    }
    email = req.body.email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "Email id") });
    }else if(appUtils.isValidEmail(email)){
        errors.push({ fieldName: "email", message: userConst.MESSAGES.invalidEmail });
    }

    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: userConst.MESSAGES.keyCantEmpty.replace("{{key}}", "Password") });
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(userConst.MESSAGES.validationError, errors))
    }
    next();
}

module.exports = {
    validateSocial,
    validateGuest,
    validateSignup,
    validateLogin
};
//========================== Export module end ==================================
