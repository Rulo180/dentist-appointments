import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const Modal = ({ title, isOpen, children, onClose, onPrimary, onSecondary }) => {

	return (
		<ReactModal
			isOpen={isOpen}
			appElement={document.getElementById('render-target')}
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
				<button type="button" onClick={onPrimary} className="btn btn-primary">
					Confirm
				</button>
				<button type="button" onClick={onSecondary} className="btn btn-secondary" data-dismiss="modal">
					Cancel
				</button>
			</div>
		</ReactModal>
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	onClose: PropTypes.func,
	onPrimary: PropTypes.func,
	onSecondary: PropTypes.func,
};

Modal.defaultProps = {
	title: '',
	onPrimary: () => {}, 
	onClose: () => {},
	onSecondary: () => {},
};

export default Modal;
