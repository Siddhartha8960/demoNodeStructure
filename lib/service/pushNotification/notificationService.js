const notificationManager = require('./notificationManager'),
	Promise = require('bluebird');

function sendNotification(params){
	/*notificationManager.sendNotification(params.deviceIds, params.data);
	return Promise.resolve(params);*/
	return Promise.resolve(notificationManager.sendNotification(params.deviceIds, params.data));
}

// ========================== Export Module Start ==========================
module.exports = {
	sendNotification
}
// ========================== Export Module End ============================