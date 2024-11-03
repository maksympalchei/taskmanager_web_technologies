import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import useAuth from '../../hooks/useAuth';

function WelcomePage(props) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <section
      className={cn(styles['task-management-section'], props.className, 'welcome-page')}
      style={{ '--src': `url(${''})` }}
    >
      <aside className={styles.sidebar}>
        <div className={styles['sidebar-content']}>
          <p className={styles['app-logo']}>TaskM</p>

          <nav className={styles['nav-menu']}>
            <Link to="/dashboard" className={cn(styles['btn'], { [styles.active]: isActive('/dashboard') })}>
              Dashboard
            </Link>
            <Link to="/team" className={cn(styles['btn'], { [styles.active]: isActive('/team') })}>
              Team
            </Link>
            <Link to="/tasks" className={cn(styles['btn'], { [styles.active]: isActive('/tasks') })}>
              Tasks
            </Link>
            <Link to="/invites" className={cn(styles['btn'], { [styles.active]: isActive('/invites') })}>
              Invites
            </Link>
            <Link to="/settings" className={cn(styles['btn'], { [styles.active]: isActive('/settings') })}>
              Settings
            </Link>
            <button className={styles['login-btn']} onClick={handleLogout}>
              Logout
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
