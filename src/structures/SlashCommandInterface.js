const ExtendedMap = require('../util/ExtendedMap')
const Client = require('../client/Client')
const SlashCommand = require('./SlashCommand')

module.exports = class SlashCommandInterface {
	/**
	* @param {Client} client 
	*/
	constructor(client) {
		this.client = client
		this.cache = new ExtendedMap()
	}

	/**
	* Globally registers a Discord Slash Command 
	* @param {Object|SlashCommand} obj A Discord Application Command object
	* @returns {Promise<SlashCommand>} 
	*/
	register(obj) {
		return new Promise((res,rej) => {
			if (obj instanceof SlashCommand) obj = obj.parse()

			this.client.rest.post(`/applications/${this.client.user.id}/commands`, obj)
			.then(slash => {
				// console.log(slash)
				var s = new SlashCommand(slash, this.client);

				this.cache.set(s.id, s)

				res(s)

			})
			.catch(rej)
		})
	}

	/**
	* @param {Array<SlashCommand>|Map<String, SlashCommand>} iterable  
	* @returns {Promise<Array>}
	*/
	bulkRegister(iterable) {
		return new Promise(async (res,rej) => {
			var items = []
			
			for (var item of iterable) {
				var cmd = await this.register(item);

				items.push(cmd)
			}

			res(items)
		})
	}
	
}