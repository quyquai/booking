

import { useState } from 'react';
import classes from './Auth.module.css';
import { hasMinLength, isEmail, isNotEmpty, isPassword } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [err, setErr] = useState({
    username: '',
    fullName: '',
    password: '',
    phoneNumber: '',
  });

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

    if (!isNotEmpty(fullName)) {
      setErr({ fullName: 'Please enter the full name field' });
      return;
    }
    
    if (!isNotEmpty(phoneNumber)) {
      setErr({ phoneNumber: 'Please enter the phone number field' });
      return;
    }
    if (!hasMinLength(phoneNumber, 10)) {
      setErr({ phoneNumber: 'Phone number must be at least 10 digits long' });
      return;
    }

    const raw = JSON.stringify({
      username,
      password,
      email: username,
      fullName,
      phoneNumber,
      isAdmin: false
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: raw,
      redirect: 'follow',
    };

    async function fetchRegister() {
      try {
        const response = await fetch(
          'http://localhost:5000/users/register',
          requestOptions,
        );
        const data = await response.json();
        if (response.status === 201) {
          alert(data.message);
          navigate('/login');
        } else if (response.status === 400) {
          alert(data.message)
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchRegister();
  }

  return <form className={classes.form} onSubmit={submitHandler} noValidate>
    <h2 className={classes.title}>Sign Up</h2>
    <div className={classes.input}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" placeholder="User Name" />
      {err.username && <p className={classes.err}>{err.username}</p>}
    </div>
    <div className={classes.input}>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      {err.password && <p className={classes.err}>{err.password}</p>}
    </div>
    <div className={classes.input}>
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name" />
      {err.fullName && <p className={classes.err}>{err.fullName}</p>}
    </div>
    <div className={classes.input}>
      <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Phone Number" />
      {err.phoneNumber && <p className={classes.err}>{err.phoneNumber}</p>}
    </div>
    <div className={classes.actions}>
        <button type="submit">Create Account</button>
      </div>
  </form>
}