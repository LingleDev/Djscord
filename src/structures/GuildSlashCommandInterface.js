const SlashCommand = require('./SlashCommand')
const ExtendedMap = require('../util/ExtendedMap')

class GuildSlashCommandInterface {
	constructor(guild, client) {
		this.client = client;

		this.guild = guild

		this.cache = new ExtendedMap()
	}

	/**
	 * Registers a Discord Slash Command in the parent guild.
	 * @param {Object|SlashCommand} obj 
	 * @returns {Promise<SlashCommand>}
	 */
	register(obj) {
		return new Promise((res, rej) => {
			if (obj instanceof SlashCommand) obj = obj.parse();

				this.client.rest.post(`/applications/${this.client.user.id}/guilds/${this.guild.id}/commands`, obj)
				.then(cmd => {
					var scmd = new SlashCommand(cmd, this.client)

					this.cache.set(cmd.id, scmd)

					res(scmd)
				})
				.catch(rej)

		})
	}

	/**
	 * @param {Array<SlashCommand|Object>} iterable
	 */
	bulkRegister(iterable) {
		return new Promise(async (res, rej) => {
			var array = []

			for (var item of iterable) {
				var cmd = await this.register(item)

				array.push(cmd)

			}

			res(array)
		})
	}

}

module.exports = GuildSlashCommandInterface