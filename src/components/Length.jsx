import React from "react";
import { connect } from "react-redux";
import "../css/App.css";
import { decrementAction, incrementAction } from "../redux/Length/action";
import { sessionAction } from "../redux/Session/action";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
class Presentational extends React.Component {
	constructor(props) {
		super(props);
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
	}

	handleIncrement() {
		console.log("length props :", this.props);
		console.table(this.props);
		// ? Si on est en pause
		if (!this.props.session.running) {
			// ? Si on incrémente la durée de la session
			if (
				this.props.name === "session" &&
				this.props.length.sessionDuration !== 60 * 60
			) {
				this.props.session.seconds = this.props.length.sessionDuration + 60;
			}
		}
		this.props.incrementLength(this.props.name);
	}
	handleDecrement() {
		console.log("length props :", this.props);
		console.table(this.props);
		if (!this.props.session.running) {
			if (
				this.props.name === "session" &&
				this.props.length.sessionDuration !== 60
			) {
				this.props.session.seconds = this.props.length.sessionDuration - 60;
			}
		}
		this.props.decrementLength(this.props.name);
	}
	render() {
		return (
			<section id={this.props.name} className='length'>
				<div className='label' id={this.props.name + "-label"}>
					{this.props.name} Length
				</div>
				<div className={"container"}>
					<IoArrowDownOutline
						className='icon decrement'
						id={this.props.name + "-decrement"}
						onClick={this.handleDecrement}
					/>
					<p id={this.props.name + "-length"}>
						{this.props.name === "break"
							? this.props.length.breakDuration / 60
							: this.props.length.sessionDuration / 60}
					</p>
					<IoArrowUpOutline className="icon increment" id={this.props.name+"-increment"} onClick={this.handleIncrement}/>
				</div>
			</section>
		);
	}
}
const mapStateToPprops = (state) => {
	return {
		length: state.length,
		session: state.session,
		controls: state.controls,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		incrementLength: (name) => {
			dispatch(incrementAction(name));
		},
		decrementLength: (name) => {
			dispatch(decrementAction(name));
		},
		timerLength: () => {
			dispatch(sessionAction());
		},
	};
};
const Length = connect(mapStateToPprops, mapDispatchToProps)(Presentational);
export default Length;
