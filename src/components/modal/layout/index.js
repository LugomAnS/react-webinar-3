import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({children}) {
	return (
		<div className="ModalLayout">
			<div className="ModalLayout-content">
				{children}
			</div>
		</div>
	)
}

ModalLayout.propTypes = {
	children: PropTypes.node
}

export default React.memo(ModalLayout);