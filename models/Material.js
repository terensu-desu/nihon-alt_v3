const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	grade: {
		type: String,
		required: true
	},
	unit: {
		type: String,
		required: true
	},
	section: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	keywords: {
		type: [String]
	},
	instructions: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	date: {
		type: Date,
		default: Date.now
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String,
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = Material = mongoose.model("material", MaterialSchema);