import { verifyUser } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignIn() {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let existingUser = {
      email: userEmail,
      password: userPassword,
    };
    let res = await verifyUser(existingUser);
    //console.log(res);
    if (res) {
      navigate('/home');
      sessionStorage.setItem('User', res);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res}`;
    } else {
      alert(
        'Login failed.  Make sure you entered your email and password correctly and with proper casing.',
      );
    }
  }

  return (
    <div id="sign-in">
      <form className="accountForm" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <div>
          <label>Email Address: </label>
          <input
            name="emailAddress"
            onChange={(e) => setEmail(e.target.value)}
            required
            max={50}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            max={30}
          ></input>
        </div>
        <button type="submit" className="new-acc-button">Sign In</button>
      </form>
    </div>
  );
}
