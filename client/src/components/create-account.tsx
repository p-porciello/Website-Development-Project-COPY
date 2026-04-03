import { createNewUser } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { schools } from './dropdownData';

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
      profileImageName: 'src/assets/defaultProfilePicture.png',
      darkMode: false
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
    <div id="create-account" className="flex items-center justify-center">
      <form className="accountForm" onSubmit={handleSubmit}>
        
        <h2 className="account-form-header">Create a New Account</h2>
        <div className="account-form-input">
          <label>Email Address: </label>
          <input
            name="emailAddress"
            placeholder="jdoe@ucvts.org"
            onChange={(e) => setEmail(e.target.value)}
            required
            max={50}
          ></input>
        </div>

        <div className="account-form-input">
          <label>First Name (or Nickname): </label>
          <input
            name="emailAddress"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
            required
            max={50}
          ></input>
        </div>

        <div className="account-form-input">
          <label>Last Name: </label>
          <input
            name="lastName"
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
            required
            max={50}
          ></input>
        </div>

        <div className="account-form-input">
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
          <select aria-label="Select the school you go to for UI personalization!"
            name="itemType"
            className="tags-select"
            value={userSchool}
            onChange={(e) => setSchool(e.target.value)}>
              <option value="" selected disabled hidden></option>
              {schools.map((schoolOption, index) => {
                return (
                  <option value={schoolOption} key={index}>{schoolOption}</option>
                )
              })}
          </select>
        </div>

        <div>
          <label>Grade: </label>
          <input
            name="grade"
            onChange={(e) => setGrade(e.target.value)}
            required
          ></input>
        </div>

        <button type="submit" className="new-acc-button">Create Account</button>
      
      </form>
    </div>
  );
}
