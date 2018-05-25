import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Spinner from "../../components/UI/Spinner";
import TextFieldGroup from "../../components/UI/TextFieldGroup";
import { registerUser } from "../../store/actions/";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: ""
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.onRegisterUser(newUser, this.props.history);
	};

	render() {
		if(this.props.auth.isAuthenticated) {
			return <Redirect to="/" />;
		}
		const errors = this.props.errors || {};
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>
						<p className="lead text-center">Create your Nihon ALT account</p>
						<form onSubmit={this.onSubmit}>
							{ this.props.loading ? <Spinner /> :
							(<Aux>
								<TextFieldGroup 
								name="name"
								placeholder="Name"
								value={this.state.name}
								error={errors.name}
								onChange={this.onChange}
								/>
								<TextFieldGroup 
								name="email"
								placeholder="Email Address"
								value={this.state.email}
								error={errors.email}
								type="email"
								onChange={this.onChange}
								info="This site uses Gravatar so if you want a profile image, use
										a Gravatar email"
								/>
								<TextFieldGroup 
								name="password"
								placeholder="Password"
								value={this.state.password}
								error={errors.password}
								type="password"
								onChange={this.onChange}
								/>
								<TextFieldGroup 
								name="password2"
								placeholder="Confirm password"
								value={this.state.password2}
								error={errors.password2}
								type="password"
								onChange={this.onChange}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" /> 
							</Aux>) }
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	onRegisterUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
	loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
	onRegisterUser: (newUser, history) => dispatch(registerUser(newUser, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));