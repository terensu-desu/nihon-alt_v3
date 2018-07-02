const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");
const User = require("../../models/User");

// INPUT VALIDATION
//const validatePostInput = require("../../validation/posts");

// @router GET api/posts/test
// @desc   Test posts route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @router GET api/posts/
// @desc   Get all posts
// @access Public
router.get("/", (req, res) => {
	Post.find({})
		.sort({ date: -1 })
		.then(foundPosts => {
			res.json(foundPosts);
		})
		.catch(err => {
			console.log("Error in get all post ", err);
		});
});

// @router GET api/posts/:id
// @desc   Get a blog post
// @access Public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(foundPost => {
			res.json(foundPost);
		})
		.catch(err => {
			console.log("Error in get a post ", err);
		});
});

// @router POST api/posts/
// @desc   Create new post
// @access Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (!req.user.admin) {
			res.status(403).json({
				forbidden:
					"You lack the required permissions to do that. Contact your webserver admin for support."
			});
		}
		//const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			user: req.user.id,
			title: req.body.title,
			content: req.body.content,
			name: req.body.name,
			avatar: req.body.avatar
		});
		res.json({ success: "Post created." });
		// Redirect to admin dashboard
		//newPost.save().then(post => res.json({success: "Post created."}));
	}
);

module.exports = router;
