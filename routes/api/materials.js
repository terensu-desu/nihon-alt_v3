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
];

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
	destination: (req, file, next) => {
    next(null, 'uploads/')
  },
  filename: (req, file, next) => {
  	const fullDate = new Date();
  	const year = fullDate.getFullYear();
  	const month = fullDate.getMonth() + 1;
  	const date = fullDate.getDate();
  	const milliseconds = fullDate.getMilliseconds();
  	let formatedDate = `${year}-${month}-${date}-${milliseconds}`;
    next(null, `${formatedDate}-${file.originalname}`);
  }
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, next) => {
    if(!checkFileType(file.mimetype)) 
    {
    	req.fileValidationError = true;
      return next(null, false, req.fileValidationError);
    } else {
      next(null, true);
    }
	}
});

// @router  GET api/materials/:grade/:unit/:part
// @desc    Display materials from a specific grade, unit, part
// @access  Public
router.get("/:grade/:unit/:part", (req, res) => {
	Material.find({
		grade: req.params.grade,
		unit: req.params.unit,
		part: req.params.part,
		verified: true
	})
		.sort({ date: -1 })
		.then(materials => {
			let unitParts = [];
			if(req.params.unit.match("unit")) {
				unitParts = [
					{label: "Part 1", value: "part1"},
					{label: "Part 2", value: "part2"},
					{label: "Part 3", value: "part3"},
					{label: "Part 4", value: "part4"},
					{label: "Other", value: "other"},
				];
			} else {
				unitParts = [
					{label: "Placeholder 1", value: "placeholder1"},
					{label: "Placeholder 2", value: "placeholder2"},
					{label: "Placeholder 3", value: "placeholder3"},
					{label: "Placeholder 4", value: "placeholder4"},
					{label: "Other", value: "other"},
				];
			}
			const responseObject = {
				materials: materials,
				unitParts: unitParts
			}
			res.json(responseObject)
		})
		.catch(err =>
			res.status(404).json({ notfound: "Unable to find by these parameters." })
		);
});

// @router  GET api/materials/download/:material_id
// @desc    Download material
// @access  Public
router.get("/download/:material_id", (req, res) => {
	Material.findById(req.params.material_id)
		.then(foundMaterial => {
			res.sendFile(foundMaterial.filePath, {root: __dirname + "../../../"});
		})
		.catch(err => console.log("Error: cannot find material to download.", err));
});

// @router  GET api/materials/search/...
// @desc    Search for materials by keyword, grade, unit
// @access  Public
router.post("/search", (req, res) => {
	const queries = req.body.query.split(/[ ,.]+/);
	Material.find({})
		.then(allMaterials => {
			let results = [];
			for(let material of allMaterials) {
				for(let query of queries) {
					if(material.title.toLowerCase().includes(query.toLowerCase())) {
						results.push(material);
					} else if(material.keywords) {
						let match = false;
						for(let word of material.keywords) {
							if(word.toLowerCase().includes(query.toLowerCase())) {
								match = true;
							}
						}
						if(match) {
							results.push(material);
						}
					} else if(material.instructions.toLowerCase().includes(query.toLowerCase())) {
						results.push(material);
					} 
					if(material.grade.includes(query.toLowerCase())) {
						results.push(material);
					} 
					if(material.unit.includes(query.toLowerCase())) {
						results.push(material)
					}
				}
			}
			// send results back to app, redux handles redirect to results component
			console.log(results.length);
			res.json(results);
		})
		.catch(err => {
			console.log(err)
		});
});

// @router  POST api/materials/
// @desc    Upload a file to server
// @access  Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload.single('file'),
	(req, res) => {
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
		const fixedKeywords = req.body.keywords.split(",");
		const newMaterial = new Material({
			title: req.body.title,
			instructions: req.body.instructions,
			filePath: req.file.path,
			user: req.user.id,
			grade: req.body.grade,
			unit: req.body.unit,
			part: req.body.part,
			keywords: fixedKeywords,
			username: req.body.username,
			avatar: req.body.avatar
		});
		console.log("[FROM BACK-END]", newMaterial);
		// Want to simply return success, trigger a thank you, alert to gmail to review
		newMaterial.save().then(() => res.json({success: "File uploaded"}));
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
				material.comments.unshift(newComment);
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
				material.likes.splice(removeIndex, 1);
				material.save().then(material => res.json(material));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ materialnotfound: "Requested materials not found." });
			});
	}
);

module.exports = router;
