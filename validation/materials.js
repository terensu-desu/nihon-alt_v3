const Validator = require("validator");
const isEmpty = require("./is-empty");
// [TODO] Change to match post fields for Material upload
module.exports = function validateMaterialInput(data) {
	let errors = {};
	// first check if the fields are empty and if so set them to empty strings.
	data.title = !isEmpty(data.title) ? data.title : "";
	data.instructions = !isEmpty(data.instructions) ? data.instructions : "";
	data.file = !isEmpty(data.file) ? data.file : "";
	// next use validator methods to check the data
	if(!Validator.isLength(data.title, {min: 10, max: 40})) {
		errors.title = "Title must be between 10 and 40 characters.";
	}
	if(Validator.isEmpty(data.title)) {
		errors.title = "A title is required.";
	}
	if(Validator.isEmpty(data.grade) || data.grade == 0) {
		errors.grade = "A grade choice is required.";
	}
	if(Validator.isEmpty(data.unit) || data.unit == 0) {
		errors.unit = "A unit choice is required.";
	}
	if(Validator.isEmpty(data.part) || data.part == 0) {
		errors.part = "Part is required.";
	}
	if(!Validator.isLength(data.instructions, {min: 20, max: 1500})) {
		errors.instructions = "Instructions must be a minimum of 20 characters.";
	}
	if(Validator.isEmpty(data.instructions)) {
		errors.instructions = "Instructions are required.";
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
};