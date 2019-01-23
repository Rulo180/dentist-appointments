import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import esLocale from 'moment/locale/es';
import moment from 'moment';

import App from './App';


Meteor.startup(() => {
	/* Setup locale from the very beginning */
	moment.updateLocale('es', esLocale);
	render(<App />, document.getElementById('render-target'));
});
