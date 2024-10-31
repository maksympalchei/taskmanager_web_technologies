import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function TaskCreate({ onClose }) {
  const [tags, setTags] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [inputAssignee, setInputAssignee] = useState('');

  const handleAddTag = () => {
    if (inputTag.trim() !== '') {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleAddAssignee = () => {
    if (inputAssignee.trim() !== '') {
      setAssignees([...assignees, inputAssignee]);
      setInputAssignee('');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>Create New Card</h2>

        <textarea
          placeholder="What is the task?"
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
            placeholder="Assign person"
            value={inputAssignee}
            onChange={(e) => setInputAssignee(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddAssignee} className={styles.addBtn}>+</button>
        </div>

        <div className={styles.assignees}>
          {assignees.map((assignee, index) => (
            <div key={index} className={styles.assignee}>
              <span>{assignee}</span>
            </div>
          ))}
        </div>

        <button className={styles.doneBtn} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

TaskCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TaskCreate;
