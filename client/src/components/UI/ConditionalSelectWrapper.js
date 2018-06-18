import React, { Component } from "react";
import SelectListGroup from "./SelectListGroup";

class ConditionalSelectWrapper extends Component {
	render() {
		const gradeOptions = [
			{ label: "* Select A Grade", value: 0 },
			{ label: "JHS Year 1", value: "jhsyear1" },
			{ label: "JHS Year 2", value: "jhsyear2" },
			{ label: "JHS Year 3", value: "jhsyear3" },
			{ label: "Special Needs", value: "specialneeds" },
			{ label: "High School", value: "highschool" }
		];
		let unitOptions = [];
		let partOptions = [];
		// TODO: Work on making sure select options don't appear when fields are invalid
		if(this.props.gradeValue === "jhsyear1") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 0", value: "unit0"}, 
				{label: "Unit 1", value: "Unit1"}, 
				{label: "Unit 2", value: "unit2"}, 
				{label: "Unit 3", value: "unit3"}, 
				{label: "Unit 4", value: "unit4"}, 
				{label: "Unit 5", value: "unit5"}, 
				{label: "Unit 6", value: "unit6"}, 
				{label: "Unit 7", value: "unit7"}, 
				{label: "Unit 8", value: "unit8"}, 
				{label: "Unit 9", value: "unit9"}, 
				{label: "Unit 10", value: "unit10"}, 
				{label: "Unit 11", value: "unit11"}, 
				{label: "Extras", value: "extras"},
				{label: "Other", value: "other"}
			]
		} else if(this.props.gradeValue === "jhsyear2") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 1", value: "unit1"}, 
				{label: "Unit 2", value: "unit2"}, 
				{label: "Unit 3", value: "unit3"}, 
				{label: "Unit 4", value: "unit4"}, 
				{label: "Unit 5", value: "unit5"}, 
				{label: "Unit 6", value: "unit6"}, 
				{label: "Unit 7", value: "unit7"},
				{label: "Extras", value: "extras"},
				{label: "Other", value: "other"}
			]
		} else if(this.props.gradeValue === "jhsyear3") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 1", value: "unit1"}, 
				{label: "Unit 2", value: "unit2"}, 
				{label: "Unit 3", value: "unit3"}, 
				{label: "Unit 4", value: "unit4"}, 
				{label: "Unit 5", value: "unit5"}, 
				{label: "Unit 6", value: "unit6"},
				{label: "Extras", value: "extras"},
				{label: "Other", value: "other"}
			]
		} else if(this.props.gradeValue === "specialneeds") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Vocabulary", value: "vocabulary"}, 
				{label: "Games", value: "games"}, 
				{label: "Songs", value: "songs"}, 
				{label: "Holidays", value: "holidays"},
				{label: "Other", value: "other"}
			]
		} else if(this.props.gradeValue === "highschool") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Vocabulary", value: "vocabulary"}, 
				{label: "Activities", value: "activities"},
				{label: "Holidays", value: "holidays"},
				{label: "Other", value: "other"}
			]
		}
		if(this.props.gradeValue && this.props.unitValue.match("unit")) {
			partOptions = [
				{label: "* Select One", value: 0},
				{label: "Part 1", value: "part1"}, 
				{label: "Part 2", value: "part2"},
				{label: "Part 3", value: "part3"},
				{label: "Part 4", value: "part4"},
				{label: "Other", value: "other"}
			];
		} else if(this.props.gradeValue && this.props.unitValue === "extras") {
			partOptions = [
				{label: "* Select One", value: 0},
				{label: "Daily Scene 1", value: "dailyscene1"}, 
				{label: "Daily Scene 2", value: "dailyscene2"},
				{label: "Daily Scene 3", value: "dailyscene3"},
				{label: "Daily Scene 4", value: "dailyscene4"},
				{label: "Daily Scene 5", value: "dailyscene5"},
				{label: "Daily Scene 6", value: "dailyscene6"},
				{label: "Daily Scene 7", value: "dailyscene7"},
				{label: "Presentation 1", value: "presentation1"},
				{label: "Presentation 2", value: "presentation2"},
				{label: "Presentation 3", value: "presentation3"},
				{label: "Other", value: "other"}
			];
		} else if(this.props.gradeValue && this.props.unitValue) {
			partOptions = [
				{label: "* Select One", value: 0},
				{label: "Placeholder 1", value: "placeholder1"}, 
				{label: "Placeholder 2", value: "placeholder2"},
				{label: "Placeholder 3", value: "placeholder3"},
				{label: "Placeholder 4", value: "placeholder4"},
				{label: "Placeholder 5", value: "placeholder5"},
				{label: "Other", value: "other"}
			];
		}
		return (
			<div className="form-row">
				<SelectListGroup
					name="grade"
					value={this.props.gradeValue}
					error={this.props.errors.grade}
					options={gradeOptions}
					info="What grade level is this exercise for?"
					onChange={this.props.onChange}
				/>
					<SelectListGroup
					name="unit"
					value={this.props.unitValue}
					error={this.props.errors.unit}
					options={unitOptions}
					info="What unit does this target?"
					onChange={this.props.onChange}
				/>
					<SelectListGroup
					name="part"
					value={this.props.partValue}
					error={this.props.errors.part}
					options={partOptions}
					info="What section does this focus on?"
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}

export default ConditionalSelectWrapper;