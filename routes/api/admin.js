const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const router = express.Router();

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Material = require("../../models/Material");
const User = require("../../models/User");

// @router  GET api/admin/init
// @desc    Get list of flagged comments and new uploads for admin review page
// @access  Private
router.get("/initialize-list",
	//passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const results = {};
		Material.find({verified: false})
			.then(foundMaterials => {
				results.materials = foundMaterials;
			})
			.then(() => {
				Comment.find({flagged: true})
					.then(foundComments => {
						results.comments = foundComments;
					})
					.catch(err => console.log("Error getting flagged comments"));
			})
			.then(() => {
				console.log(results);
			})
			.catch(err => {
				console.log("Error in initialize-list route");
			});
});

// @router  GET api/comment/:id/:comment_id
// @desc    Get a comment for admin review page
// @access  Private
router.get("/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(foundPost => {
				if (
					foundPost.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(400)
						.json({ commentnotfound: "Comment was not found." });
				}
				const commentIndex = foundPost.comments
					.map(comment => comment._id.toString())
					.indexOf(req.params.comment_id);
				res.json(foundPost.comments[commentIndex]);
			})
			.catch(err => {
				return res.status(400).json({ postnotfound: "Requested comment not found." });
			});
});

module.exports = router;
