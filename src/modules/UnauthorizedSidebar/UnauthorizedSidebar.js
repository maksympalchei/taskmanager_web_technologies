import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import styles from './UnauthorizedSidebar.module.css';

function WelcomePage(props) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section
      className={cn(styles['task-management-section'], props.className, 'welcome-page')}
      style={{ '--src': `url(${''})` }}
    >
      <aside className={styles.sidebar}>
        <div className={styles['sidebar-content']}>
          <p className={styles['app-logo']}>TaskM</p>

          <nav className={styles['nav-menu']}>
            <button className={cn(styles['btn'], { [styles.active]: isActive('/dashboard') })}>
              Dashboard
            </button>
            <button className={cn(styles['btn'], { [styles.active]: isActive('/team') })}>
              Team
            </button>
            <button className={cn(styles['btn'], { [styles.active]: isActive('/tasks') })}>
              Tasks
            </button>
            <button className={cn(styles['btn'], { [styles.active]: isActive('/invites') })}>
              Invites
            </button>
            <button className={cn(styles['btn'], { [styles.active]: isActive('/settings') })}>
              Settings
            </button>
          </nav>
        </div>
      </aside>
    </section>
  );
}

WelcomePage.propTypes = {
  className: PropTypes.string,
};

export default WelcomePage;
