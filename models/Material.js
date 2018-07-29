const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// TODO: Add verified: false as default, add imagePath: String, not required. 
// After upload, admin receives notification with objectId, creates image preview
// and verifies document. Image is placed in a dir, admin updates by id w/ path & verified: true
const MaterialSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	instructions: {
		type: String,
		required: true
	},
	grade: {
		type: String,
		required: true
	},
	unit: {
		type: String,
		required: true
	},
	part: {
		type: String,
		required: true
	},
	filePath: {
		type: String,
		required: true
	},
	imagePath: {
		type: String
	},
	keywords: {
		type: [String]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	username: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	verified: {
		type: Boolean,
		default: false
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
			type: Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

module.exports = Material = mongoose.model("material", MaterialSchema);