import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';


const PatientForm = ({ formData, onChange, onSubmit, t }) => {
	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-8 col-lg-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<label htmlFor="nameInput">
									<Trans i18nKey={'form.fields.name.label'}>Name</Trans>
								</label>
								<input  type="text" 
									className="form-control"
									value={formData.name.value}
									onChange={onChange}
									name="name" 
									placeholder={t('form.fields.name.placeholder')} />
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="telInput">
										<Trans i18nKey={'form.fields.tel.label'}>Tel</Trans>
									</label>
									<input  type="tel" 
										className="form-control"
										value={formData.tel.value}
										onChange={onChange}
										name="tel" 
										aria-describedby="telHelp" 
										placeholder={t('form.fields.tel.placeholder')} />
									<small id="telHelp" className="form-text text-muted">E.g. 2616111222.</small>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="birthInput">
										<Trans i18nKey={'form.fields.birthDate.label'}>Birth Date</Trans>
									</label>
									<input  type="date" 
										className="form-control"
										value={formData.birthDate.value}
										onChange={onChange}
										name="birthDate" 
									/>
								</div>
							</div>
							<div className="row align-items-center">
								<div className="col text-right">
									<button type="submit" className="btn btn-primary">
										<Trans i18nKey={'form.actions.submit'}>Submit</Trans>
									</button>
								</div>
								<div className="col">
									<NavLink to={URLS.PATIENTS}>
										<Trans i18nKey={'form.actions.cancel'}>Cancel</Trans>
									</NavLink>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

PatientForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default translate('patients')(PatientForm);
