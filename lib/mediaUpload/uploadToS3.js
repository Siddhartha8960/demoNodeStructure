const Promise = require('bluebird'),
	AWS = require('aws-sdk'),
	fs = require('fs'),
	path = require('path');
	config = require('../config/index'),

AWS.config = {
	accessKeyId: config.cfg.iamUser.keyId,
	secretAccessKey: config.cfg.iamUser.accessKey,
	bucketName: config.cfg.s3.bucketName,
	region: config.cfg.s3.region,
	signatureVersion: config.cfg.s3.signatureVersion
};

var Bucket = config.cfg.s3.bucketName;
var photoBucket = new AWS.S3({params: {Bucket: Bucket}});

function _deleteTempFile(filePath){
	fs.stat(filePath, function(error, stats){
		// console.log(stats);//here we got all information of file in stats variable
		if(error){
			console.error(error);
		}

		fs.unlink(filePath, function(error){
			if(error){
				console.log(error);
			}
			// console.log("file deleted successfully");
		});
	});
}

function _uploadToS3(file, buffer){
	return new Promise(function(resolve, reject){
		photoBucket.upload({
			Key: file.filename,
			ContentType: file.mimetype,
			Body: buffer,
			ACL: 'public-read'
		}, function(error, data){
			if(error){
				console.log("Upload failed: ", error);
				reject(error);
			}
			else{
				resolve(data);
			}
		});
	});
}

/*function uploadFile(file){
	let buffer = fs.createReadStream(file.path);
	return _uploadToS3(file, buffer).then(function(data){
		_deleteTempFile(file.path);
		return data;
	});
}*/


function sendPDFToMail(filePath){
	return new Promise(function(resolve, reject){
		var fileSection = filePath.split('\\');

		var file = {
			originalname: fileSection[fileSection.length - 1],
			path: filePath,
			fieldname: 'file',
			mimetype: 'application/pdf',
			filename: fileSection[fileSection.length - 1]
		}

		let buffer = fs.createReadStream(file.path);
		_uploadToS3(file, buffer).then(function(data){
			_deleteTempFile(file.path);
			return resolve(data);
		});
	});
}

// ========================== Export Module Start ==========================
module.exports = {
	// uploadFile,
	sendPDFToMail
}
// ========================== Export Module End ============================