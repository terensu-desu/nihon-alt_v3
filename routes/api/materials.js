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
	}).sort({date: -1})
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
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
	//check for errors
	console.log(req.body);
	const {errors, isValid} = validateMaterialInput(req.body);
	if(!isValid) {
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
	res.json({success: "File uploaded"});
	//newMaterial.save().then(material => res.json({success: "File uploaded"}));
});

// @router  POST api/materials/comment/:id
// @desc    Add a comment to a material
// @access  Private
router.post("/comment/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const {errors, isValid} = validateMaterialInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
	}
	Material.findById(req.params.id)
		.then(material => {
			if(!material) {
				return res.status(400).json({materialnotfound: "Materials not found."});
			}
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};
			material.comment.unshift(newComment);
			material.save().then(material => res.json(material))
		})
		.catch(err => {

		});
});


// @router  POST api/materials/like/:id
// @desc    Like a material
// @access  Private


// @router  POST api/materials/unlike/:id
// @desc    Unlike a material
// @access  Private


module.exports = router;