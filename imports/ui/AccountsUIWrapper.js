import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class AccountsUIWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	componentDidMount() {
    	this.view = Blaze.render(Template.loginButtons,
    		ReactDOM.findDOMNode(this.refs.container));
	}

	componentWillUnmount() {
		Blaze.remove(this.view);
	}
    
	render() {
    	return <span ref="container" />;
	}
}
 
export default AccountsUIWrapper;
