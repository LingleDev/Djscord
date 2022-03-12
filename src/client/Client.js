const { EventEmitter } = require('events')
const ExtendedMap = require('../util/ExtendedMap')
const SlashCommandInterface = require('../structures/SlashCommandInterface')

const Login = require('../gateway/Login')
const hb = require('../gateway/heartbeat')

const REST = require('./rest/RESTManager')

const GateHandler = require('../gateway/GateHandler')

/**
 * The starting point for any bot
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
	/**
	 * @param {Options} options 
	 */
	constructor(options) {
		super()

		this.users = new ExtendedMap()
		this.guilds = new ExtendedMap()
		this.channels = new ExtendedMap()

		this.token = options?.token
		this.intents = options?.intents

		this.ready = false
		this.readyAt = null

		this.gateway = new GateHandler(this)

		this.rest = new REST(this)
		this.monitor = require('./Monitor')

		this.commands = new SlashCommandInterface(this)

		this.ws = {
			sessionId: null,
			socket: null,
			ping: 0,
			heartbeat: {
				interval: 0,
				received: true,
				last: 0,
				startHeartBeat: hb
			}
		}

		try {
			this.voice = require("@discordjs/voice")
		} catch(err) {
			this.emit(`debug`, `Couldn't find @discordjs/voice, so voice is not supported`)
		}
		
	}

	/**
	 * Starts the bot, and connects the Client to Discord.
	 * @returns {Promise} {Promise}
	 */
	start(token = this.token) {
		return new Promise(async (res,rej) => {
			res(await Login(this))
		})
	}


}

module.exports = Client