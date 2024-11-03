import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import UnauthorizedSidebar from '../../modules/UnauthorizedSidebar/UnauthorizedSidebar.js';
import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';
function MainPage(props) {
  return (
    <section className={cn(styles['task-manager-section'], props.className, 'main-page')}>
      <div className={styles['app-container']}>
        <UnauthorizedSidebar />
        <article className={styles['welcome-content']}>
          <div className={styles['welcome-wrapper']}>
            <p className={styles['welcome-msg']}>
              Welcome to TaskM!
              <br />
              <br />
              <br />
              <br />
              Organize your day, streamline your tasks, and achieve more with ease.
              <br />
              <br />
              {`Whether you're managing projects, tracking personal goals, or collaborating with a team, TaskM is here to help you stay focused and productive.`}
              <br />
              <br />
              Get started now and take control of your to-do list!
            </p>

            <div className={styles['auth-actions']}>
              <Link to="/signin" className={styles['signin-btn']}>
                SIGN IN
              </Link>
              <Link to="/signup" className={styles['signup-btn']}>
                SIGN UP
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

MainPage.propTypes = {
  className: PropTypes.string
};

export default MainPage;
