const { resolveColor } = require('../util/Resolvers')

class Embed {
	/**
	 * @param {Object} obj A JavaScript Object describing a Discord Embed
	 */
	constructor(json) {
		this.title;
		this.description;
		this.fields = []
		this.timestamp = new Date()
		this.footer = {
			icon: "",
			url: ""
		}

		this.author = {
			icon: "",
			url: ""
		}

		this.thumbnail;
		this.image;

		this.color;

		// this.json = json || {

		// }
	}

	edit(obj) {
		for (var [k,v] of Object.entries(obj)) {
			this.json[k] = v
		}

		return this;
	}

	setThumbnail(url) {
		this.thumbnail = url

		return this;
	}

	setFooter(icon, text) {
		this.footer = {
			icon, text
		}

		return this;
	}

	setAuthor(author) {
		this.author = author

		return this;
	}

	setImage(url) {
		this.image = url;
	}

	setTitle(title) {
		this.title = title;
		
		return this;
		// return this.edit({ title });
	}

	setDescription(desc) {
		this.description = desc;

		return this;
		// return this.edit({ description: desc })
	}

	setColor(color) {
		color = resolveColor(color)
		
		this.color = color;

		return this;
		
		// return this.edit({ color })
	}

	setTimestamp(time) {
		if (!time) time = new Date()

		this.timestamp = time;

		return this;
	}

	addFields(array) {
		this.fields = [...this.fields, ...array]
	}

	addField(field) {
		this.fields.push(field)
	}

	parse() {
		var body = {}

		if (typeof this.title !== "undefined") body.title = this.title;

		if (typeof this.description !== "undefined") body.description = this.description

		if (typeof this.color !== "undefined") body.color = this.color

		if (typeof this.timestamp !== "undefined") body.timestamp = this.timestamp;

		if (typeof this.thumbnail !== "undefined") body.thumbnail = this.thumbnail

		if (this.fields.length > 0) body.fields = this.fields

		return body;
	}
}

module.exports = Embed