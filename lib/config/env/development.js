module.exports = {
	environment: 'development',
	ip: '',
	port: 5001,
	protocol: 'http',
	TAG: 'development',
	swagger_port: 80,
	isDev: true,
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
	
	wkhtmltopdf: '',

	//Form Dynamic Values Depending on ENV
	form: function(){
		var swagger_port = this.swagger_port ? this.swagger_port : this.port;
		this.server_address = this.protocol + '://' + this.ip + ':' + swagger_port;
	}
}