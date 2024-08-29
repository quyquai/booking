import { useContext, useState } from 'react';
import classes from './Auth.module.css';
import { isEmail, isNotEmpty, isPassword } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState({
    username: '',
    password: '',
  });

  const { setUser } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isNotEmpty(username)) {
      setErr({ username: 'Please enter the username field' });
      return;
    }

    if (!isEmail(username)) {
      setErr({ username: 'Please enter a valid username (@example.com)' });
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
      const response = await fetch(
        'http://localhost:5000/users/login',
        requestOptions,
      );
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        setUser(data.user);
        navigate('/');
      } else {
        alert(data.message);
      }
    }

    fetchLogin();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2 className={classes.title}>Login</h2>
      <div className={classes.input}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          placeholder="User Name"
        />
        {err.username && <p className={classes.err}>{err.username}</p>}
      </div>
      <div className={classes.input}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {err.password && <p className={classes.err}>{err.password}</p>}
      </div>
      <div className={classes.actions}>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
