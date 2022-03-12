const Channel = require('./Channel')

class DMChannel extends Channel {
	constructor(data, client) {
		super()

		Object.defineProperty(this, "client", {
			writeable: false,
			value: client
		})
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
	
}

module.exports = DMChannel