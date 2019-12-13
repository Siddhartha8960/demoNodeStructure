/**
 * This file will have admin request and response object mappings.
 */

"use strict";

function getOrgTypeResponseMapper(orgInfo) {
    let orgTypes = [];
    orgInfo.forEach(function (match) {
        orgTypes.push({
            orgId : match._id,
            orgName : match.name,
            orgType : match.type,
        });
    });
    var getOrgTypeResp = {
        message: 'Organization type fetched Successfully.',
        orgTypes: orgTypes,
    };
    return getOrgTypeResp;
}

function loginMapping(admin, jwt) {
    var respObj = {
        "message": "Successfully Login",
        "accessToken": jwt,
        "adminProfile": {
            "_id": admin._id,
            "name": admin.name,       
            "email": admin.adminEmail,
            "isVerifiedUser": admin.isVerified, 
        }
    }
    return respObj;
}

function verifyEmailForAdmin(admin){
    var respObj={
        "message":"Successfully verified",
        "adminProfile":{
            "email":admin.adminEmail,
            "isVerifiedUser":admin.isVerified,
        }
    }
    return respObj;
}

module.exports = {
    getOrgTypeResponseMapper,
    loginMapping
}

