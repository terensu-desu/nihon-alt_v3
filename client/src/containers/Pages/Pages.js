import React, { Component } from "react";
import { Link, NavLink }  from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMaterials } from "../../store/actions/";
import Spinner from "../../components/UI/Spinner";

class Pages extends Component {
	componentDidMount() {
		const params = {
			grade: this.props.match.params.grade,
			unit: this.props.match.params.unit,
			part: this.props.match.params.part
		};
		this.props.onGetMaterials(params);
	}
	componentWillReceiveProps(nextProps) {
		const oldParams = {
			grade: this.props.match.params.grade,
			unit: this.props.match.params.unit,
			part: this.props.match.params.part
		};
		const nextParams = {
			grade: nextProps.match.params.grade,
			unit: nextProps.match.params.unit,
			part: nextProps.match.params.part
		};
		const gradeChange = oldParams.grade !== nextParams.grade;
		const unitChange = oldParams.unit !== nextParams.unit;
		const partChange = oldParams.part !== nextParams.part;
		if(gradeChange || unitChange || partChange) {
			this.props.onGetMaterials(nextParams);
		}
	}
	render() {
		if(this.props.loading) {
			return <Spinner />;
		}
		let chunkSize = 3;
		let screenWidth = window.innerWidth;
		if(screenWidth >= 576 && screenWidth <= 991) {
			chunkSize = 2;
		}
		let list = (
			<div className="card">
				<img 
				className="card-img-top" 
				src="https://images.unsplash.com/photo-1527410638954-79c1e3ee28d5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7b12aeabfd886830f7b571ea496eb958&auto=format&fit=crop&w=1350&q=80" 
				alt="I M A G E" />
		    <div className="card-body">
		      <h5 className="card-title text-center">Area Under Construction</h5>
		      <p className="card-text text-center">
		      We have no teaching materials for this section. Help out your fellow teachers by <Link to="/upload">uploading!</Link>
		      </p>
		    </div>
			</div>
		);
		let row = (
			<div className="row mt-4">
				<div className="col-md-12">
					<div className="card-deck">
						{list}
					</div>
				</div>
			</div>
		);
		if(this.props.materials.length > 0) {
			list = this.props.materials.map(item => (
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
			for(let i = 0; i < list.length; i += chunkSize) {
				listChunks.push(list.slice(i, i + chunkSize));
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
		const { grade, unit } = this.props.match.params;
		const unitParts = this.props.unitParts;
		let partsLinks = null;
		if(unitParts.length > 0) {
			partsLinks = (
				<ul className="nav justify-content-end">
					{unitParts.map(item => (
						<li className="nav-item unit-parts" key={item.value}>
					    <NavLink 
					    activeClassName="super-active"
					    className="nav-link" to={`/pages/${grade}/${unit}/${item.value}`}>
					    	{item.label}
					    </NavLink>
					  </li>
					))}
				</ul>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						{/* --TODO-- Replace this text with related text, eg Unit 2, Part 2 - "I want ~" */}
						<h2>Materials For This Unit</h2>
					</div>
					<div className="col-md-8">
						{partsLinks}
					</div>
				</div>
				{row}
			</div>
		);
	}
}

Pages.propTypes = {
	materials: PropTypes.array.isRequired,
	unitParts: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	onGetMaterials: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	materials: state.materials.materials,
	unitParts: state.materials.unitParts,
	errors: state.errors,
	loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
	onGetMaterials: params => dispatch(getMaterials(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);