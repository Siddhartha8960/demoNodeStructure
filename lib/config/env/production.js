module.exports = {
	environment: 'production',
	ip: '',
	port: 5003,
	protocol: 'http',
	TAG: 'production',
	swagger_port: 80,
	isProd: true,
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

	//Form Dynamic Values Depending on ENV
	form: function(){
		var swagger_port = this.swagger_port ? this.swagger_port : this.port;
		this.server_address = this.protocol + '://' + this.ip + ':' + swagger_port;
	}
}