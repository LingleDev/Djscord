const User = require('./User')

class Member {
	constructor(data, client) {
		this.id = data.user.id
		this.user = new User(data.user, client)
		this.guild = client.guilds.get(data.guild_id)
	}
}

module.exports = Member