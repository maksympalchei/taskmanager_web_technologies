import React from 'react';
import PropTypes from 'prop-types';
import AlertCircle from '..//..//pictures/AlertCircle.png';
import styles from './AYSButton.module.css';

function AYSButton({ onConfirm, onCancel }) {
  return (
    <div className={styles['action-controls']}>
      <div className={styles['text']}>
        <img
          className={styles['company-logo']}
          src={AlertCircle}
          alt="Alert"
        />
        <div>Are you sure?</div>
      </div>
      <button className={styles['confirm-btn']} onClick={onConfirm}>
        Yes
      </button>
      <button className={styles['decline-btn']} onClick={onCancel}>
        No
      </button>
    </div>
  );
}

AYSButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AYSButton;
