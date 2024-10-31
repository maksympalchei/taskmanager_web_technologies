import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../../modules/Sidebar';
import AYSButton from '../../modules/AYSButton';
import styles from './index.module.css';
import avatar from '../../pictures/GenericAvatar.png';

function SettingsPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={cn(styles['profile-settings-section'], props.className, 'settings-page')}>
      <div className={styles['layout-container']}>
        <Sidebar />
        <article className={styles['profile-content']}>
          <div className={styles['profile-form']}>
            <img className={styles['profile-avatar']} src={avatar} alt="alt text" />
            <p className={styles['welcome-msg']}>Hello, Maxym!</p>
            <p className={styles['name-edit-label']}>Change first name and last name</p>
            <div className={styles['input-group']}>
              <div className={styles['field']}>
                <input type="text" placeholder="First Name" className={styles['input']} />
              </div>
              <div className={styles['field']}>
                <input type="text" placeholder="Last Name" className={styles['input']} />
              </div>
            </div>
            <p className={styles['password-edit-label']}>Change password</p>
            <div className={styles['input-group']}>
              <div className={styles['field']}>
                <input type="password" placeholder="Password" className={styles['input']} />
              </div>
              <div className={styles['field']}>
                <input type="password" placeholder="Password again" className={styles['input']} />
              </div>
            </div>
            <button className={styles['save-btn']} onClick={openModal}>
              Save changes
            </button>

            {isModalOpen && (
              <div className={styles['modal-overlay']}>
                <div className={styles['confirmation-section']}>
                  <AYSButton onCancel={closeModal} />
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

SettingsPage.propTypes = {
  className: PropTypes.string,
};

export default SettingsPage;
