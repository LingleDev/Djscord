const fetch = require('node-fetch')

module.exports = (url) => {
	return new Promise(async (resolve, reject) => {
		var r = await fetch(url, {
			method: "GET"
		});

		var buffer = await r.buffer();

		resolve(buffer.toString("base64"))

	})
}