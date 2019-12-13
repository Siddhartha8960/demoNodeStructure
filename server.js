console.log("");
console.log("//************************* Nodejs App 1.0.0 **************************//");
console.log("");

// const openApiDocumentation = require('./openApiDocumentation');
//.env file read
require('dotenv').config();

//socket
//require('./lib/socketChat');

// Import Config
const config = require('./lib/config');

// Import mongodb cronjob
//require('./lib/mongodbJobScheduler');

// Import logger
var logger = require('./lib/logger').logger;

config.dbConfig(config.cfg, (error) => {
    if (error) {
        logger.error(error, 'Exiting the app.');
        return;
    }

    // load external modules
    const express = require('express');
    var responseTime = require('response-time');
    
    // init express app
    const app = express();
    
    app.use(responseTime());
    
    // set the view engine to ejs
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // set server home directory
    app.locals.rootDir = __dirname;

    // config express
    config.expressConfig(app, config.cfg.environment);
    console.log('env : ',config.cfg.environment);

    // attach the routes to the app
    // require('./lib/module/v1/route')(app);
    require('./lib/route/index')(app);

   
    // start server
    app.listen(config.cfg.port, () => {
        logger.info(`Express server listening on ${config.cfg.ip}:${config.cfg.port}, in ${config.cfg.TAG} mode`);
    });
});