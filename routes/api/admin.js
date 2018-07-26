const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Material = require("../../models/Material");

// @router  GET api/admin/init
// @desc    Get list of flagged comments and new uploads for admin review page
// @access  Private
router.get("/initialize-list",
	//passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const results = {
			materials: [],
			comments: []
		};
		Material.find({verified: false})
			.then(foundMaterials => {
				results.materials = foundMaterials;
			})
			.then(() => {
				Comment.find({flagged: true})
					.then(foundComments => {
						results.comments = foundComments;
					})
					.then(() => {
						res.json(results);
					})
					.catch(err => console.log("Error getting flagged comments"));
			})
			.catch(err => {
				console.log("Error in initialize-list route");
			});
});

// @router  GET api/comment/:comment_id
// @desc    Get a comment for admin review page
// @access  Private
router.get("/comment/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Comment.findById(req.params.comment_id)
			.then(foundComment => res.json(foundComment))
			.catch(err => {
				return res.status(400).json({ commentnotfound: "Requested comment not found." });
			});
});

// @router  GET api/material/:material_id
// @desc    Get a material for admin review page
// @access  Private
router.get("/material/:material_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findById(req.params.comment_id)
			.then(foundMaterial => res.json(foundMaterial))
			.catch(err => {
				return res.status(400).json({ materialnotfound: "Requested data not found." });
			});
});

module.exports = router;
