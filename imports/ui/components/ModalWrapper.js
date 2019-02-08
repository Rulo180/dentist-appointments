import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { translate, Trans } from 'react-i18next';


const ModalWrapper = ({ title, showAction, actionText, actionDisabled, isOpen, children, onAction, onClose }) => {
	const _handleAction = () => {
		onAction();
		onClose();
	};

	const actionButton = showAction
		? (
			<button
				className="btn btn-danger"
				onClick={_handleAction}
				disabled={actionDisabled}
			>
				{actionText}
			</button>
		) : null;
	return (
		<Modal
			isOpen={isOpen}
			className="modal-content"
		>
			<header className="modal-header">
				<h5 className="modal-title">
					{title}
				</h5>
				<button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</header>
			<div className="modal-body">
				{children}
			</div>
			<div className="modal-footer">
				{actionButton}
				<button type="button" onClick={onClose} className="btn btn-secondary" data-dismiss="modal">
					<Trans i18nKey="modal.actions.close">
						Close
					</Trans>
				</button>
			</div>
		</Modal>
	);
};

ModalWrapper.propTypes = {
	title: PropTypes.string,
	showAction: PropTypes.bool,
	actionText: PropTypes.string,
	actionDisabled: PropTypes.bool,
	width: PropTypes.number,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element,
		PropTypes.string,
	]).isRequired,
	onAction: PropTypes.func,
	onClose: PropTypes.func,
};

ModalWrapper.defaultProps = {
	title: '',
	showAction: true,
	actionText: 'OK',
	actionDisabled: false,
	width: 400,
	onAction: () => {}
};
  

export default ModalWrapper;
