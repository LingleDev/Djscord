const Client = require('../client/Client')

const Resolvers = require('../util/Resolvers')

/**
 * @interface
*/
class DjscordInteraction {

	/**
	 * @typedef {Object} IntReplyPayload
	 * @property {String} content
   * @property {Boolean} ephemeral
	*/

	/**
   * @typedef {Object} IntDeferOptions
	 * @property {Boolean} ephemeral
	 * @property
	*/
	
	
	/**
	 * @param {Object} data
	 * @param {Client} client
	 */
	constructor(data, client) {
		this.client = client

		this.id = data.id
		this.name = data.data.name

		this.guild = client.guilds.get(data.guild_id)

		if (typeof data.member == "undefined") {
			this.user = client.users.get(data.user.id)
		} else {
			this.user = client.users.get(data.member.user.id)
		}
		
		this.channel = client.channels.get(data.channel_id)
		this.member = this.guild?.members.get(this.user.id)

		this.options = data.options

		this.type = data.type

		this.token = data.token

		this.deferred = false;

		this.replied = false;
		

	}

	get button() {
		if (this.type == 3) return true

		return false
	}

	get command() {
		if (this.type == 2) return true

		return false
	}

	reply(content) {
		return new Promise((res,rej) => {
			if (this.deferred || this.replied) throw new Error("Already replied")
			
			var payload = {};

			if (typeof content === "string") payload.content = content; else if (typeof content === "object") payload = content;

			if (payload.ephemeral) {
				payload.flags |= Resolvers.resolveFlag("ephemeral");
			}
			
			this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
				type: 4,
				data: payload
			})
			.then(interaction => {
				this.replied = true;
				this.deferred = true;
				
				res(this)
			})
			.catch(rej)
		})
	}

	defer(payload={}) {
		return new Promise((res,rej) => {
			if (this.deferred || this.replied) throw new Error("Already replied")

			var flags;

			if (payload.ephemeral) {
				flags |= Resolvers.resolveFlag("ephemeral");
			}
			
			this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
				type: 5,
				data: {
					flags
				}
			})
			.then(() => {
				this.deferred = true;
				this.replied = true;
				res()
			})
			.catch(rej)
		})
	}

	update(content) {
		return new Promise((res,rej) => {
			if (!this.deferred || !this.replied) throw new Error("Interaction has not replied yet");

			var flags;

			var payload = {};

			if (typeof content === "string") payload.content = content; else if (typeof content === "object") payload = content;

			if (payload.ephemeral) {
				payload.flags |= Resolvers.resolveFlag("ephemeral");
			}
			this.client.rest.patch(`/webhooks/${this.client.user.id}/${this.token}/messages/@original`, payload)
			.then(res())
			.catch(err)
		})
	}

	
	
}

module.exports = DjscordInteraction