import React from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '../constants';


const SocialSecureForm = ({ formData, onChange, onSubmit, onAdd, onRemove, t }) => {
	
	let serviceInputs = formData.services.map((service, index) => {
		let nameId = `serviceName-${index}`,
			codeId = `serviceCode-${index}`,
			priceId = `servicePrice-${{index}}`;
		return (
			<div className="form-group" key={index}>
				<hr/>
				<div className="form-row form-group">
					<div className="col align-self-end text-center">
						<div onClick={() => onRemove(index)} className="btn btn-danger btn-sm">-</div>
					</div>
					<div className="col-10">
						<label htmlFor={nameId}>
							<Trans i18nKey={'form.fields.services.name.label'}>Name</Trans>
						</label>
						<input
							name={nameId}
							id={index}
							value={formData.services[index].name}
							onChange={onChange}
							type="text"
							className="form-control text-uppercase" 
							placeholder={t('form.fields.services.name.placeholder')}
						/>
					</div>
					<div className="col-5">
						
					</div>
				</div>
				<div className="form-row">
					<div className="col-5 offset-2">
						<label htmlFor={codeId}>
							<Trans i18nKey={'form.fields.services.code.label'}>Code</Trans>
						</label>
						<input 
							name={codeId}
							id={index}
							value={formData.services[index].code}
							onChange={onChange}
							type="text" 
							className="form-control" 
							placeholder={t('form.fields.services.code.placeholder')}
						/>
					</div>
					<div className="col-5">
						<label htmlFor={priceId}>
							<Trans i18nKey={'form.fields.services.price.label'}>Price</Trans>
						</label>
						<input 
							name={priceId}
							id={index}
							value={formData.services[index].price}
							onChange={onChange}
							type="number" 
							className="form-control" 
							placeholder="Price" 
							placeholder={t('form.fields.services.price.placeholder')}
						/>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-9 col-lg-8">
				<div className="card">
					<div className="card-body">
						<form onSubmit={onSubmit}>
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
							{serviceInputs}
							<div className="form-row">
								<div className="col text-center">
									<div onClick={onAdd} className="btn btn-info btn-sm">+</div>
								</div>
								<div className="col-10"></div>
							</div>
							<div className="row align-items-center mt-3">
								<div className="col text-right">
									<button type="submit" className="btn btn-primary">
										<Trans i18nKey={'form.actions.submit'}>
											Submit
										</Trans>
									</button>
								</div>
								<div className="col">
									<Link to={routes.Socials.path}>
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
