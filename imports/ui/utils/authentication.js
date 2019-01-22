import { Meteor } from 'meteor/meteor';


export const auth = {
	authenticate({
		email,
		password,
		onLoginSucceeded,
		onError,
	}) {
		Meteor.loginWithPassword(
			email,
			password,
			(error) => {
				if (error) {
					/* eslint-disable no-console */
					console.error(error.reason);
					onError();
					return error;
				}

				if (onLoginSucceeded) {
					onLoginSucceeded();
				}
			},
		);
	},

	logout(cb) {
		Meteor.logout(cb);
		console.log('entro');
	},
};
