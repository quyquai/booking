import { useState } from 'react';
import { hasMinLength, isNotEmpty, isPassword } from '../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import classes from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState({ username: '', password: '' });

  const { login } = useAuth(AuthProvider);

  function loginSubmitHandler(e) {
    e.preventDefault();

    if (!isNotEmpty(username)) {
      setErr({ username: 'Please enter the username field' });
    }
    if (!hasMinLength(username, 3)) {
      setErr({ username: 'Username must be at least 3 characters long' });
      return;
    }

    if (!isNotEmpty(password)) {
      setErr({ password: 'Please enter the password field' });
      return;
    }
    if (!isPassword(password)) {
      setErr({
        password:
          'Password must be between 8 and 16 characters long and can contain letters, numbers, and special characters (!@#$%^&*)',
      });
      return;
    }

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: raw,
      redirect: 'follow',
    };

    async function fetchLogin() {
      try {
        const response = await fetch(
          'http://localhost:5000/admin/login',
          requestOptions,
        );
        const result = await response.json();
        if (response.status === 200) {
          //  setUser(result.payload.user);
          alert(result.message);
          login();
          navigate('/');
        } else if (response.status === 400) {
          alert(result.message);
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchLogin();
  }
  return (
    <form className={classes.form} onSubmit={loginSubmitHandler}>
      <h2 className={classes['form-title']}>Login</h2>
      <div className={classes['form-input']}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="User Name"
        />
        {err.username && <p className={classes.err}>{err.username}</p>}
      </div>
      <div className={classes['form-input']}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {err.password && <p className={classes.err}>{err.password}</p>}
      </div>
      <div className={classes.actions}>
        <button type="sunmit">Login</button>
      </div>
      <Link to="/register">Create an account?</Link>
    </form>
  );
}
