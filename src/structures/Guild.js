const ExtendedMap = require('../util/ExtendedMap')
const GuildSlashCommandInterface = require('./GuildSlashCommandInterface')

const Member = require('./Member')

const TextChannel = require('./TextChannel')
const VoiceChannel = require('./VoiceChannel')

class Guild {
	constructor(data, client) {
		this.id = data.id
		this.name = data.name
		this.roles = new ExtendedMap();
		this.members = new ExtendedMap();
		this.channels = new ExtendedMap();

		this.commands = new GuildSlashCommandInterface(this, client)
	
		for (var member of data.members) {
			this.members.set(member.user.id, new Member(member, client))
		}

		for (var channel of data.channels) {
			var ch;

			switch(channel.type) {
				case 0:
					ch = new TextChannel(channel, client)
				break;

				case 2:
					ch = new VoiceChannel(channel, client)
				break;
			}
			
			this.channels.set(channel.id, ch)
		}
		
	}

	get initials() {
    return this.name
      .replace(/'s /g, ' ')
      .replace(/\w+/g, e => e[0])
      .replace(/\s/g, '');
  }
}

module.exports = Guild