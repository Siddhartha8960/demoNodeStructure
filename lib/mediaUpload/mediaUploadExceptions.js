// Load exceptions
var Exception = require("../model/Exception");
var bannerConstants = require("../constants");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
	intrnlSrvrErr: function (err) {
		return new Exception(1, bannerConstants.MESSAGES.intrnlSrvrErr, err);
	},
	unauthorizeAccess: function (err) {
		return new Exception(2, bannerConstants.MESSAGES.unAuthAccess, err)
	},
	tokenGenException: function (err) {
		return new Exception(3, bannerConstants.MESSAGES.tokenGenError, err)
	},
	getServiceNotConfiguredProperlyException ( service ) {
		return new Exception( 'ERR039' , service + " Service is not configured Properly." );
	},
	getErrorUploadingMediaException (  err ) {
		return new Exception( 'ERR040' , " Error Uploading Media." , err );
	}

};

//========================== Export Module   End ===========================
