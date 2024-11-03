import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../..//modules/Sidebar';
import styles from './index.module.css';
import { db, auth } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';

function TasksPage(props) {
  const [tasks, setTasks] = useState([]);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    const fetchTeamId = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setTeamId(userDoc.data().teamId);
        }
      }
    };

    fetchTeamId();
  }, []);

  useEffect(() => {
    if (!teamId) return;

    const q = query(collection(db, 'tasks'), where('teamId', '==', teamId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [teamId]);

  const changeTaskStatus = async (taskId, newStatus) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, { status: newStatus });
  };

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'onprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <section className={cn(styles['task-management-section'], props.className, 'tasks-page')}>
      <div className={styles['main-container']}>
        <Sidebar />
        <div className={styles['task-columns']}>
          <article className={styles['todo-column']}>
            <div className={styles['content_box2']}>
              <p className={styles['column-title']}>TO DO</p>
            </div>
            <div className={styles['color4']}>
              {todoTasks.map(task => (
                <div key={task.id} className={styles['task']}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Assignees:</strong> {task.assignees.join(', ')}</p>
                  <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
                  <div className={styles['task-btns']}>
                  <button className={styles['task-btn']} onClick={() => changeTaskStatus(task.id, 'onprogress')}>Move to On Progress</button>
                  <button className={styles['task-btn']} onClick={() => changeTaskStatus(task.id, 'done')}>Move to Done</button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles['progress-column']}>
            <div className={styles['content_box3']}>
              <p className={styles['column-title']}>ON PROGRESS</p>
            </div>
            <div className={styles['color4']}>
              {inProgressTasks.map(task => (
                <div key={task.id} className={styles['task']}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Assignees:</strong> {task.assignees.join(', ')}</p>
                  <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
                  <div className={styles['task-btns']}>
                  <button className={styles['task-btn']} onClick={() => changeTaskStatus(task.id, 'done')}>Move to Done</button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles['done-column']}>
            <div className={styles['content_box1']}>
            <p className={styles['column-title']}>DONE</p>
            </div>
            <div className={styles['color4']}>
              {doneTasks.map(task => (
                <div key={task.id} className={styles['task']}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Assignees:</strong> {task.assignees.join(', ')}</p>
                  <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

TasksPage.propTypes = {
  className: PropTypes.string
};

export default TasksPage;
