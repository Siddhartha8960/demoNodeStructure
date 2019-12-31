const adminRoute        = require('./admin/adminRoute'),
      userRoute         = require('./user/userRoute'),
      groupRoute        = require('./group/groupRoute'),
      cronjobRoute      = require('./cronjob/cronRoute'),      
      responseHandler   = require('../../responseHandler');
      basicAuth         = require('../../middleware/basicAuth');
      
//========================== Export Module Start ==========================

module.exports = function(app){
    // Attach User Routes
    app.use('/demo/api/v2/cronjob', cronjobRoute);
    app.use(basicAuth.basicAuthentication);
    app.use('/demo/api/v2/admin', adminRoute);
    app.use('/demo/api/v2/user', userRoute);
    app.use('/demo/api/v2/group', groupRoute);

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.handleError);
}
//========================== Export Module End ============================