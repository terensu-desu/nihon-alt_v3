const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
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
			type: Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

module.exports = Post = mongoose.model("post", PostSchema);