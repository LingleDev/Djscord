// const DMChannel = require('./DMChannel')

class User {
	constructor(data, client) {
		// console.log(data)
		
		this.id = data.id
		this.username = data.username
		this.avatarHash = data.avatar
		this.discriminator = data.discriminator

		this.bot = data.bot || false

		// this.dms = new DMChannel(this, client)
	}

	get avatar() {
		var ending = "png";

		if (this.avatarHash.startsWith("a_")) ending = "gif";

		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}.${ending}`
		
	}
}

module.exports = User