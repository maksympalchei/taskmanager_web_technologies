import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '..//..//modules/Sidebar';
import styles from './index.module.css';

function TeamPage1(props) {
  return (
    <section className={cn(styles['dashboard-section'], props.className, 'team-page1')}>
      <div className={styles['main-container']}>
          <Sidebar />
        <article className={styles['main-content']}>
          <div className={styles['invite-panel']}>
            {/* Member invitation form section */}

            <div className={styles.flex_col}>
              <p className={styles['panel-title']}>Add new member</p>

              <div className={styles.flex_row}>
                <input
                  type="text"
                  className={styles['input-field']}
                  placeholder="Enter member email"
                />
                <select className={styles['input-field']}>
                  <option value="HR">HR</option>
                  <option value="Designer">Designer</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                </select>
                <button className={styles['invite-btn']}>
                  Send invite
                </button>
              </div>
            </div>
          </div>

          <div className={styles['team-panel']}>
            <div className={styles.content_box2}>
              <p className={styles['team-title']}>My Team</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

TeamPage1.propTypes = {
  className: PropTypes.string
};

export default TeamPage1;
