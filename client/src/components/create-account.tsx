import { createNewUser } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAccount() {
  const [userFirstName, setFirstName] = useState('');
  const [userLastName, setLastName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userSchool, setSchool] = useState('');
  const [userGrade, setGrade] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newUser = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      school: userSchool,
      grade: userGrade,
      bio: '',
      role: 'user',
      joinDate: new Date(),
      postedItems: [],
    };
    let response = await createNewUser(newUser);
    if (response.status !== 200) {
      console.log(response);
      alert('User account could not be created :(');
    } else {
      navigate('/');
    }
  }

  return (
    <>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
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
          <label>First Name: </label>
          <input
            name="emailAddress"
            onChange={(e) => setFirstName(e.target.value)}
            required
            max={50}
          ></input>
        </div>
        <div>
          <label>Last Name: </label>
          <input
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
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
        <div>
          <label>School: </label>
          <input
            name="school"
            onChange={(e) => setSchool(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Grade: </label>
          <input
            name="grade"
            onChange={(e) => setGrade(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </>
  );
}
