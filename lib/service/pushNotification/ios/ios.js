// var apn = require('apn');
var FCM = require('fcm-node');
var Promise = require('bluebird');
var config = require('../../config');

var fcmServerKey = config.cfg.fcmServerKey; //put your server key here
var fcm = new FCM(fcmServerKey);

/*options = {
	key: config.cfg.pemFile,
	cert: config.cfg.pemFile,
	// passphrase: '',
	gateway: "gateway.push.apple.com",
	production: false,
	enhanced: true,
	cacheLength: 5,
	debug: true
}*/

function pushNotification(deviceId, data){
	data.data.timestamp = Date.now();
	data.notification.sound = 'default';
	var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
		to: deviceId,
		data: data.data,
		notification: data.notification
	};

	return new Promise(function(resolve, reject){
		fcm.send(message, function(error, response){
			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	});
}

/*function iosNotification(deviceToken, message){
	var notification = new apn.Notification();
	notification.payload = {'description': message};
	notification.badge = 1;
	notification.sound = "dong.aiff";
	notification.alert = message.message;

	return new Promise(function(resolve, reject){
		apnProvider.send(notification, deviceToken).then((result) => {
			resolve(result);
		});
	});
}*/

// ========================== Export Module Start ==========================
module.exports = {
	pushNotification,
	// iosNotification
}
// ========================== Export Module End ============================