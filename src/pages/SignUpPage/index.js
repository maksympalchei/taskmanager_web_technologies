import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.css';

function SignUpPage(props) {
  const [formData, setFormData] = useState({
    login: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
  };

  return (
    <section className={cn(styles['sign-up-form'], props.className, 'sign-up-page')}>
      <div className={styles['form-header']}>
        <p className={styles['form-title']}>SIGN UP</p>
      </div>

      <form className={styles['form-content']} onSubmit={handleSubmit}>
        <div className={styles['input-group']}>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className={styles['input-field']}
            placeholder="Login"
          />

          <div className={styles['input-row']}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles['input-field1']}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles['input-field1']}
              placeholder="Last Name"
            />
          </div>

          <div className={styles['input-row']}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles['input-field1']}
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles['input-field1']}
              placeholder="Password again"
            />
          </div>

          <button type="submit" className={styles['submit-btn']}>
            <span className={styles['btn-text']}>Sign up</span>
          </button>
        </div>

        <Link to="/signin" className={styles['login-link']}>
          I have account
        </Link>
      </form>
    </section>
  );
}

SignUpPage.propTypes = {
  className: PropTypes.string,
};

export default SignUpPage;
