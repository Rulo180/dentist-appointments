import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import { routes } from './constants';


class Signup extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirm: '',
			hasError: false,
		};
	}
	_handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({
			[id]: value,
		});
	} 

	_handleSubmit = (event) => {
		event.preventDefault();

		const { email, password, confirm } = this.state;

		if (password === confirm) {
			Accounts.createUser({
				email,
				password,
			});
			this.props.history.push(routes.Home.path);
		} else {
			this.setState({ hasError: true });
		}
	}

	render() {
		const { 
			email,
			password,
			confirm,
			hasError,
		} = this.state;
		let errorComponent = (
			<div>
				Your passwords doesn't match.
			</div>
		);
		return (
			<div className="row justify-content-center">
				<div className="col-9 col-md-6">
					<div className="card">
						<div className="card-body">
							<form onSubmit={this._handleSubmit} className="form">
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
								<div className="form-group">
									<label htmlFor="confirm">Confirm</label>
									<input 
										type="password"
										value={confirm}
										onChange={this._handleChange}
										className="form-control"
										id="confirm"
										placeholder="Confirm your password"
									/>
								</div>
								<div className="row justify-content-around align-items-center">
									<button type="submit" className="btn btn-primary">Sign In</button>
									<NavLink to="/login">I already have an account</NavLink>
								</div>
							</form>
							{hasError && errorComponent}	
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
