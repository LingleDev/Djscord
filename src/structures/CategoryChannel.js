const Channel = require('./Channel')
const { resolveChannel } = require('../util/Resolvers')

class CategoryChannel extends Channel {
	constructor(data, client) {
		super(data, client);
	}

	addChild(channelResolvable) {
		var channel = resolveChannel(channelResolvable)
	}

}