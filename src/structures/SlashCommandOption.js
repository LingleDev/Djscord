const { resolveOptionType } = require('../util/Resolvers')

class SlashCommandOption {
	constructor(data = {}) {
		this.type = data?.type || 3
		this.name = data?.name
		this.description = data?.description
		this.choices = data?.choices || []
		this.required = data.required || false
		this.options = data.options || []
	}

	setRequired(bool) {
		this.required = bool;

		return this;
	}

	setOptions(opts) {
		if (this.type !== resolveOptionType("SUBCOMMAND") || this.type !== resolveOptionType("SUBCOMMAND_GROUP")) throw new TypeError(`Cannot set options for a SlashCommandOption with a type of ${resolveOptionType(this.type)}`);
		
		this.options = opts;
	}

	addOption(opt) {
		if (this.type !== resolveOptionType("SUBCOMMAND") || this.type !== resolveOptionType("SUBCOMMAND_GROUP")) throw new TypeError(`Cannot set options for a SlashCommandOption with a type of ${resolveOptionType(this.type)}`);
		
		this.options.push(opt)
	}
	
	setType(type) {
		this.type = resolveOptionType(type);

		return this;
	}

	setName(name) {
		this.name = name;

		return this;
	}

	setDescription(desc) {
		this.description = desc;

		return this;
	}

	addChoice(obj) {
		this.choices.push(obj)

		return this;
	}

	setChoices(choices) {
		this.choices = choices
	}

	parse() {
		return {
			name: this.name,
			description: this.description,
			type: this.type,
			choices: this.choices || [],
			required: this.required || false,
			options: this.options || []
		}
	}
	
}

module.exports = SlashCommandOption