const { Gateway } = require('../util/Constants').ws.Close_Codes

module.exports = (client) => {
	client.ws.socket.on('error', (err) => {
		console.error(err)
	});

	client.ws.socket.on('close', (code, reason) => {
		var codes = Object.values(Gateway)

		if (codes.includes(code)) {
			console.log(reason.toString('utf-8'))

			// console.log(`Reconnecting...`);
		}
	})
}