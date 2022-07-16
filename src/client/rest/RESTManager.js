const { version } = require('../../../package.json')
const Client = require('../Client')

const fetch = require('node-fetch')

const DiscordError = require('../../util/DiscordError')

module.exports = class RESTManager {
	/**
	 * @param {Client} client
	 */
	constructor(client) {
		this.client = client;
		this.agent = `Djscord (v${version}, https://github.com/LingleDev/Djscord)`

		this.base = `https://discord.com/api/v10`
	}

	get(url) {
		return new Promise((resolve, reject) => {
			fetch(this.base+url, {
				method: "GET",
				headers: {
					"User-Agent": this.agent,
					"Authorization": `Bot ${this.client.token}`
				}
			})
			.then(async r => {
				
				var json;
				
				try { json = await r.json() } catch(err) {}
				
				if (!json?.code) return json;

				var err = new DiscordError("GET", url, json.code, r.status, json.message)

				reject(err)

			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	post(url, body) {
		// console.log(body)
		return new Promise((resolve, reject) => {
			fetch(this.base+url, {
				method: "POST",
				headers: {
					"User-Agent": this.agent,
					"Authorization": `Bot ${this.client.token}`,
					"Content-Type": "application/json"
				},

				body: JSON.stringify(body)
			})
			.then(async r => {
				var json;
				
				try {
					json = await r.json()
				} catch(err) {}

				if (!json?.code) return json

				var err = new DiscordError("POST", url, json.code, r.status, json.message)

				reject(err)

			})
			.then(json => {
				resolve(json)
			})
			.catch(reject)
		})
	}

	patch(url, body) {
		return new Promise((resolve, reject) => {
			fetch(this.base+url, {
				method: "PATCH",
				headers: {
					"User-Agent": this.agent,
					"Authorization": `Bot ${this.client.token}`,
					"Content-Type": "application/json"
				},

				body: JSON.stringify(body)
			})
			.then(async r => {
				var json = await r.json()

				if (!json.code) return json

				var err = new DiscordError("PATCH", url, json.code, r.status, json.message)

				reject(err)

			})
			.then(json => {
				resolve(json)
			})
			.catch(reject)
		})
	}

	put(url, body) {
		return new Promise((resolve, reject) => {
			fetch(this.base+url, {
				method: "PUT",
				headers: {
					"User-Agent": this.agent,
					"Authorization": `Bot ${this.client.token}`,
					"Content-Type": "application/json"
				},

				body: JSON.stringify(body)
			})
			.then(async r => {
				var json = await r.json()

				if (!json.code) return json

				var err = new DiscordError("PUT", url, json.code, r.status, json.message)

				reject(err)

			})
			.then(json => {
				resolve(json)
			})
			.catch(reject)
		})
	}

	delete(url) {
		return new Promise((resolve, reject) => {
			fetch(this.base+url, {
				method: "DELETE",
				headers: {
					"User-Agent": this.agent,
					"Authorization": `Bot ${this.client.token}`
				},

				// body: JSON.stringify(body)
			})
			.then(async r => {
				var json = await r.json()

				if (!json.code) return json

				var err = new DiscordError("DELETE", url, json.code, r.status, json.message)

				reject(err)

			})
			.then(json => {
				resolve(json)
			})
			.catch(reject)
		})
	}

}