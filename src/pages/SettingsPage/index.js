import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../../modules/Sidebar';
import AYSButton from '../../modules/AYSButton';
import useFetchData from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import styles from './index.module.css';
import avatar from '../../pictures/GenericAvatar.png';

function SettingsPage(props) {
  const { user } = useAuth();
  const { updateUser, getUserDocument } = useFetchData('users'); 
  const { updatePassword } = useAuth(); 
  const [statusMessage, setStatusMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [greetingFirstName, setGreetingFirstName] = useState('');
  const [greetingLastName, setGreetingLastName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        const userData = await getUserDocument(user.uid);
        if (userData) {
          setGreetingFirstName(userData.firstName);
          setGreetingLastName(userData.lastName);
        }
      }
    };

    fetchUserData();
  }, [user, getUserDocument]);

  const handleSaveChanges = async () => {
    if (!firstName || !lastName) {
      setStatusMessage('First Name and Last Name cannot be empty');
      closeModal();
      return;
    }
    
    try {
      if (password && password !== passwordConfirm) {
        setStatusMessage('Passwords do not match');
        closeModal();
        return;
      }
      await updateUser(user.uid, {
        firstName,
        lastName,
      });
      if (password) {
        await updatePassword(user, password);
      }
      setStatusMessage('Profile updated successfully');
      closeModal();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setStatusMessage('Failed to update profile');
      closeModal();
    }
  };
  
  const confirmSaveChanges = () => {
    openModal();
  };

  return (
    <section className={cn(styles['profile-settings-section'], props.className, 'settings-page')}>
      <div className={styles['layout-container']}>
        <Sidebar />
        <article className={styles['profile-content']}>
          <div className={styles['profile-form']}>
            <img className={styles['profile-avatar']} src={avatar} alt="Profile avatar" />
            <p className={styles['welcome-msg']}>Hello, {greetingFirstName} {greetingLastName}!</p>
            <p className={styles['name-edit-label']}>Change first name and last name</p>
            <div className={styles['input-group']}>
              <div className={styles['field']}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles['input']}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles['field']}>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles['input']}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <p className={styles['password-edit-label']}>Change password</p>
            <div className={styles['input-group']}>
              <div className={styles['field']}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles['input']}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles['field']}>
                <input
                  type="password"
                  placeholder="Password again"
                  className={styles['input']}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </div>
            {statusMessage && (
            <div className={styles['status-message']}>
              {statusMessage}
            </div>
            )}
            <button className={styles['save-btn']} onClick={confirmSaveChanges}>
              Save changes
            </button>
            {isModalOpen && (
              <div className={styles['modal-overlay']}>
                <div className={styles['confirmation-section']}>
                  <AYSButton onConfirm={handleSaveChanges} onCancel={closeModal} />
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
