import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";

class SearchResults extends Component {
	render() {
		if(this.props.loading) {
			return <Spinner />;
		}
		let chunkSize = 3;
		let screenWidth = window.innerWidth;
		if(screenWidth >= 576 && screenWidth <= 991) {
			chunkSize = 2;
		}
		let displayResults = (
			<div className="alert alert-warning" role="alert">
			  Sorry, our search result found nothing.
			</div>
		);
		let row = (
			<div className="row mt-4">
				<div className="col-md-12">
					{displayResults}
				</div>
			</div>
		);
		if(this.props.results.length > 0) {
			displayResults = this.props.results.map(item => (
				<Card 
					key={item._id}
					title={item.title}
					instructions={item.instructions}
					filePath={item.filePath}
					imagePage={item.imagePage}
					likes={item.likes}
					id={item._id}
					username={item.username}
					grade={item.grade}
					unit={item.unit}
					part={item.part}
					authStatus={this.props.authStatus}
				/>
			));
			let listChunks = [];
			for(let i = 0; i < displayResults.length; i += chunkSize) {
				listChunks.push(displayResults.slice(i, i + chunkSize));
			}
			row = listChunks.map((item, index) => (
				<div className="row mt-4" key={index}>
					<div className="col-md-12">
						<div className="card-deck">
							{item}
						</div>
					</div>
				</div>
			));
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2>Results for "{this.props.query}"</h2>
					</div>
				</div>
				{row}
			</div>
		);
	}
}

SearchResults.propTypes = {
	query: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	authStatus: PropTypes.bool.isRequired,
	results: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	loading: state.loading.loading,
	authStatus: state.auth.isAuthenticated,
	query: state.search.query,
	results: state.search.results
});

export default connect(mapStateToProps)(SearchResults);