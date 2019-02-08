import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { translate, Trans } from 'react-i18next';

import ModalWrapper from './ModalWrapper';


Modal.setAppElement('#render-target');

const DeleteModal = ({ object, isOpen, onConfirm, onClose, t }) => {
	return (
		<ModalWrapper
			title={t('modal.titles.delete')}
			actionText={t('modal.actions.confirm')}
			isOpen={isOpen}
			onAction={onConfirm}
			onClose={onClose}
		>
			<p>
				<Trans i18nKey="modal.messages.delete" object={'Martin'}>
					You are going to delete {{object}}. Are you sure?
				</Trans>
			</p>
		</ModalWrapper>
	);
};

DeleteModal.propTypes = {
	object: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

export default translate('common')(DeleteModal);
