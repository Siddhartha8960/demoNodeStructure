//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("../../../model/Exception");
var adminConstants = require("./adminConstants");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
    intrnlSrvrErr: function (err) {
        return new Exception(1, adminConstants.MESSAGES.intrnlSrvrErr, err);
    },
    unauthorizeAccess: function (err) {
        return new Exception(2, adminConstants.MESSAGES.unAuthAccess, err)
    },
    tokenGenException: function (err) {
        return new Exception(3, adminConstants.MESSAGES.tokenGenError, err)
    },
    getCustomErrorException: function (errMsg, error) {
        return new Exception(5, errMsg, error);
    },

    invalidAdminException: function (err) {
        return new Exception(6, adminConstants.MESSAGES.invalidAdmin, err);
    },

    invalidUsernameException: function (err) {
        return new Exception(7, adminConstants.MESSAGES.INVALID_USERNAME, err);
    },

    invalidPageUsernameException: function (err) {
        return new Exception(7, adminConstants.MESSAGES.INVALID_PAGE_USERNAME, err);
    },
};

//========================== Export Module   End ===========================
