import axios from "axios";
import jwt_decode from "jwt-decode";
import * as types from "./actionTypes";
import { startLoading, endLoading } from "./loadingActions";
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
	dispatch(startLoading());
	axios
		.post("/api/users/register", userData)
		.then(res => {
			dispatch(endLoading());
			history.push("/login");
		})
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	dispatch(startLoading());
	axios
		.post("/api/users/login", userData)
		.then(res => {
			// Get token from response and save to localStorage
			const {token} = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Send decoded user data to set user redux state
			dispatch(setCurrentUser(decoded));
			dispatch(endLoading());
		})
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const checkAuthState = () => dispatch => {
	if(localStorage.jwtToken) {
		setAuthToken(localStorage.jwtToken);
		const decoded = jwt_decode(localStorage.jwtToken);
		dispatch(setCurrentUser(decoded));
		const currentTime = Date.now() / 1000;
		if(decoded.exp < currentTime) {
			dispatch(logoutUser());
		}
	}
};

export const setCurrentUser = decoded => {
	return {
		type: types.SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => dispatch => {
	// Remove the token from local storage
	localStorage.removeItem("jwtToken");
	// Remove the auth header
	setAuthToken(false);
	// Set current user to empty object which will set isAuthenticated to false
	// as per the !isEmpty(payload) check in reducer
	dispatch(setCurrentUser({}));
};