import React from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '../constants';


const SocialSecureTable = ({ socialSecure }) => {

	let serviceRows = socialSecure.services.map((service) => {
		return (
			<tr key={service.code}>
				<td>{service.code}</td>
				<td>{service.name}</td>
				<td>${service.price}</td>
			</tr>
		);
	});

	return (
		<div className="row justify-content-center">
			<div className="col-lg-10">
				<div className="card">
					<div className="card-body">
						<div className="row no-gutters justify-content-between mb-3">
							<h3>
								{socialSecure.code} - {socialSecure.name}
							</h3>
							<Link to={routes.AddSocial.path} className="btn btn-primary">
								<i className="fas fa-plus"></i>&nbsp;
								<Trans i18nKey="table.actions.add">
									Add Services
								</Trans>
							</Link>
						</div>
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">
										<Trans i18nKey="table.cols.code">
											Code
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.name">
											Name
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.price">
											Price
										</Trans>
									</th>
								</tr>
							</thead>	
							<tbody>
								{serviceRows}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

SocialSecureTable.propTypes = {
	socialSecure: PropTypes.object.isRequired,
};

export default translate('social')(SocialSecureTable);
