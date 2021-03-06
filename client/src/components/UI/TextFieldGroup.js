import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const textFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	extraClass,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames("form-control", extraClass, {
					"is-invalid": error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

textFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

textFieldGroup.defaultProps = {
	type: "text"
};

export default textFieldGroup;
