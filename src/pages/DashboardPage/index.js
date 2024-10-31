import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CustomCalendar from '..//..//modules/Calendar';
import styles from './index.module.css';
import Sidebar from '..//..//modules/Sidebar';
import TaskCreate from '../../modules/TaskCreate';
function DashboardScreen(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <section
      className={cn(
        styles['productivity-section'],
        props.className,
        'dashboard-screen'
      )}
    >
      <main className={styles['main-content']}>

      <div className={styles['content-wrapper']}>
        <nav className={styles['nav-sidebar']}>
          <div className={styles['nav-content']}>
            <Sidebar />
          </div>
        </nav>
      </div>
      <div className={styles['dashboard-wrapper']}>
        <div className={styles['dashboard-main']}>
          <div className={styles['highlight-box']}>
            <div className={styles['highlight-marker']} />
          </div>

          <div className={styles['metrics-container']}>
              <article className={styles['work-time-card']}>
                <p className={styles['work-time-content']}>
                  12
                  <br />
                  Hours Worked
                </p>
              </article>

              <article className={styles['completed-tasks-card']}>
                <p className={styles['completed-tasks-content']}>
                  12
                  <br />
                  Tasks Done
                </p>
              </article>
            <CustomCalendar />
          </div>
        </div>

        <button onClick={openModal} className={styles['add-task-btn'] }>Create a new task</button>
        {isModalOpen && <TaskCreate onClose={closeModal} />}
      </div>
      </main>
    </section>
  );
}

DashboardScreen.propTypes = {
  className: PropTypes.string,
};

export default DashboardScreen;
