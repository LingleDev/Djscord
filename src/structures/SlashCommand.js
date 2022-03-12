const { resolveSlashType } = require('../util/Resolvers')
const SlashCommandOption = require('./SlashCommandOption')

/**
*
*/
class SlashCommand {
	constructor(data, client) {
		// console.log(data, client)
		
		this.type = data?.type || 1
		this.name = data?.name
		this.description = data?.description
		this.options = data?.options || []
		// this.application_id = client.user.id
		this.id = data?.id || null
	}

	setName(name) {
		return this.edit(`name`, name.toLowerCase())
	}

	setDescription(desc) {
		return this.edit("description", desc)
	}

	setOptions(opts) {
		opts.forEach((option, i) => {
			if (option instanceof SlashCommandOption) {
				opts[i] = option.parse();
			}
		})
		
		return this.edit("options", opts)
	}

	setType(type) {
		return this.edit("type", resolveSlashType(type))
	}

	addOption(opt) {
		if (opt instanceof SlashCommandOption) {
			opt = opt.parse()
		}
		
		this.options.push(opt)

		return this;
	}

	edit(prop,val) {
		this[prop] = val; 

		return this;
	}

	parse() {
		return {
			name: this.name,
			description: this.description,
			type: this.type,
			options: this.options,
			application_id: this.application_id
		}
	}

}

module.exports = SlashCommand