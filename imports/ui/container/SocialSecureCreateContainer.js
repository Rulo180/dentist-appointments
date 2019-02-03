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
				services: [
					{name: '', code: ''},
				],
			},
		};
	}

	_handleAdd = () => {
		this.setState((prevState) => ({
			formData: {...prevState.formData, services: [...prevState.formData.services, {name: '', code: ''}]},
		}));
	};

	_handleRemove = (index) => {
		this.setState({
			...this.state.formData,
			services: [
				...this.state.formData.services.splice(index, 1),
			]
		});
	};

	_handleChange = (event) => {
		const { name, id, value } = event.target;
		let newFormData = {};
		
		if (name.slice(0, 7) === 'service') {
			let newServices = [...this.state.formData.services];
			const socialInput = name.slice(7,11);
			if ( socialInput === 'Name') {
				newServices[id] = { ...newServices[id], name: value };
			} else if (socialInput === 'Code') {
				newServices[id] = { ...newServices[id], code: value };
			}
			newFormData = {
				...this.state.formData,
				services:  newServices,
			};
		} else {
			newFormData = {
				...this.state.formData,
				[name]: {
					value,
					valid: true,
				}
			};
		}
		this.setState({
			formData: newFormData,
		});
	}

	_handleSubmit = (event) => {
		event.preventDefault();
		const { name, code, services} = this.state.formData;

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
				onAdd={this._handleAdd}
				onRemove={this._handleRemove}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}
 
SocialSecureCreateContainer.propTypes = {

};

export default SocialSecureCreateContainer;
