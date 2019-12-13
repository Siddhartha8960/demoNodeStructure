module.exports = {
	environment: 'staging',
	ip: '',
	port: 5002,
	protocol: 'http',
	TAG: 'staging',
	swagger_port: 80,
	isStag: true,
	mongo: {
            dbName: 'demo',
            dbUrl: 'mongodb://localhost:29010/',
            options: {
                user: 'demo',
                pass: 'demo',
                useNewUrlParser: true
            },
            dbAuthUrl:'mongodb://demo:demo@localhost:29010/demo'
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
		ACL: 'public-read'
	},

	//Form Dynamic Values Depending on ENV
	form: function(){
		var swagger_port = this.swagger_port ? this.swagger_port : this.port;
		this.server_address = this.protocol + '://' + this.ip + ':' + swagger_port;
	}
}