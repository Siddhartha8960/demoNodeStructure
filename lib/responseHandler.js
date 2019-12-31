var constant = require('./constant'),
    customException = require('./customException'),
    logger = require('./logger').logger,
    APIResponse = require('./model/APIResponse');

function _sendResponse(response, result) {
    let totalCount;
    if(!result.error){
    if(Array.isArray(result.responseData) == true ){
        totalCount = result.responseData.length
    }
    else if(Array.isArray(result.responseData.result) == true){
        totalCount = result.responseData.result.length
    }
    // console.log("????",Array.isArray(result.responseData.result))
    // send status code 200
    let formatedResult={
        statusCode:result.statusCode,
        totalCount:totalCount,
        responseData:{
            message:result.responseData.message?result.responseData.message:'Got response',
            result:result.responseData.result?result.responseData.result:result.responseData
        },
        requestParams:result.requestParams,
        time:result.time   
    }
    return response.send(formatedResult);
}else{
    return response.send(result);
}
}

function sendError(response, error,request) {
    // if error doesn't has sc than it is an unhandled error,
    // log error, and throw intrnl server error
    if (!error.errorCode) {
        logger.error(error, "Unhandled error.");
        error = customException.intrnlSrvrErr(error);
    }
    var result = new APIResponse(constant.STATUS_CODE.ERROR, error,request);
    _sendResponse(response,result);
}

function handleError(error, request, response, next) {
    // unhandled error
    sendError(response, error,request);
}

function sendSuccess(response, result,request) {
    var result = new APIResponse(constant.STATUS_CODE.SUCCESS, result,request);
    _sendResponse(response, result);
}

// ========================== Export Module Start ==========================
module.exports = {
    sendError,
    handleError,
    sendSuccess,
}
// ========================== Export Module End ============================