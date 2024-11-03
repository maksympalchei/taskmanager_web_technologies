import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CustomCalendar from '../../modules/Calendar/Calendar';
import Sidebar from '../../modules/Sidebar/Sidebar';
import TaskCreate from '../../modules/TaskCreate/TaskCreate';
import useAuth from '../../hooks/useAuth';
import useFetchData from '../../hooks/useFetch';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import styles from './DashboardPage.module.css';

function DashboardScreen(props) {
  const { user } = useAuth();
  const { getUserDocument } = useFetchData('users');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoursOnSite, setHoursOnSite] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        const userData = await getUserDocument(user.uid);
        if (userData) {
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');

          if (userData.createdAt) {
            const createdAt = userData.createdAt.toDate();
            const now = new Date();
            const hours = Math.floor((now - createdAt) / (1000 * 60 * 60)); 
            setHoursOnSite(hours);
          }
        }
      }
    };

    fetchUserData();
  }, [user, getUserDocument]);

  useEffect(() => {
    if (!user) return;

    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('assignees', 'array-contains', user.email));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const completedTasks = snapshot.docs.filter(doc => doc.data().status === 'done');
      console.log(completedTasks);
      setTasksDone(completedTasks.length);
    });

    return () => unsubscribe();
  }, [user]);

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
              <div className={styles['highlight-marker']}>
                {firstName[0]}
              </div>
              <p className={styles['user-greeting']}>
                Hello, {firstName} {lastName}!
              </p>
            </div>

            <div className={styles['metrics-container']}>
              <article className={styles['work-time-card']}>
                <p className={styles['work-time-content']}>
                  {hoursOnSite}
                  <br />
                  Hours Worked
                </p>
              </article>

              <article className={styles['completed-tasks-card']}>
                <p className={styles['completed-tasks-content']}>
                  {tasksDone}
                  <br />
                  Tasks Done
                </p>
              </article>
              <CustomCalendar />
            </div>
          </div>

          <button onClick={openModal} className={styles['add-task-btn']}>
            Create a new task
          </button>
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
