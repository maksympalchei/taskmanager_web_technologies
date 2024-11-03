import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../../modules/Sidebar/Sidebar';
import styles from './InvitesPage.module.css';
import Invite from '../../modules/Invite/Invite';
import { auth } from '../../firebase';

function InvitesPage(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in with email:", user.email);
        setUser(user);
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <section className={cn(styles['app-container-section'], props.className, 'invites-page')}>
      <div className={styles['layout-wrapper']}>
        <Sidebar />
        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <p className={styles['page-title']}>Invites</p>
          </div>

          <div className={styles['content-divider']}>
            {user ? (
              <Invite recipientEmail={user.email} /> 
            ) : (
              <p>No user logged in</p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

InvitesPage.propTypes = {
  className: PropTypes.string,
};

export default InvitesPage;
