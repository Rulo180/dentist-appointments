import React, { PureComponent } from 'react';

import Modal from '../components/Modal';
import Aux from './Aux';


function withModal(WrappedComponent, props) {
	return class extends PureComponent {
		constructor(props) {
			super(props);
			this.state = {
				showModal: false,
				content: '',
			};
		}

		_handleClose = () => {
			this.setState({ showModal: false });
		}

		_handleAction(onAction) {
			onAction();
			
			this._handleClose();
		}
		
		_handleOpen = ({ patientId, title, content, onPrimary, onSecondary }) => {

			this.setState({
				patientId,
				title,
				content,
				showModal: true,
				onPrimary: this._handleAction.bind(this, onPrimary),
				onSecondary: this._handleAction.bind(this, onSecondary),
			});
		}

		render() {
			const { title, content, showModal, onPrimary, onSecondary } = this.state;

			return (
				<Aux>
					<WrappedComponent
						openModal={this._handleOpen}
						closeModal={this._handleClose}
						{...props}
					/>
					<Modal
						isOpen={showModal}
						title={title}
						onClose={this._handleClose}
						onPrimary={onPrimary}
						onSecondary={onSecondary}
					>
						{content}
					</Modal>
				</Aux>
			);
		}
	};
}

export default withModal;
