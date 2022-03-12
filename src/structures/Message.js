const User = require('./User')

class Message {
	constructor(data, client) {
		this.client = client

		// console.log(data)

		this.content = data.content
		this.author = new User(data.author, client);

		this.channel = client.channels.get(data.channel_id)
		this.guild = client.guilds.get(data.guild_id)
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