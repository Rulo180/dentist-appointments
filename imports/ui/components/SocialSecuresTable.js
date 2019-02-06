import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';


const SocialSecuresTable = ({ socialSecures, onDelete }) => {
	_renderSocialSecures = () => {
		let socialsArray = [];

		socialSecures.map((social) => {
			const { _id, name, code } = social;
			socialsArray.push(
				<tr key={_id}>
					<td><Link to={`${URLS.EDIT_SOCIALS}/${_id}`} className="btn btn-outline-secondary"><i className="fas fa-edit"></i></Link></td>
					<td scope="row">{code}</td>
					<td scope="row">
						<Link to ={`${URLS.SOCIALS}/${_id}`}>
							{name}
						</Link>
					</td>
					<td className="text-center"><button onClick={() => onDelete(_id)} type="button" className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button></td>
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
									<th scope="col">
										<Trans i18nKey="table.actions.edit">
											Edit
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'table.cols.code'}>
											Code
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'table.cols.name'}>
											Name
										</Trans>
									</th>
									<th className="text-center">
										<Trans i18nKey={'table.cols.delete'}>
											Delete
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
	socialSecures: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default translate('socials')(SocialSecuresTable);