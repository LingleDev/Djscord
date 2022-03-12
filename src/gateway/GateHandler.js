const { Presence: { Types } } = require('../util/Constants')

const UserPresence = require('../structures/Presence')

const { resolvePresenceType, resolveStatus } = require('../util/Resolvers')

class GateHandler {
	constructor(client) {
		this.client = client
	}

	statusUpdate(status) {
		return new Promise((res,rej) => {
			status = resolveStatus(status);

			console.log(status)
			
			var activity = this.client.user.activity?.parse();

			if (activity) {
				activity = {
					name: activity?.name,
					type: activity?.type,
					url: activity.url
				}
			} else {
				activity = {}
			}

			this.client.ws.socket.send(JSON.stringify({
				op: 3,
				d: {
					since: null,
					status,
					activities: [activity],
					afk: false
				}
			}))

			res()
			
		})
	}

	/**
	 * @typedef {Object} Presence A Discord Presence object
 	 * @property {String} name
	 * @property {Number} type
	 * @property {String} url
	*/

	/**
	 * @param {Presence} presence
	*/
	presenceUpdate(presence) {
		return new Promise((res,rej) => {
			var type = presence.type,
			url = presence.url

			if (typeof type === "undefined") type = 1;
			
			if (typeof type === "string") {
				type = resolvePresenceType(type);
			}

			if (typeof url !== "undefined") {
				var valid = validateStreamURL(url);

				if (!valid) rej(new Error(`The URL ${url} is not from twitch nor youtube, so it is not valid.`));
			
			}
			
			var payload = {
				name: presence.name,
				type,
				url
			}

			var pres = new UserPresence(payload, this.client)

			this.client.user.activity = pres

			this.client.ws.socket.send(JSON.stringify({
				op: 3,
				d: {
					since: null,
					activities: [payload],
					afk: false,
					status: this.client.user.status
				}
			}))

			res(pres)
		})
	}
}

function validateStreamURL(url) {
	var youtube = false;
	var twitch = false;
	
	if (url.indexOf("youtube.com") > -1) youtube = true;
	if (url.indexOf("twitch.tv") > -1) twitch = true;

	if (youtube || twitch) return true;

	return false;
}

module.exports = GateHandler