import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import esLocale from 'moment/locale/es';
import moment from 'moment';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import App from './App';
import common_es from '../translations/es/common.json';
import common_en from '../translations/en/common.json';
import patients_es from '../translations/es/patients.json';
import patients_en from '../translations/en/patients.json';
import socials_es from '../translations/es/socials.json';
import socials_en from '../translations/en/socials.json';
import social_es from '../translations/es/social.json';
import social_en from '../translations/en/social.json';


i18next.init({
	interpolation: { escapeValue: false },  // React already does escaping
	lng: 'es',
	// debug: true,
	resources: {
		en: {
			common: common_en,
			patients: patients_en,
			socials: socials_en,
			social: social_en,
		},
		es: {
			common: common_es,
			patients: patients_es,
			socials: socials_es,
			social: social_es,
		},
	},
});

Meteor.startup(() => {
	/* Setup locale from the very beginning */
	moment.updateLocale('es', esLocale);
	render(
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
		, document.getElementById('render-target'));
});
