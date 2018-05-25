const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// INPUT VALIDATION
const validateMaterialInput = require("../../validation/materials");

const Material = require("../../models/Material");
const User = require("../../models/User");

// @router  GET api/materials/:grade/:unit/:section
// @desc    Display materials from a specific grade, unit, section
// @access  Public
router.get("/:grade/:unit/:section", (req, res) => {
	Material.find({
		grade: req.params.grade,
		unit: req.params.unit,
		section: req.params.section
	})
		.sort({ date: -1 })
		.then(materials => res.json(materials))
		.catch(err =>
			res.status(404).json({ notfound: "Unable to find by these parameters." })
		);
});

// @router  GET api/materials/search/...
// @desc    Search for materials by keyword, grade, unit
// @access  Public

// @router  POST api/materials/
// @desc    Upload a file to server
// @access  Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* GET FORMIDABLE, IMPORT, PARSE FILE, SET PATH TO WRITE */
		//check for errors
		console.log(req.body);
		const { errors, isValid } = validateMaterialInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const newMaterial = new Material({
			title: req.body.title,
			instructions: req.body.instructions,
			file: req.body.file, // handle file with module first, place here
			user: req.user.id,
			name: req.body.name,
			avatar: req.body.avatar
		});
		console.log(newMaterial);
		// Want to simply return success, trigger a thank you, alert to gmail or something to review
		res.json({ success: "File uploaded" });
		//newMaterial.save().then(material => res.json({success: "File uploaded"}));
	}
);

// @router  POST api/materials/comment/:id
// @desc    Add a comment to a material
// @access  Private
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.body.text.length < 10) {
			return res
				.status(400)
				.json({ texttooshort: "Comment requires a minimum of 10 characters." });
		}
		Material.findById(req.params.id)
			.then(material => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};
				material.comment.unshift(newComment);
				material.save().then(material => res.json(material));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ materialnotfound: "Requested materials not found." });
			});
	}
);

// @router  DELETE api/materials/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findById(req.params.id)
			.then(material => {
				if (
					material.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(400)
						.json({ commentnotfound: "Comment was not found." });
				}
				const removeIndex = material.comments
					.map(comment => comment._id.toString())
					.indexOf(req.params.comment_id);
				material.comments.splice(removeIndex, 1);
				material.save().then(material => res.json(material));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ materialnotfound: "Requested materials not found." });
			});
	}
);

// @router  POST api/materials/like/:id
// @desc    Like a material
// @access  Private
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findById(req.params.id)
			.then(material => {
				if (
					material.likes.filter(like => like.user.toString() === req.user.id)
						.length > 0
				) {
					return res
						.status(400)
						.json({ alreadyliked: "User aleady liked this item." });
				}
				material.likes.unshift({ user: req.user.id });
				material.save().then(material => res.json(material));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ materialnotfound: "Requested materials not found." });
			});
	}
);

// @router  POST api/materials/unlike/:id
// @desc    Unlike a material
// @access  Private
router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findById(req.params.id)
			.then(material => {
				if (
					material.likes.filter(like => like.user.toString() === req.user.id)
						.length === 0
				) {
					return res
						.status(400)
						.json({ notliked: "User has not liked this item." });
				}
				const removeIndex = material.likes
					.map(like => like.user.toString())
					.indexOf(req.user.id);
				material.likes.slice(removeIndex, 1);
				material.save().then(post => res.json(post));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ materialnotfound: "Requested materials not found." });
			});
	}
);

module.exports = router;
