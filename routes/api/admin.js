const express = require("express");
const passport = require("passport");
const multer = require('multer');
const router = express.Router();

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Material = require("../../models/Material");

// MULTER CONFIG FOR FILE UPLOADS
/*const acceptedFilesTypes = [
	'application/msword',
	'application/pdf',
	'application/vnd.oasis.opendocument.text',
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];*/

/*const checkFileType = fileType => {
	let safe = false;
	for(let type of acceptedFilesTypes) {
		if(fileType === type) {
			safe = true;
		}
	}
	return safe;
};*/

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
    next(null, `${formatedDate}-ZXC-${file.originalname}`)
  }
});

const upload = multer({
	storage: storage,
	/*fileFilter: (req, file, next) => {
    if(!checkFileType(file.mimetype)) 
    {
    	req.fileValidationError = true;
      return next(null, false, req.fileValidationError);
    } else {
      next(null, true);
    }
	}*/
});

// -------------------LIST------------------------

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

// -------------------COMMENTS------------------------

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

// @router  GET api/allow-comment/:comment_id
// @desc    Allow comment after admin review
// @access  Private
router.get("/allow-comment/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Comment.findById(req.params.comment_id)
			.then(foundComment => {
				foundComment.flagged = false;
				foundComment.save();
				res.json({success: "Updated"});
			})
			.catch(err => {
				return res.status(400).json({ commentnotfound: "Requested comment not found." });
			});
});

// REMOVE COMMENT - Used delete comment route found in posts.js

// -------------------MATERIALS------------------------

// @router  GET api/material/:material_id
// @desc    Get a material for admin review page
// @access  Private
router.get("/material/:material_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findById(req.params.material_id)
			.then(foundMaterial => res.json(foundMaterial))
			.catch(err => {
				return res.status(400).json({ materialnotfound: "Requested data not found." });
			});
});

// @router  POST api/verify-material/:material_id
// @desc    Post updated upload material after admin review (Adds imagePath, may contain changes)
// @access  Private
router.post("/verify-material/:material_id",
	passport.authenticate("jwt", { session: false }),
	upload.single("file"),
	(req, res) => {
		Material.findById(req.params.material_id)
			.then(foundMaterial => {
				const fixedKeywords = req.body.keywords.split(",");
				const fixedFilePath = req.file.path.replace("-ZXC-", `-admin-`);
				foundMaterial.imagePath = fixedFilePath;
				foundMaterial.title = req.body.title;
				foundMaterial.instructions = req.body.instructions;
				foundMaterial.grade = req.body.grade;
				foundMaterial.unit = req.body.unit;
				foundMaterial.part = req.body.part;
				foundMaterial.keywords = fixedKeywords;
				foundMaterial.verified = true;
				foundMaterial.save();
				res.json({success: "Updated"});
			})
			.catch(err => {
				return res.status(400).json({ materialnotfound: "Requested data not found." });
			});
});

// @router  DELETE api/remove-material/:material_id
// @desc    Delete uploaded material after admin review
// @access  Private
router.delete("/remove-material/:material_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Material.findByIdAndRemove(req.params.material_id)
			.then(() => res.json({success: "Deleted."}))
			.catch(err => {
				return res.status(400).json({ materialnotfound: "Requested data not found." });
			});
});

module.exports = router;
