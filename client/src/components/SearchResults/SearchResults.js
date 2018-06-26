import React, { Component } from "react";
import { connect } from "react-redux";

class SearchResults extends Component {
	render() {
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
				<div className="card" key={item._id}>
					<img 
					className="card-img-top"
					src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b1a117c92ca0030b584bfd26c70bc659&auto=format&fit=crop&w=1375&q=80" 
					alt="I M A G E" />
			    <div className="card-body">
			      <h5 className="card-title">{item.title}</h5>
			      <p className="card-text">
			      {item.instructions}
			      </p>
			      <p className="card-text">
			      	<a href={item.filePath}>Download this file.</a>
			      </p>
			    </div>
			    <div className="card-footer text-muted">
			    	Submitted by {item.username.split(" ")[0]}
			    </div>
				</div>
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

const mapStateToProps = state => ({
	loading: state.loading,
	query: state.search.query,
	results: state.search.results
});

export default connect(mapStateToProps)(SearchResults);