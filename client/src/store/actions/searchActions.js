import axios from "axios";
import * as types from "./actionTypes";
import { startLoading, endLoading } from "./loadingActions";

export const handleSearch = (query, history) => dispatch => {
	dispatch(startLoading());
	axios.post("/api/materials/search", query)
		.then(res => {
			const payload = {
				results: res.data,
				query: query.query
			}
			dispatch(endLoading());
			dispatch({
				type: types.HANDLE_SEARCH,
				payload: payload
			});
		})
		.then(() => history.push("/searchresults"))
		.catch(err => {
			dispatch(endLoading());
			console.log("error in handle search")
		});
}