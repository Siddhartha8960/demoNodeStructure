const usrRoutr = require("express").Router();
const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const jwtHandler = require("../../../jwtHandler");
const usrFacade = require("./userFacade");
const validators = require("./userValidators");
const mediaUpload   = require("../../../mediaUpload/mediaUploadMiddleware");

usrRoutr.route("/signup")
    .post([validators.validateSignup], function (req, res) {
        
    });
    
usrRoutr.route("/login")
    .post([validators.validateLogin], function (req, res) {
        
    });
    
usrRoutr.route("/social-login")
    .post([validators.validateSocial], function (req, res) {
        let { deviceToken, deviceID, deviceTypeID,currentVersion,socialType,socialId,name,username,email,dob,gender,profileImage } = req.body;

        usrFacade.socialLogin({
            deviceToken, deviceID, deviceTypeID,currentVersion,socialType,socialId,name,username,email,dob,gender,profileImage
        }).then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        }).catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });
    
usrRoutr.route("/guest-login")
    .post([middleware.multer.single('profileImage'),validators.validateGuest,mediaUpload.uploadSingleMediaToS3()], function (req, res) {
        let { deviceToken, deviceID, deviceTypeID,currentVersion,name,username,location } = req.body;
        var profileImage;
        if(req.file){
             profileImage=req.file.filename;
        }
        usrFacade.guestLogin({
            deviceToken, deviceID, deviceTypeID,currentVersion,name,username,profileImage
        }).then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        }).catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });


usrRoutr.route('/updateProfile')
    .post([middleware.authenticate.autntctTkn],function (req,res){
        let { name,username } = req.body;
        console.log("ROUUTE",req.body);
        let { user } = req;
        usrFacade.updateProfile({
           name,username,user
        }).then(function (result){
            resHndlr.sendSuccess(res, result, req);
        }).catch(function (err){
            resHndlr.sendError(res,err,req)
        })
});


usrRoutr.route('/getProfile')
    .get([middleware.authenticate.autntctTkn],function (req,res){
        let { user } = req;
        usrFacade.getProfile({user})
        .then(function (result){
            resHndlr.sendSuccess(res, result, req);
        }).catch(function (err){
            resHndlr.sendError(res, err, req)
        })
});




module.exports = usrRoutr;
