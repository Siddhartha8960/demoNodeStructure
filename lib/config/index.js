const _ = require('lodash'),
	dbConfig = require('./dbConfig'),
	expressConfig = require('./expressConfig'),
	path = require('path');

var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'dev';

// ENV Config
switch(environment){
        case 'local':
	case 'localhost':
		envConfig = require('./env/localhost');
		break;
        case 'remote':
	case 'remoteserver':
		envConfig = require('./env/remoteserver');
		break;        
	case 'dev':
	case 'development':
		envConfig = require('./env/development');
		break;
	case 'prod':
	case 'production':
		envConfig = require('./env/production');
		break;
	case 'stag':
	case 'staging':
		envConfig = require('./env/staging');
		break;
}

var defaultConfig = {
	environment: 'development',
	ip: 'localhost',
	port: 5001,
	protocol : 'http',
	TAG: 'localhost',
	uploadDir: path.resolve('./uploads'),
	tokenExpirationTime: 24 * 60 * 60 * 1000, // 1 day
	oneDayTimestamp: 24 * 60 * 60 * 1000, // 1 day
	fiveMinuteTimestamp: 5 * 60 * 1000, // 5 min
	signUpTokenExpirationTime: '10m', // 10 day
	jwtSecretKey: 'g8b9(-=~Sdf)',
	saltRounds: 10,
	sendgridKey: '',
	//default admin
	adminEmail: 'admin@yopmail.com',
	adminPassword: '123456',
        adminName:'Admin',
	stripe: {
            publishableKey: '',
            secretKey: '',
            appleMerchendId: '',
            country:{
                name:'Australia',
                code:'AU',
                currency: {
                    symbol: '$',
                    abbreviationOf: 'British Pound',
                    abbreviation: 'AUD',
                    isoCode: 'aud'
                }
            },
            connectAccountType:'custom',
            accountType: 'individual',
            charge: {
                    lessonDescription: 'For lesson completion.'
            },
            bankAccountType:{
                    bankAccount: 'bank_account',
                    card: 'card'
            }
	},
	googleAPIKey: "",
	mongo: {
            dbName: 'demo',
            dbUrl: 'mongodb://localhost:27017/',
            options: {
                user: 'demo',
		pass: 'demo',
                useNewUrlParser: true
            },
            dbAuthUrl:'mongodb://demo:demo@localhost:27017/demo'
	},
	pemFile: '',
	fcmServerKey: '',
	fcmServerKey: '',
        
	redis: {
            server: 'localhost',
            port: 6379,
            namespace:"demo",
            appname:"demo"
	},
        
        basicAuth:{
            name:'demo_admin',
            pass:'admin@demo'        
        },
        
        smtp:{
            fromEmail:"support@demo.com",
            host:"Gmail",
            auth: {
                user: "",
                pass: ""
            }
        },
	
	twilio: {
            ACCOUNT_SID: '', //nayif credentials
            AUTH_TOKEN: '',
            TWILIO_NUMBER: ''
	},
        
        //aws s3
	iamUser: {
            accessKey: '',
            keyId: ''
	},

	// option parameters constantys for s3
	s3: {
            maxAsyncS3: 0, // this is the default
            s3RetryCount: 0, // this is the default
            s3RetryDelay: 0, // this is the default
            multipartUploadThreshold: 20975465, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            bucketName: '',
            publicBucketName: '',
            signatureVersion: 'v2',
            region: 'us-west-2',
            ACL: 'public-read',
            base_url:''
	},
	swagger_port: 80,
        
        socket:{
            port:4000
        },

	//Form Dynamic Values Depending on ENV
	form: function(){
            var swagger_port = this.swagger_port ? this.swagger_port : this.port;
            this.server_address = this.protocol + '://' + this.ip + ':' + swagger_port;
	}
}

// Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);

// ========================== Export Module Start ==========================
module.exports = {
	cfg,
	dbConfig,
	expressConfig
}
// ========================== Export Module End ============================