import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

export function WelcomePage(props) {
  return (
    <section
      className={cn(styles['task-management-section'], props.className, 'welcome-page')}
      style={{ '--src': `` }}>
      {/* Main task management interface */}

      <div className={styles['layout-container']}>
        <aside className={styles.sidebar}>
          <div className={styles['sidebar-content']}>
            <p className={styles['app-logo']}>TaskM</p>

            <nav className={styles['nav-menu']}>
              {/* Navigation menu */}
              <button className={styles['dashboard-btn']}>
                {/* TODO */}
                Dashboard
              </button>
              <button className={styles['team-btn']}>
                {/* TODO */}
                Team
              </button>
              <button className={styles['tasks-btn']}>
                {/* TODO */}
                Tasks     
              </button>

              <div className={styles['invite-wrapper']}>
                <button className={styles['invites-btn']}>
                  {/* TODO */}
                  Invites
                </button>
              </div>

              <button className={styles['settings-btn']}>
                {/* TODO */}
                Settings
              </button>
              <button className={styles['login-btn']}>
                {/* TODO */}
                Login
              </button>
            </nav>
          </div>
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['welcome-container']}>
            <article className={styles['welcome-msg']}>
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
            </article>

            <div className={styles['action-btns']}>
              <button className={styles['sign-in-btn']}>
                {/* TODO */}
                SIGN IN
              </button>
              <button className={styles['sign-up-btn']}>
                {/* TODO */}
                SIGN UP
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}