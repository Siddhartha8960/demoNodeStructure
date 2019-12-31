var Promise = require('bluebird'),
        jwt = Promise.promisifyAll(require('jsonwebtoken')),
        customException = require('./customException'),
        config = require('./config'),
        redisClient = require('./redisClient/init');

var generateAdminToken = function (adminObject) {
    var options = {expiresIn: config.cfg.tokenExpirationTime};
    return jwt.signAsync(adminObject, config.cfg.jwtSecretKey, options).then(function (jwtToken) {
        return jwtToken;
    }).catch(function (error) {
        throw new customException.tokenGenException(error);
    });
}

var generateUserToken = function (userObject) {
    let expireTime;
    if (userObject.tokenExpirationTime)
        expireTime = userObject.tokenExpirationTime;
    else
        expireTime = 6 * 30 * config.cfg.tokenExpirationTime; //6 months
    delete userObject.tokenExpirationTime;
    return jwt.signAsync(userObject, config.cfg.jwtSecretKey, {expiresIn: expireTime}).then(function (jwtToken) {
        return jwtToken;
    }).catch(function (error) {
        throw new customException.tokenGenerateException(error);
    });
}

var verifyToken = function (accessToken) {
    return jwt.verifyAsync(accessToken, config.cfg.jwtSecretKey)
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return redisClient.getValue(accessToken);
        })
        .then(function (reply) {
            if (reply)
                return this.tokenPayload;
        })
        .catch(function (error) {
            throw new customException.unauthorizeAccess();
        });
}

var verifyUsrForgotPassToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, config.cfg.jwtSecretKey).then(function (tokenPayload) {
        return tokenPayload;
    }).catch(function (err) {
        throw new customException.unauthorizeAccess(err);
    });
}

var expireToken = function (reqest) {
    var accessToken = reqest.get('accessToken');
    if (accessToken) {
        //blacklist token in redis db
        //it will be removed after 6 months
        redisClient.setValue(accessToken, true);
        redisClient.expire(accessToken, 6 * 30 * config.cfg.tokenExpirationTime);
    }
}

// ========================== Export Module Start ==========================
module.exports = {
    generateAdminToken: generateAdminToken,
    generateUserToken: generateUserToken,
    verifyToken: verifyToken,
    expireToken: expireToken,
    verifyUsrForgotPassToken
}
// ========================== Export Module End ============================