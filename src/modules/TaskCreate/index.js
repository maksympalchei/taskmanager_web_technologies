import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '..//..//firebase';
import useAuth from '../../hooks/useAuth';
import styles from './index.module.css';

function TaskCreate({ onClose }) {
  const { user } = useAuth();
  const [teamId, setTeamId] = useState(null);
  const [tags, setTags] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [inputAssignee, setInputAssignee] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserTeamId = async () => {
      if (user && user.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setTeamId(userDoc.data().teamId || null);
        }
      }
    };
    fetchUserTeamId();
  }, [user]);

  const handleAddTag = () => {
    if (inputTag.trim() !== '') {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleAddAssignee = async () => {
    if (inputAssignee.trim() !== '') {
      const usersQuery = query(collection(db, 'users'), where('email', '==', inputAssignee));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        setAssignees([...assignees, inputAssignee]);
        setInputAssignee('');
        setError('');
      } else {
        setError('User not found');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        tags,
        assignees,
        userId: user ? user.uid : null,
        teamId,
        createdAt: serverTimestamp(),
        status: 'todo',
      });
      onClose();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>Create New Card</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="What is the task?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <div className={styles.section}>
          <input
            type="text"
            placeholder="Add tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddTag} className={styles.addBtn}>+</button>
        </div>

        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.section}>
          <input
            type="text"
            placeholder="Assign person (email)"
            value={inputAssignee}
            onChange={(e) => setInputAssignee(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddAssignee} className={styles.addBtn}>+</button>
        </div>
          <div className={styles['errorfield']}>
          {error && <p className={styles.error}>{error}</p>}
          </div>

        <div className={styles.assignees}>
          {assignees.map((assignee, index) => (
            <div key={index} className={styles.assignee}>
              <span>{assignee}</span>
            </div>
          ))}
        </div>

        <button className={styles.doneBtn} onClick={handleSubmit}>Create Task</button>
      </div>
    </div>
  );
}

TaskCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TaskCreate;
