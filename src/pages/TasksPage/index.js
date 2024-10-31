import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '..//..//modules/Sidebar';
import styles from './index.module.css';

function TasksPage(props) {
  return (
    <section className={cn(styles['task-management-section'], props.className, 'tasks-page')}>
      {/* Main task management interface section */}

      <div className={styles['main-container']}>
        <Sidebar />
        <div className={styles['task-columns']}>
          {/* Task board columns container */}

          <article className={styles['todo-column']}>
            <div className={styles.content_box2}>
              <p className={styles['column-title']}>TO DO</p>
            </div>

            <div className={styles.color4} />
          </article>

          <article className={styles['progress-column']}>
            <div className={styles.content_box3}>
              <p className={styles['column-title']}>ON PROGRESS</p>
            </div>

            <div className={styles.color4} />
          </article>

          <article className={styles['done-column']}>
            <p className={styles['column-title']}>DONE</p>
          </article>
          
          <div className={styles.color4} />
        </div>
      </div>
    </section>
  );
}

TasksPage.propTypes = {
  className: PropTypes.string
};

export default TasksPage;
