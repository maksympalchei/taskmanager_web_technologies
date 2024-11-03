import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './SignUpPage.module.css';
import useAuth from '../../hooks/useAuth';
import useFetchData from '../../hooks/useFetch';

function SignUpPage(props) {
  const [formData, setFormData] = useState({
    login: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const { register, error, loading } = useAuth();
  const { registerUser, createTeam, updateUser } = useFetchData('users');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    try {
      const user = await register(formData.login, formData.password, formData.firstName, formData.lastName);
      console.log('User registered:', user);

      await registerUser(user.uid, {
        email: formData.login,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'user',
        teamId: null,
      });
  
      const teamRef = await createTeam({
        ownerId: user.uid,
        name: `${formData.firstName}'s Team`,
      });
  
      await updateUser(user.uid, { teamId: teamRef.id });
  
      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
    }
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

          <button type="submit" className={styles['submit-btn']} disabled={loading}>
            <span className={styles['btn-text']}>{loading ? 'Signing Up...' : 'Sign Up'}</span>
          </button>
          {error && <p className={styles['error-text']}>{error}</p>}
        </div>

        <Link to="/signin" className={styles['login-link']}>
          I have an account
        </Link>
      </form>
    </section>
  );
}

SignUpPage.propTypes = {
  className: PropTypes.string,
};

export default SignUpPage;
