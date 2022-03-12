class Channel {
	constructor(data, client) {
		this.client = client

		this.id = data.id
		this.name = data.name
		this.guild = client.guilds.get(data.guild_id) || null
		this.position = data.position
		this.permissions = data.permission_overwrites
		this.typeInt = data.type
	}

	get type() {
		switch(this.typeInt) {
			case 0:
				return "GUILD_TEXT"
			break;

			case 1:
				return "DM"
			break;

			case 2:
				return "GUILD_VOICE"
			break;

			case 3:
				return "GROUP_DM"
			break;

			case 4:
				return "GUILD_CATEGORY"
			break;

			case 5:
				return "GUILD_NEWS"
			break;

			case 6:
				return "GUILD_STORE"
			break;

			case 10:
				return "GUILD_NEWS_THREAD"
			break;

			case 11:
				return "GUILD_PUBLIC_THREAD"
			break;

			case 12:
				return "GUILD_PRIVATE_THREAD"
			break;

			case 13:
				return "GUILD_STAGE_VOICE"
			break;

		}
	}

	setName(name) {
		return this.edit({ name })
	}

	setPosition(position) {
		return this.edit({ position })
	}
}

module.exports = Channel