const Client = require('../client/Client')
const fetch = require('node-fetch')

/**
 * @param {Client} client
 */
module.exports = (client) => {
	return new Promise((res,rej) => {
		client.rest.get('/gateway/bot')
		.then(res)
		.catch(rej)
	})
}