/**
 * @readonly
*/
class Presence {
	constructor(data, client) {
		this.client = client

		this.name = data.name
		this.type = data.type
		this.url = data.url
		this.createdAt = new Date(data.created_at)
		this.start = new Date(data.start)
		this.end = new Date(data.end)
		this.application_id = data.application_id
		this.details = data.details
		this.state = data.state
		this.emoji = data.emoji
		this.party = data.party
		this.assets = data.assets
		this.secrets = data.secrets
		this.instance = data.instance
		this.flags = data.flags
		this.buttons = data.buttons
		
	}

	parse() {
		return {
			name: this.name,
			type: this.type,
			url: this.url,
			createdAt: this.createdAt,
			start: this.start,
			end: this.end,
			application_id: this.application_id,
			details: this.details,
			state: this.state,
			emoji: this.emoji,
			party: this.party,
			assets: this.assets,
			secrets: this.secrets,
			instance: this.instance,
			flags: this.flags,
			buttons: this.buttons
		}
	}
	
}

module.exports = Presence