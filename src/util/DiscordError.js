

module.exports = class DiscordError extends Error {
	constructor(method, route, code, status, message) {
		super()

		this.name = "DiscordError"
		this.method = method
		this.route = route
		this.code = code

		this.message = `${code}: ${message}`
	}
}