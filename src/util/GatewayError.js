module.exports = class DiscordGatewayError extends Error {
  constructor(message, code, reason) {
    super()

    this.name = "GatewayError"
    this.code = code
    this.reason = reason
    this.message = message
  }
}