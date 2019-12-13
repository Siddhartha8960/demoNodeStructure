const Promise = require('bluebird-extra'),
	path = require('path'),
	fs = require('fs'),
	_ = require('lodash'),
	TAG = 'wiseoak-upload',
	unlink = Promise.promisify(fs.unlink, fs),
	logger = require('../logger/index').logger,
	AWS = require('aws-sdk'),
	configuration = require('../config/index');

const customException  = require('../customException');



var s3 = new AWS.S3({accessKeyId:configuration.cfg.iamUser.keyId, secretAccessKey:configuration.cfg.iamUser.accessKey});



function uploadToS3(bucket, key, filePath, fieldName){
	return new Promise(function(resolve, reject){
		var params = {Bucket:bucket, Key:key, Body:fs.createReadStream(filePath), ACL:configuration.cfg.s3.ACL};
		s3.upload(params, function(error, data){
			if(data){
				return resolve({field:fieldName, location:data.Location});
			}
			else{
				return reject(error);
			}
		});
	});
}


// ========================== Export Module Start ==========================
module.exports = {
	uploadToS3
}
// ========================== Export Module End ============================