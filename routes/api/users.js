const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// INPUT VALIDATION
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");
const keys = require("../../config/keys");

// @router  POST api/users/register
// @desc    Create new user
// @access  Public
router.post("/register", (req, res) => {
	// Send body (form) to validation checker
	const {errors, isValid} = validateRegisterInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({email: req.body.email})
		.then(user => {
			if(user) {
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				// Get Gravatar image
				const avatar = gravatar.url(req.body.email, {
					s: "200", r: "pg", d: "mm"
				});
				// Use UserSchema to create newUser const
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password
				});
				// Encrypt passort
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) {
							return err;
						}
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log("[ERROR IN BCRYPT HASH]: "), err);
					});
				});
			}
		})
});


// @router  POST api/users/login
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
	// Send body (form) to validation checker
	const {errors, isValid} = validateLoginInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({email})
		.then(user => {
			if(!user) {
				errors.email = "User under that email was not found.";
				return res.status(400).json(errors);
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						// Prep payload to send to passport JwtStrategy
						const payload = {
							id: user._id,
							name: user.name,
							avatar: user.avatar
						};
						// Return token here, expires in 12 hours
						jwt.sign(payload, keys.secretOrKey, {expiresIn: "12h"}, (err, token) => {
							res.json({
								success: true,
								token: "Bearer " + token
							});
						});
					} else {
						errors.password = "Password is incorrect.";
						return res.status(400).json(errors);
					}
				})
		})
});

// @router  GET api/users/current
// @desc    Return current user to use in Redux state
// @access  Private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
	res.json(req.user);
});

module.exports = router;