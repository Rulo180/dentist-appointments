import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import SocialSecures from '../../api/socialSecures';

import SocialSecuresTable from '../components/SocialSecuresTable';

export class SocialSecuresListContainer extends PureComponent {
	render() {
		const { socialSecures } = this.props;

		if(socialSecures.length == 0) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}

		return (
			<SocialSecuresTable socialSecures={socialSecures} />
		);
	}
}

export default withTracker(() => {
	const socialsHandler = Meteor.subscribe('socialSecures');
	const loadingSocials = !socialsHandler.ready();

	return {
		socialSecures: !loadingSocials ? SocialSecures.find({}).fetch() : [],
	};
})(SocialSecuresListContainer);
