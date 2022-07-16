const { resolveChannel } = require('../util/Resolvers');
const User = require('./User')
const Embed = require('./Embed')

class Message {
	constructor(data, client) {
		this.client = client

		// console.log(data.guild_id)

		// console.log(data)

		// console.log(data)

		this.id = data.id
		this.content = data.content
		this.author = new User(data.author, client)

		/**
		 * @type {TextChannel}
		 */
		this.channel = client.channels.get(data.channel_id)
		this.guild = client.guilds.get(data.guild_id) || this.channel.guild
	}

	reply(message) {
		return new Promise((res,rej) => {
			// if (this.author.bot) rej();

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

			payload.message_reference = {
				message_id: this.id,
				channel_id: this.channel.id,
				guild_id: this.guild.id,
				fail_if_not_exists: false
			}

			this.channel.send(payload)
			.then((message) => {
				res(message)
			})
			.catch(rej)

		})
	}

	delete(timeout) {
		return new Promise((res,rej) => {
			this.client.rest.delete(`/channels/${this.channel.id}/messages/${this.id}`)
			.then(res)
			.catch(rej)
		})
	}
}

module.exports = Message