import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function Invite() {
  return (
        <div className={styles['notification-content']}>
          <div className={styles['user-info-wrapper']}>
            <div className={styles['user-header']}>
              <p className={styles['user-name']}>Yaroslav Oleksyn</p>
              <p className={styles['user-role']}>Front-End Developer</p>
            </div>

            <p className={styles['invite-msg']}>Hi! You were invited to Yaroslav Oleksyn`s (yaroslavoleksyn) team</p>
          </div>

          <div className={styles['action-wrapper']}>
            <button className={styles['accept-btn']}>
              Accept{' '}
            </button>
            <button className={styles['decline-btn']}>
              Decline
            </button>
          </div>
        </div>
  );
}

Invite.propTypes = {
  className: PropTypes.string
};

export default Invite;
