const { Flags: { Message: MessageFlags }, Presence: { Types, Statuses }, Colors } = require('./Constants')

module.exports = {
	resolveChannel: (res, client) => {
		var Channel = resolveClass("Channel")
		
		if (typeof res == "string" && parseInt(res.charAt(0)) !== NaN) { // id
			return client.channels.get(res);
		}

		if (typeof res == "object" && res instanceof Channel) {
			return client.channels.get(res.id)
		}

		
	},

	resolveColor: (color) => {
		var Color = Colors[color.toUpperCase()]

		return Color;
	},

	resolveClass,

	resolveStatus: (status) => {
		if (!Statuses.includes(status.toLowerCase())) throw new Error(`Status ${status} is not a valid status.`)

		return Statuses.find(s => s === status.toLowerCase());
	},

	resolvePresenceType: (type) => {
		if (typeof type == "undefined") throw new Error(`You must provide a valid string to resolve.`)

		// console.log(type)

		if (typeof type == "string") {
			switch(type.toUpperCase()) {
				case "PLAYING": return 0;
				case "STREAMING": return 1;
				case "LISTENING": return 2;
				case "WATCHING": return 3;
				case "CUSTOM": return 4;
				case "COMPETING": return 5;
			}
		}
	},

	resolveOptionType: (type) => {
		if (typeof type === "number") {
			switch(type) {
				case 1: return "SUBCOMMAND";
				case 2: return "SUB_COMMAND_GROUP";
				case 3: return "STRING";
				case 4: return "INTEGER";
				case 5: return "BOOLEAN";
				case 6: return "USER";
				case 7: return "CHANNEL";
				case 8: return "ROLE";
				case 9: return "MENTIONABLE";
				case 10: return "NUMBER";
				case 11: return "ATTACHMENT";
			}
		}
		
		if (typeof type == "string") {
			switch(type.toUpperCase()) {
				case "SUBCOMMAND":
					return 1;
	
				case "SUB_COMMAND":
					return 1;
	
				case "SUB_COMMAND_GROUP":
					return 2;
	
				case "SUBCOMMAND_GROUP":
					return 2;
	
				case "STRING":
					return 3;
	
				case "INTEGER":
					return 4;
	
				case "BOOLEAN":
					return 5;
	
				case "USER":
					return 6;
	
				case "CHANNEL":
					return 7;
	
				case "ROLE":
					return 8;
	
				case "MENTIONABLE":
					return 9;
	
				case "NUMBER":
					return 10;
	
				case "ATTACHMENT":
					return 11;
	
				default:
					throw new TypeError(`Slash command option type ${type} is not a valid type.`)
			}
		}
	},
	
	resolveSlashType: (type) => {
		if (typeof type == "number") {
			switch(type) {
				case 1: return "CHAT_INPUT";
				case 2: return "USER";
				case 3: return "MESSAGE";
			}
		}
		
		if (typeof type === "string") {
			switch(type.toUpperCase()) {
				case "CHAT_INPUT":
					return 1;
				break;
	
				case "USER":
					return 2;
				break;
	
				case "MESSAGE":
					return 3;
				break;
	
				default:
					throw new TypeError(`Slash command type ${type} is not a valid type.`)
	
				break;
			}
		}
	},

	resolveFlag: (name) => {
		name = name.toUpperCase();

		if (!MessageFlags.hasOwnProperty(name)) throw new ReferenceError(`The message flag ${name} is not a valid flag.`)
		
		return MessageFlags[name];
		
	},

	resolveChannelType: (inp) => {
		if (typeof inp === "string") {
			inp = inp.toUpperCase()

			switch(inp) {
				case "GUILD_TEXT": return 0;
				case "DM": return 1;
				case "GUILD_VOICE": return 2;
				case "GROUP_DM": return 3;
				case "GUILD_CATEGORY": return 4;
				case "GUILD_NEWS": return 5;
				case "GUILD_STORE": return 6;
				case "GUILD_NEWS_THREAD": return 10;
				case "GUILD_PUBLIC_THREAD": return 11;
				case "GUILD_PRIVATE_THREAD": return 12;
				case "GUILD_STAGE_VOICE": return 13;
			}
		
		} else if (typeof inp === "number") {
			switch(inp) {
				case 0: return "GUILD_TEXT";
				case 1: return "DM";
				case 2: return "GUILD_VOICE";
				case 3: return "GROUP_DM";
				case 4: return "GUILD_CATEGORY";
				case 5: return "GUILD_NEWS";
				case 6: return "GUILD_STORE";
				case 10: return "GUILD_NEWS_THREAD";
				case 11: return "GUILD_PUBLIC_THREAD";
				case 12: return "GUILD_PRIVATE_THREAD";
				case 13: return "GUILD_STAGE_VOICE";
			}
		}
	}
	
}

function resolveClass(name) {
	return new Promise((res,rej) => {
		res(require(`../structures/${name}.js`))
	})
}