"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var Promise = require("bluebird");


//========================== Load internal modules ====================
// Load post service
const jwtHandler    = require('../../../jwtHandler');
const redisClient   = require("../../../redisClient/init");
const appUtils      = require("../../../appUtils");
const config        = require("../../../config");

const adminService  = require("./adminService");
const adminException = require("./adminExceptions");
const adminConstants = require("./adminConstants");
const adminMapper   = require("./adminMapper");
const customExceptions    = require("../../../customException");

//========================== Load Modules End ==============================================


function _createAdmin(adminInfo) {
    return adminService.createAdmin(adminInfo)
        .bind({})
        .then(function (admin) {
            this.user = admin;
            user.isAdmin=1;
            var tokenObj = buildUserTokenGenObj(admin);
            return jwtHandler.genAdminToken(tokenObj)
                .then(function (jwt) {
                    var redisObj = appUtils.createRedisValueObject({ user: this.user });
                    redisClient.setValue(jwt, JSON.stringify(redisObj));
                    return adminMapper.verifyRespMappingForAdmin(admin, jwt);
                })
                .then(function (respObj) {
                    return respObj;
                })
        })
        .catch(function (err) {
            throw err
        })
}

function addUser(adminInfo) {
    return adminService.isEmailExist(adminInfo)
        .then(function (result) {
            if (!result) {
                return _createAdmin(adminInfo);
            }
            else {
                return { message: adminConstants.MESSAGES.invalidAdmin };
            }
        })
}

/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */
function login(params) {
    return adminService.isEmailExist(params)
        .bind({})
        .then(function (isExist) {
            this.isExist = isExist;

            if (isExist) {
                return adminService.login(params);
            } else {
                throw customExceptions.userNotFound();
            }
        })
        .then(function (response) {
            if (this.isExist) {
                if (response) {
                    if(response.status==1) {
                        this.user = response;
                        user.isAdmin=1;
                        var tokenObj = buildUserTokenGenObj(response);
                        return jwtHandler.genAdminToken(tokenObj)
                    } else {
                        throw customExceptions.inactiveAccount();
                    }
                } else {
                    throw customExceptions.incorrectPass();
                }
            }
        })
        .then(function (response) {
            if (this.isExist) {
                this.jwt = response;
                let redisObj = appUtils.createRedisValueObject({ user: this.user });
                redisClient.setValue(response, JSON.stringify(redisObj));

                return adminMapper.loginMapping({
                    user: this.user,
                    jwt: this.jwt
                });
            }
        })

}
function forgetPassword(adminInfo) {
    return adminService.isEmailExist(adminInfo)
        .then(function (result) {
            if (result == true) {
                return adminService.sendOtp(adminInfo)
                        .bind({})
                        .then(function(adminInfo){
                            return adminMapper.verifyEmailForAdmin(adminInfo)
                        })
                        .then(function (respObj) {
                            return respObj;
                        })
                        .catch(function (err) {
                            throw err
                        })
            }
            else {
                return { message: adminConstants.MESSAGES.invalidAdmin };
            }
        })
}

function getUsers(params) {
    return adminService.getUsers(params)
}

function blockUser(params) {
    return adminService.blockUser(params)
}

function buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = (user.deviceToken)?user.deviceToken:'';
    userObj.deviceTypeID = (user.deviceTypeID)?user.deviceTypeID:'';
    userObj.deviceID = (user.deviceID)?user.deviceID:'';
    userObj.userId = user._id;
    return userObj;
}


//========================== Export Module Start ==============================

module.exports = {
    addUser,
    getUsers,
    blockUser,
    forgetPassword
};

//========================== Export Module End ===============================
