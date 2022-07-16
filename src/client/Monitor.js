const { Gateway } = require('../util/Constants').ws.Close_Codes
const GatewayError = require('../util/GatewayError')

module.exports = (client) => {
	client.ws.socket.on('error', (err) => {
		console.error(err)
	});

	client.ws.socket.on('close', (code, reason) => {
		var codes = Object.values(Gateway)

		if (codes.includes(code)) {
			console.error(new GatewayError(`The Discord gateway connection closed. Reason: ${reason.toString('utf-8')}`, code, reason.toString("utf-8")))
			process.exit()
		}
	})
}