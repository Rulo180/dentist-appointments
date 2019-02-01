import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { URLS } from '../constants';
import SocialSecureForm from '../components/SocialSecureForm';

class SocialSecureCreateContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				name: {
					value: '',
					valid: true,
				},
				code: {
					value: '',
					valid: true,
				},
			},
		};
	}

	_handleChange = (event) => {
		const { name, value } = event.target;

		let newFormData = {
			...this.state.formData,
			[name]: {
				value,
				valid: true,
			}
		};
		this.setState({
			formData: newFormData,
		});
	}

	_handleSubmit = (event) => {
		event.preventDefault();
		const { name, code } = this.state.formData;
		let services = [{name: 'conducto', code: '098'}];

		Meteor.call('socialSecure.insert', {
			name: name.value,
			code: code.value,
			services,
		}, (error) => {
			if (error) {
				console.error(error);
			}
			this.props.history.push(URLS.SOCIALS);
		});
	}

	render() { 
		const { formData } = this.state;

		return (
			<SocialSecureForm
				formData={formData}
				onChange={this._handleChange}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}
 
SocialSecureCreateContainer.propTypes = {

};

export default SocialSecureCreateContainer;
