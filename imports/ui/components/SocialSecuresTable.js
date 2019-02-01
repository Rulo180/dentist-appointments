import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';


const SocialSecuresTable = ({ socialSecures }) => {
	_renderSocialSecures = () => {
		let socialsArray = [],
			rowNumber = 1;

		socialSecures.map((social) => {
			const { _id, name, code } = social;
			socialsArray.push(
				<tr key={_id}>
					<td scope="row">{rowNumber++}</td>
					<td scope="row">{name}</td>
					<td scope="row">{code}</td>
				</tr>
			);
		});
		return socialsArray;
	};

	return (
		<div className="row justify-content-center">
			<div className="col-lg-10">
				<div className="card">
					<div className="card-body">
						<div className="row no-gutters justify-content-between mb-3">
							<h3>
								<Trans i18nKey={'table.title'}>
									Social Secures
								</Trans>
							</h3>
							<Link to={URLS.CREATE_SOCIALS} className="btn btn-primary">
								<i className="far fa-calendar-plus"></i>&nbsp;
								<Trans i18nKey={'table.actions.add'}>
									Add
								</Trans>
							</Link>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">
										<Trans i18nKey={'table.cols.name'}>
											Name
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'table.cols.code'}>
											Code
										</Trans>
									</th>
								</tr>
							</thead>
							<tbody>
								{this._renderSocialSecures()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

SocialSecuresTable.propTypes = {
	socialSecures: PropTypes.array,
};

export default translate('socials')(SocialSecuresTable);
