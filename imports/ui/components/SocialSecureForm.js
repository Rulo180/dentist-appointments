import React from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { URLS } from '../constants';


const SocialSecureForm = ({ formData, onChange, onSubmit, t }) => {
	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-8 col-lg-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<div className="form-group">
									<label htmlFor="name">
										<Trans i18nKey={'form.fields.name.label'}>Name</Trans>
									</label>
									<input  type="text" 
										className="form-control"
										value={formData.name.value}
										onChange={onChange}
										name="name" 
										placeholder={t('form.fields.name.placeholder')} />
								</div>
								<div className="form-group">
									<label htmlFor="code">
										<Trans i18nKey={'form.fields.code.label'}>Code</Trans>
									</label>
									<input  type="text" 
										className="form-control"
										value={formData.code.value}
										onChange={onChange}
										name="code" 
										placeholder={t('form.fields.code.placeholder')} />
								</div>
							</div>
							<div className="row align-items-center">
								<div className="col text-right">
									<button type="submit" className="btn btn-primary">
										<Trans i18nKey={'form.actions.submit'}>
											Submit
										</Trans>
									</button>
								</div>
								<div className="col">
									<Link to={URLS.SOCIALS}>
										<Trans i18nKey={'form.actions.cancel'}>
											Cancel
										</Trans>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

SocialSecureForm.propTypes = {
	formData: PropTypes.shape({
		name: PropTypes.object,
		code: PropTypes.object,
		services: PropTypes.array,
	}),
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default translate('socials')(SocialSecureForm);
