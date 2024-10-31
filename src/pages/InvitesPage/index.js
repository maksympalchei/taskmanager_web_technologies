import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '..//..//modules/Sidebar';
import styles from './index.module.css';
import Invite from '../../modules/Invite';

function InvitesPage(props) {
  return (
    <section className={cn(styles['app-container-section'], props.className, 'invites-page')}>
      <div className={styles['layout-wrapper']}>
        <Sidebar />
        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <p className={styles['page-title']}>Invites</p>
          </div>

          <div className={styles['content-divider']}>
            <Invite/>
            </div>
        </main>
      </div>
    </section>
  );
}

InvitesPage.propTypes = {
  className: PropTypes.string
};

export default InvitesPage;
