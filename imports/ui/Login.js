import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect, NavLink } from 'react-router-dom';

import { auth } from './utils/authentication';


class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			redirectToReferrer: false,
		};
	}

	_handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({
			[id]: value,
		});
	} 

	_handleLoginSubmit = (event) => {
		event.preventDefault();

		let { email, password } = this.state;

		auth.authenticate({
			email,
			password,
			onLoginSucceeded: () => {
				this.setState({ redirectToReferrer: true });
			},
			onError: (error) => {
				this.setState({ errorMessage: error });
			}
		});
	}

	render() {
		const { 
			errorMessage,
			email,
			password,
		} = this.state;
		const { isAuthenticated } = this.props;
		let { from } = this.props.location.state || { from: { pathname: '/' } };

		if (isAuthenticated) {
			return (<Redirect to={from} />);
		}
		let displayErrors = null;
		if (errorMessage) {
			displayErrors = (
				<div>
					{errorMessage}
				</div>
			);
		}

		return (
			<div className="row justify-content-center">
				<div className="col-9 col-md-6">
					<div className="card">
						<div className="card-body">
							<form onSubmit={this._handleLoginSubmit} className="form">
								<div className="form-group">
									<label htmlFor="email">Email address</label>
									<input
										type="email"
										value={email}
										onChange={this._handleChange}
										className="form-control"
										id="email"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
									<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input 
										type="password"
										value={password}
										onChange={this._handleChange}
										className="form-control"
										id="password"
										placeholder="Password"
									/>
								</div>
								<div className="row justify-content-around align-items-center">
									<button type="submit" className="btn btn-primary">Log In</button>
									<NavLink to="/signup">Create new user</NavLink>
								</div>
							</form>
							{displayErrors}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default withTracker(() => {
	return {
		isAuthenticated: !!Meteor.userId(),
	};
})(Login);
