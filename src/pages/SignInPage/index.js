import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

function SignInPage(props) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data submitted:', formData);
  };

  return (
    <section className={cn(styles['authentication-form'], props.className, 'sign-in-page')}>
      <div className={styles['form-header']}>
        <h2 className={styles['form-title']}>SIGN IN</h2>
      </div>

      <form className={styles['form-content']} onSubmit={handleSubmit} style={{ paddingTop: '50px' }}>
        <div className={styles['indicator-primary']}>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className={styles['input-field']}
            placeholder="Login"
          />
        </div>

        <div className={styles['indicator-secondary']}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles['input-field']}
            placeholder="Password"
          />
        </div>

        <button type="submit" className={styles['submit-btn']}>
          <span className={styles['btn-label']}>Sign In</span>
        </button>

        <div className={styles['register-link']}>
          <Link to="/signup">I don’t have an account</Link>
        </div>
      </form>
    </section>
  );
}

SignInPage.propTypes = {
  className: PropTypes.string,
};

export default SignInPage;
