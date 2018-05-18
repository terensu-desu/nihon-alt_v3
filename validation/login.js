const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateLoginInput(data) {
	let errors = {};
	// first check if the fields are empty and if so set them to empty strings.
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	// next use validator methods to check the data
	if (!Validator.isEmail(data.email)) {
		errors.email = "Invalid email address.";
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required.";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required.";
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
