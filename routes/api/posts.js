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

// @router  POST api/blog/like/:id
// @desc    Like a blog
// @access  Private
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(foundPost => {
				if (
					foundPost.likes.filter(like => like.user.toString() === req.user.id)
						.length > 0
				) {
					return res
						.status(400)
						.json({ alreadyliked: "User aleady liked this item." });
				}
				foundPost.likes.unshift({ user: req.user.id });
				foundPost.save().then(updatedPost => res.json(updatedPost));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ postnotfound: "Requested post not found." });
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
		Post.findById(req.params.id)
			.then(foundPost => {
				if (
					foundPost.likes.filter(like => like.user.toString() === req.user.id)
						.length === 0
				) {
					return res
						.status(400)
						.json({ notliked: "User has not liked this item." });
				}
				const removeIndex = foundPost.likes
					.map(like => like.user.toString())
					.indexOf(req.user.id);
				foundPost.likes.splice(removeIndex, 1);
				foundPost.save().then(updatedPost => res.json(updatedPost));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ postnotfound: "Requested post not found." });
			});
	}
);

// @router  GET api/comment/:id/:comment_id
// @desc    Get a comment for admin review page
// @access  Private
router.get("/comment/:id/:comment_id", (req, res) => {
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

// @router  POST api/comment/:id
// @desc    Post a new comment to a blog entry
// @access  Private
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.body.content.length < 10) {
			return res
				.status(400)
				.json({ comment: "Comment requires a minimum of 10 characters." });
		}
		Post.findById(req.params.id)
			.then(foundPost => {
				const newComment = {
					text: req.body.content,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};
				foundPost.comments.unshift(newComment);
				foundPost.save().then(updatedPost => res.json(updatedPost));
			})
			.catch(err => {
				return res
					.status(400)
					.json({ postnotfound: "Requested post not found." });
			});
	}
);

// @router  POST api/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete(
	"/comment/:id/:comment_id",
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
				const removeIndex = foundPost.comments
					.map(comment => comment._id.toString())
					.indexOf(req.params.comment_id);
				foundPost.comments.splice(removeIndex, 1);
				foundPost.save().then(updatedPost => res.json(updatedPost));
			})
			.catch(err => {
				return res.status(400).json({ postnotfound: "Requested post not found." });
			});
});

module.exports = router;
