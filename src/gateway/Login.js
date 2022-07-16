
const WebSocket = require('ws')
const { Gate_Codes } = require("../util/Constants").ws

const getGatewayBot = require('../util/GetGatewayBot')
const version = require('../../package.json').use_api_version

module.exports = async (client) => {
	var gate = await getGatewayBot(client);

	// console.log(gate)

	if (typeof gate == "undefined") {
		gate = {
			url: "wss://gateway.discord.gg"
		}
	}

	// console.log(gate)
	
	const socket = new WebSocket(`${gate.url}/?v=${version}&encoding=json`)

	client.ws.socket = socket

	client.monitor(client)

	socket.on('message', (message) => {
		var data = JSON.parse(message) || message

		switch(data.op) {
			case 10: // hello
				client.ws.heartbeat.recieved = true;
				client.ws.heartbeat.interval = data.d.heartbeat_interval;

				client.ws.sessionId = data.d.session_id

				client.ws.heartbeat.startHeartBeat(client)

				socket.send(JSON.stringify({
					op: Gate_Codes["IDENTIFY"],
					d: {
						token: client.token,
						intents: client.intents,
						properties: {
							$os: process.platform,
							$device: "djscord",
							$browser: "djscord"
						}
					}
				}))
			break;

			case 11: // heartbeat ack 
				client.ws.heartbeat.last = Date.now()
				client.ws.heartbeat.recieved = true;
			break;

			case 0: // event dispatch
				const Events = require('../util/Constants').ws.Gateway_Events

				if (!Events.hasOwnProperty(data.t)) return;

				if (data.t === "READY") {
					client.ready = true
					client.readyAt = Date.now()

					client.ws.sessionId = data.d.session_id
				}

				const e = require('./Events')[Events[data.t]];

				if (e) e(data.d, client);

			break;
		}

	})

}