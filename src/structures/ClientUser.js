const GetBase64FromImage = require('../util/GetBase64FromURL')

const Presence = require('./Presence')

class ClientUser {
	constructor(data, client) {
		this.username = data.username
		this.id = data.id
		this.avatar = data.avatar
		this.discriminator = data.discriminator
		this.tag = `${this.username}#${this.discriminator}`
		this.bot = data.bot || true
		this.flags = data.flags
		this.system = data.system || false

		this.status = "online"

		this.presence = {}

		this.client = client
	}

	avatarURL(options = { size: 512, type: "png", dynamic: true }) {
		if (this.avatar.startsWith("a_")) options.type = "gif";

		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${type}`

	}

	setUsername(name) {
		return new Promise((resolve, reject) => {
			this.edit({ username: name })
				.then(user => {
					// console.log(user)
					this.client.user = new this.constructor(user, this.client);

					resolve(this.client.user)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	setAvatar(avatar) {
		return new Promise(async (resolve, reject) => {
			if (avatar instanceof Buffer) {
				avatar = avatar.toString('base64')
			} else if (typeof avatar === "string") {
				if (avatar.includes('http')) {
					// console.log("bruh")
					avatar = await GetBase64FromImage(avatar)
				}
			}

			avatar = `data:image/png;base64,${avatar}`
			// console.log(avatar)

			this.edit({ avatar })
			.then(user => {
				this.client.user = new this.constructor(user, this.client);

				resolve(this.client.user)
			})
			.catch(reject)

		})
	}

	edit(obj) {
		return new Promise((resolve, reject) => {
			this.client.rest.patch('/users/@me', obj)
				.then(json => {
					resolve(json)
				})
				.catch(reject)
		})
	}

	statusUpdate(status) {
		return new Promise((res,rej) => {
			this.client.gateway.statusUpdate(status)
			.then(res)
			.catch(rej)
		})
	}

	presenceUpdate(presence) {
		return new Promise((res,rej) => {
			this.client.gateway.presenceUpdate(presence)
			.then(res)
			.catch(rej)
		})
	}
}

module.exports = ClientUser