const _ = require("lodash");
var baseConstants = require('../constants');
const expressConfig = require("../config/expressConfig");
const path = require("path");
var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'dev';

//ENV Config
switch (process.env.NODE_ENV) {
	case 'dev' :
	case 'development' :
		envConfig = require('../config/env/development');
		break;
	case 'prod' :
	case 'production' :
		envConfig = require('../config/env/production');
		break;
}

var defaultConfig = {

	iamUser: {
		accessKey: 'O0OD6vwqVSy/czlPHl3WjUcH7Fnng3V7IXrkyDZW',
		keyId: 'AKIAJWRJBAJOUCDOBMPQ',
	},

	cloudFront: {
		publicDomain: "d3fqifl7ma1i47.cloudfront.net",
		domain: 'd3kkgb7o9ki7ct.cloudfront.net',
		keyPair: "APKAIRJTDAMTY6H5LCHA",
		privateKeyPath: path.resolve(__dirname, '../../resources/private.pem')
	},

	s3: {
		maxAsyncS3: 20,     // this is the default
		s3RetryCount: 3,    // this is the default
		s3RetryDelay: 1000, // this is the default
		multipartUploadThreshold: 20971520, // this is the default (20 MB)
		multipartUploadSize: 15728640, // this is the default (15 MB)
		bucketName: "shineapp/banners",
		publicBucketName: "shineapp",
		ACL: 'public-read'
	}

}

const MESSAGES = {
	tergetTypeEmpty: "Target Type should not be empty",
	tergetIdEmpty: "Target Id should not be empty",
	BANNERPIC_CANT_EMPTY: "Banner image is empty",
}

//Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);
var EXT_MESSAGES = _.extend(MESSAGES, baseConstants.MESSAGES);


module.exports = Object.freeze({
	MESSAGES: EXT_MESSAGES,
});

module.exports = {
	cfg
};