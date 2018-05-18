const express = require("express");
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


// @router  POST api/materials/comment/:id
// @desc    Add a comment to a material
// @access  Private


// @router  POST api/materials/like/:id
// @desc    Like a material
// @access  Private


// @router  POST api/materials/unlike/:id
// @desc    Unlike a material
// @access  Private


module.exports = router;