const Message = require('./Message')
const Channel = require('./Channel')
const Embed = require('./Embed')

/**
* @typedef {Object} MessagePayload
*/

/**
* Represents a Discord Text Channel within a Guild.
* @class
* @param {Object} data
* @param {Client} client
*/
class TextChannel extends Channel {
	constructor(data, client) {
		super(data, client)
		
	}

	edit(obj) {
		return new Promise((res,rej) => {
			client.rest.patch(`/channels/${this.id}`, obj)
			.then(channel => {
				res(new this.constructor(channel, this.client))
				return;
			})
			.catch(err => {
				rej(err)
			})
		})
	}

	/**
	* @param {String|MessagePayload} message
	*/
	send(message) {
		return new Promise((res,rej) => {
			var payload = {
			}
			if (typeof message==="string") { // Message string
				payload.content = message;
			} else if (message instanceof Embed) {
				payload.embeds = [ message.parse() ]
			} else if (typeof message === "object") { // MessagePayload
				payload = message

				payload.embeds.forEach((embed,i) => {
					if (embed instanceof Embed) {
						payload.embeds[i] = embed.parse()
					}
				})
				
			} else {
				rej(new TypeError(`The type of the 'message' parameter was not a string nor an object`))
			}

			// console.log(payload)

			this.client.rest.post(`/channels/${this.id}/messages`, payload)
			.then(message => {
				console.log(message)
				var msg = new Message(message, this.client)
				res(msg)
			})
			.catch(rej)

		})
	}
	
}

module.exports = TextChannel