const ios = require('./ios/ios'),
	android = require('./android/android'),
	constant = require('../constant');

function sendNotification(registrationIds, data){
	let promiseResult = [];

	for(var i=0; i<registrationIds.length; i++){
		if(registrationIds[i].platform == constant.DEVICE_TYPE.ANDROID){
			promiseResult.push(android.pushNotification(registrationIds[i].deviceToken, data));
		}
		if(registrationIds[i].platform == constant.DEVICE_TYPE.IOS){
			promiseResult.push(ios.pushNotification(registrationIds[i].deviceToken, data));
		}
	}
	return Promise.all(promiseResult);
}

// ========================== Export Module Start ==========================
module.exports = {
	sendNotification
}
// ========================== Export Module End ============================