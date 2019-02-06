import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';

import { URLS } from '../constants';

import SocialSecureTable from '../components/SocialSecureTable';


class SocialSecureViewContainer extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			socialSecure: {
				name: '',
				code: '',
				services: [],
			},
		};
	}

	componentDidMount() {
		Meteor.call('socialSecure.find',
			{ _id: this.props.match.params.id },
			(err, res) => {
				this.setState({
					isLoading: false,
					socialSecure: res,
				});
			}
		);
	}

	render() { 
		const { socialSecure, isLoading } = this.state;

		if (isLoading) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		
		return (
			<SocialSecureTable socialSecure={socialSecure} />
		);
	}
}
 
export default SocialSecureViewContainer;
