const ClientUser = require('../structures/ClientUser')
const Message = require('../structures/Message')
const Client = require('../client/Client')
const ExtendedMap = require("../util/ExtendedMap")
const User = require('../structures/User')
const Member = require('../structures/Member')

const TextChannel = require('../structures/TextChannel')
const DMChannel = require('../structures/DMChannel')
const VoiceChannel = require('../structures/VoiceChannel')

const Guild = require('../structures/Guild')

const { resolveChannelType } = require('../util/Resolvers')

const DjscordInteraction = require('../structures/DjscordInteraction')

module.exports = {
	/**
	* @param {Object} data
	* @param {Client} client
	*/
	ready: (data, client) => {
		// console.log(data)
		client.user = new ClientUser(data.user, client);
		
		for (var guild of data.guilds) {
			client.guilds.set(guild.id, {
				available: false
			})

		}

		client.emit("ready", client.user);
	},

	/**
	* @param {Object} data
	* @param {Client} client
	*/
	guildCreate: (data, client) => {
		let guild = data

		let channels = new ExtendedMap();
		
		for (var channel of guild.channels) {
			var ch;

			switch(channel.type) {
				case 0:
					ch = new TextChannel(channel, client)
				break;

				case 1:
					ch = new DMChannel(channel, client)
				break;

				case 2:
					ch = new VoiceChannel(channel, client)
				break;
			}

			client.channels.set(channel.id, ch)
			channels.set(channel.id, ch)
		}

		let members = new ExtendedMap();

		for (var member of guild.members) {
			client.users.set(member.user.id, new User(member.user, client));

			members.set(member.user.id, new Member(member, client))

		}

		if (client.guilds.has(guild.id) && client.guilds.get(guild.id).available === false) {
			// guild.members = members
			// guild.channels = channels

			guild.available = true;

			var g = new Guild(guild, client)

			client.guilds.set(guild.id, g);

			client.emit("guildAvailable", g)
		} else {
			var g = new Guild(guild, client)
			client.guilds.set(guild.id, g)

			client.emit('guildCreate', g)
		}
		
	},

	messageCreate: (data, client) => {
		var m = new Message(data, client);

		// console.log("HELLO")

		client.emit("messageCreate", m)

	},

	channelCreate: (data, client) => {
		var type = resolveChannelType(data.type);

		var channel;

		switch(type) {
			case "GUILD_TEXT":
			
			break;
		}

	},

	interactionCreate: (data, client) => {
		var int = new DjscordInteraction(data, client)
		
		client.emit('interactionCreate', int)
	},

	

}