import React, { Component } from "react";
import SelectListGroup from "./SelectListGroup";

class ConditionalSelectWrapper extends Component {
	render() {
		const gradeOptions = [
			{ label: "* Select A Grade", value: 0 },
			{ label: "JHS Year 1", value: "JHS Year 1" },
			{ label: "JHS Year 2", value: "JHS Year 2" },
			{ label: "JHS Year 3", value: "JHS Year 3" },
			{ label: "Special Needs", value: "Special Needs" },
			{ label: "High School", value: "High School" }
		];
		let unitOptions = [];
		let sectionOptions = [];
		// TODO: Work on making sure select options don't appear when fields are invalid
		if(this.props.gradeValue === "JHS Year 1") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 0", value: "Unit 0"}, 
				{label: "Unit 1", value: "Unit 1"}, 
				{label: "Unit 2", value: "Unit 2"}, 
				{label: "Unit 3", value: "Unit 3"}, 
				{label: "Unit 4", value: "Unit 4"}, 
				{label: "Unit 5", value: "Unit 5"}, 
				{label: "Unit 6", value: "Unit 6"}, 
				{label: "Unit 7", value: "Unit 7"}, 
				{label: "Unit 8", value: "Unit 8"}, 
				{label: "Unit 9", value: "Unit 9"}, 
				{label: "Unit 10", value: "Unit 10"}, 
				{label: "Unit 11", value: "Unit 11"}, 
				{label: "Extras", value: "Extras"},
				{label: "Other", value: "Other"}
			]
		} else if(this.props.gradeValue === "JHS Year 2") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 0", value: "Unit 0"}, 
				{label: "Unit 1", value: "Unit 1"}, 
				{label: "Unit 2", value: "Unit 2"}, 
				{label: "Unit 3", value: "Unit 3"}, 
				{label: "Unit 4", value: "Unit 4"}, 
				{label: "Unit 5", value: "Unit 5"}, 
				{label: "Unit 6", value: "Unit 6"}, 
				{label: "Unit 7", value: "Unit 7"},
				{label: "Extras", value: "Extras"},
				{label: "Other", value: "Other"}
			]
		} else if(this.props.gradeValue === "JHS Year 3") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Unit 0", value: "Unit 0"}, 
				{label: "Unit 1", value: "Unit 1"}, 
				{label: "Unit 2", value: "Unit 2"}, 
				{label: "Unit 3", value: "Unit 3"}, 
				{label: "Unit 4", value: "Unit 4"}, 
				{label: "Unit 5", value: "Unit 5"}, 
				{label: "Unit 6", value: "Unit 6"},
				{label: "Extras", value: "Extras"},
				{label: "Other", value: "Other"}
			]
		} else if(this.props.gradeValue === "Special Needs") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Vocabulary", value: "Vocabulary"}, 
				{label: "Games", value: "Games"}, 
				{label: "Songs", value: "Songs"}, 
				{label: "Holidays", value: "Holidays"},
				{label: "Other", value: "Other"}
			]
		} else if(this.props.gradeValue === "High School") {
			unitOptions = [
				{label: "* Select One", value: 0},
				{label: "Vocabulary", value: "Vocabulary"}, 
				{label: "Activities", value: "Activities"},
				{label: "Holidays", value: "Holidays"},
				{label: "Other", value: "Other"}
			]
		}
		if(this.props.gradeValue && this.props.unitValue.match("Unit")) {
			sectionOptions = [
				{label: "* Select One", value: 0},
				{label: "Section 1", value: "Section 1"}, 
				{label: "Section 2", value: "Section 2"},
				{label: "Section 3", value: "Section 3"},
				{label: "Section 4", value: "Section 4"},
				{label: "Other", value: "Other"}
			];
		} else if(this.props.gradeValue && this.props.unitValue === "Extras") {
			sectionOptions = [
				{label: "* Select One", value: 0},
				{label: "Daily Scene 1", value: "Daily Scene 1"}, 
				{label: "Daily Scene 2", value: "Daily Scene 2"},
				{label: "Daily Scene 3", value: "Daily Scene 3"},
				{label: "Daily Scene 4", value: "Daily Scene 4"},
				{label: "Daily Scene 5", value: "Daily Scene 5"},
				{label: "Daily Scene 6", value: "Daily Scene 6"},
				{label: "Daily Scene 7", value: "Daily Scene 7"},
				{label: "Presentation 1", value: "Presentation 1"},
				{label: "Presentation 2", value: "Presentation 2"},
				{label: "Presentation 3", value: "Presentation 3"},
				{label: "Other", value: "Other"}
			];
		} else if(this.props.gradeValue && this.props.unitValue) {
			sectionOptions = [
				{label: "* Select One", value: 0},
				{label: "Placeholder 1", value: "Placeholder 1"}, 
				{label: "Placeholder 2", value: "Placeholder 2"},
				{label: "Placeholder 3", value: "Placeholder 3"},
				{label: "Placeholder 4", value: "Placeholder 4"},
				{label: "Placeholder 5", value: "Placeholder 5"},
				{label: "Other", value: "Other"}
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
					name="section"
					value={this.props.sectionValue}
					error={this.props.errors.section}
					options={sectionOptions}
					info="What section does this focus on?"
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}

export default ConditionalSelectWrapper;