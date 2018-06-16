import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const fileUploadInputGroup = ({
	name,
	value,
	error,
	onChange
}) => {
	return (
		<div>
			<div className="input-group mb-3">
			  <div className="input-group-prepend">
			    <span className="input-group-text">Upload</span>
			  </div>
			  <div className="custom-file">
			    <input 
			    name="fileUpload" 
			    type="file" 
			    className={classnames("custom-file-input", {
						"is-invalid": error
					})}
			    onChange={onChange} />
			    <label className="custom-file-label" htmlFor="fileUpload">
				    {value}
			    </label>
			  </div>
			</div>
			{error && <div className="invalid-feedback" style={{display: "inline"}}>{error}</div>}
		</div>
	);
};

fileUploadInputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default fileUploadInputGroup;