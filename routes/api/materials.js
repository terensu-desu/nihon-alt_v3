const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const router = express.Router();

// INPUT VALIDATION
const validateMaterialInput = require("../../validation/materials");

const Material = require("../../models/Material");
const User = require("../../models/User");

// MULTER CONFIG FOR FILE UPLOADS
const acceptedFilesTypes = [
	'application/msword',
	'application/pdf',
	'application/vnd.oasis.opendocument.text',
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

const checkFileType = fileType => {
	let safe = false;
	for(let type of acceptedFilesTypes) {
		if(fileType === type) {
			safe = true;
		}
	}
	return safe;
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`)
  }
});

const upload = multer({
	storage: storage,
	fileFilter: function(req, file, next) {
    if(!checkFileType(file.mimetype)) 
    {
    	req.fileValidationError = true;
      return next(null, false, req.fileValidationError);
    } else {
      next(null, true);
    }
	}
});

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
	upload.single('file'),
	(req, res) => {
		/* ------------------- TODO ---------------------*/
		// Add unit, section, keywords, and generate preview if possible.
		// - for unit and section -> conditionally render select options for both
		// one component to hold all three selects, value of grade dictates options of unit
		// value of unit dictates options of section. FINISHED
		// - keywords -> comma separated value. FINISHED
		// - generate preview -> npm filepreview AVOID, use web api instead.

		//check for errors
		const { errors, isValid } = validateMaterialInput(req.body);
		if(req.fileValidationError) {
			errors.fileUpload = "Only document type files, like .docx and .pdf, are supported."
			return res.status(400).json(errors);
		}
		if(!req.file) {
			errors.fileUpload = "Please upload a supported file."
			return res.status(400).json(errors);
		}
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const newMaterial = new Material({
			title: req.body.title,
			instructions: req.body.instructions,
			filePath: req.file.path,
			user: req.user.id,
			grade: req.body.grade,
			unit: req.body.unit,
			section: req.body.section,
			keywords: req.body.keywords,
			name: req.body.name,
			avatar: req.body.avatar
		});
		console.log("[FROM BACK-END]", newMaterial);
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
