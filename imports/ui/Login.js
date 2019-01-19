import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
		};
	}

	login = () => {
		this.setState({ redirectToReferrer: true });
	};

	render() {
		let { from } = this.props.location.state || { from: { pathname: '/' } };
		let { redirectToReferrer } = this.state;
		
		if (redirectToReferrer) return <Redirect to={from} />;

		return (
			<div>
				<p>You must log in to view the page at {from.pathname}</p>
				<button onClick={this.login}>Log in</button>
			</div>
		);
	}
}
 
export default Login;
