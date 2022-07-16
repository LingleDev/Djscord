module.exports = async (client) => {
	if (client.ws.heartbeat.received === false) throw new Error(`Last heartbeat hasn't been acknowledged, terminating connection.`);

	client.pings.push(Date.now())

	setInterval(() => {
		client.ws.socket.send(JSON.stringify({
			op: 1,
			d: 0
		}))
	}, client.ws.heartbeat.interval)
}