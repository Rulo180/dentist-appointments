import React, { PureComponent } from 'react';

import { URLS } from '../constants';
import { mapSocialSecureToForm } from '../../ui/utils/utils';

import SocialSecureForm from '../components/SocialSecureForm';


class SocialSecureEditContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
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

				],
			},
		};
	}

	componentDidMount() {
		Meteor.call('socialSecure.find',
			{ _id: this.props.match.params.id},
			(err, res) => {
				this.setState({
					isLoading: false,
					formData: mapSocialSecureToForm(res),
				});
			}
		);
	}

	_handleAdd = () => {
		this.setState((prevState) => ({
			formData: {...prevState.formData, services: prevState.formData.services.concat({name: '', code: ''})},
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
			const socialInput = name.split('-')[0].slice(7);
			switch(socialInput) {
			case 'Name':
				newServices[id] = { ...newServices[id], name: value };
				break;
			case 'Code':
				newServices[id] = { ...newServices[id], code: value };
				break;
			case 'Price':
				newServices[id] = { ...newServices[id], price: value };
				break;
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

		Meteor.call('socialSecure.edit', {
			id: this.props.match.params.id,
			data: {
				name: name.value,
				code: code.value,
				services,
			}
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

export default SocialSecureEditContainer;
