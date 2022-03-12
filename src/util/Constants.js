module.exports = {
	http: {
		status_codes: {
			// client errors
			400: "BAD REQUEST",
			401: "UNAUTHORIZED",
			403: "FORBIDDEM",
			404: "NOT FOUND",
			405: "METHOD NOT ALLOWED",
			429: "TOO MANY REQUESTS",

			// success
			200: "OK",
			201: "CREATED",
			204: "NO CONTENT",

			// redirects
			304: "NOT MODIFIED",

			// server errors
			503: "SERVER ERROR",
			502: "BAD GATEWAY",
			500: "GATEWAY UNAVAILABLE"
		},
	},

	json: {
		GENERAL_ERROR: 0,
		UNKNOWN_ACCOUNT: 10001,
		UNKNOWN_APPLICATION: 10002,
		UNKNOWN_CHANNEL: 10003,
		UNKNOWN_GUILD: 10004,
		UNKNOWN_INTEGRATION: 10005,
		UNKNOWN_INVITE: 10006,
		UNKNOWN_MEMBER: 10007,
		UNKNOWN_MESSAGE: 10008,
		UNKNOWN_PERMISSION_OVERWRITE: 10009,
		UNKNOWN_PROVIDER: 10010,
		UNKNOWN_ROLE: 10011,
		UNKNOWN_TOKEN: 10012,
		UNKNOWN_USER: 10013,
		UNKNOWN_EMOJI: 10014,
		UNKNOWN_WEBHOOK: 10015,
		UNKNOWN_BAN: 10026,
		UNKNOWN_SKU: 10027,
		UNKNOWN_STORE_LISTING: 10028,
		UNKNOWN_ENTITLEMENT: 10029,
		UNKNOWN_BUILD: 10030,
		UNKNOWN_LOBBY: 10031,
		UNKNOWN_BRANCH: 10032,
		UNKNOWN_REDISTRIBUTABLE: 10036,
		UNKNOWN_GUILD_TEMPLATE: 10057,
	},

	ws: {
		Gate_Codes: {
			DISPATCH: 0,
			HEARTBEAT: 1,
			IDENTIFY: 2,
			PRESENCE_UPDATE: 3,
			VOICE_STATE_UPDATE: 4,
			RESUME: 6,
			RECONNECT: 7,
			REQUEST_GUILD_MEMBERS: 8,
			INVALID_SESSION: 9,
			HELLO: 10,
			HEARTBEAT_ACK: 11
		},

		Close_Codes: {
			Gateway: {
				UNKNOWN_ERROR: 4000,
				UNKNOWN_OPCODE: 4001,
				DECODE_ERROR: 4002,
				NOT_AUTHENTICATED: 4003,
				AUTHENTICATION_FAILED: 4004,
				ALREADY_AUTHENTICATED: 4005,
				INVALID_SEQ: 4007,
				RATELIMITED: 4008,
				SESSION_TIMED_OUT: 4009,
				INVALID_SHARD: 4010,
				SHARDING_REQUIRED: 4011,
				INVALID_API_VERSION: 4012,
				INVALID_INTENTS: 4013,
				DISALLOWED_INTENTS: 4014
			},
		},
		
		Gateway_Events: {
			'READY': 'ready',
			'MESSAGE_CREATE': 'messageCreate',
			'MESSAGE_UPDATE': 'messageUpdate',
			'MESSAGE_DELETE': 'messageDelete',
			'MESSAGE_DELETE_BULK': 'messageBulkDelete',
			'MESSAGE_REACTION_ADD': 'messageReactionAdd',
			'MESSAGE_REACTION_REMOVE': 'messageReactionRemove',
			'MESSAGE_REACTION_REMOVE_ALL': 'messageReactionAllRemove',
			'CHANNEL_CREATE': 'channelCreate',
			'CHANNEL_UPDATE': 'channelUpdate',
			'CHANNEL_DELETE': 'channelDelete',
			'CHANNEL_PINS_UPDATE': 'channelPinsUpdate',
			'GUILD_CREATE': 'guildCreate',
			'GUILD_UPDATE': 'guildUpdate',
			'GUILD_DELETE': 'guildDelete',
			'GUILD_BAN_ADD': 'guildBanCreate',
			'GUILD_BAN_REMOVE': 'guildBanDelete',
			'GUILD_EMOJIS_UPDATE': 'guildEmojisUpdate',
			'GUILD_INTEGRATIONS_UPDATE': 'guildIntegrationsUpdate',
			'GUILD_ROLE_CREATE': 'roleCreate',
			'GUILD_ROLE_UPDATE': 'roleUpdate',
			'GUILD_ROLE_DELETE': 'roleDelete',
			'GUILD_MEMBER_ADD': 'guildMemberJoin',
			'GUILD_MEMBER_UPDATE': 'guildMemberUpdate',
			'GUILD_MEMBER_REMOVE': 'guildMemberLeave',
			'GUILD_MEMBER_CHUNK': 'guildMemberChunk',
			'PRESENCE_UPDATE': 'guildMemberUpdate',
			'VOICE_STATE_UPDATE': 'voiceStateUpdate',
			'VOICE_SERVER_UPDATE': 'voiceServerUpdate',
			'WEBHOOKS_UPDATE': 'webhookUpdate',
			'USER_UPDATE': 'userUpdate',
			'TYPING_START': 'userTypingStart',
			'INTERACTION_CREATE': 'interactionCreate'
		},
	},

	Colors: {
		"BLURPLE": 0xFEE75C,
		"FUCHSIA": 0x5865F2,
		"GREEN": 0x57F287,
		"YELLOW": 0xFEE75C,
		"RED": 0xED4245,
		"WHITE": 0xFFFFFF,
		"BLACK": 0x000000
	},

	Flags: {
		Message: {
			CROSSPOSTED: (1<<0),
			IS_CROSSPOST: (1<<1),
			SUPPRESS_EMBEDS: (1<<2),
			SOURCE_MESSAGE_DELETED: (1<<3),
			URGENT: (1<<4),
			HAS_THREAD: (1<<5),
			EPHEMERAL: (1<<6),
			LOADING: (1<<7),
			FAILED_TO_MENTION_SOME_ROLES_IN_THREAD: (1<<8)
		},
	},

	Presence: {
		Types: {
			0: "PLAYING",
			1: "STREAMING",
			2: "LISTENING",
			3: "WATCHING",
			4: "CUSTOM",
			5: "COMPETING"
		},

		Statuses: [
			"online",
			"idle",
			"dnd",
			"invisible",
			"offline"
		]
	},

	cdn: {
		avatar: (opts, type="png", size=512, dynamic=true) => {
			if (dynamic && opts.hash.startsWith("a_")) type = ".gif"
			
			return `https://cdn.discordapp.com/avatars/${opts.id}/${opts.hash}.${type}?size=${size}`
		}
	}
	
}