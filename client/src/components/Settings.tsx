import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { changeColorScheme } from "./changeColors";
import { User } from "@/types";
import { updateModePref } from "@/api";

interface Props {
  user: Partial<User>;
}

export function Settings({user}: Props) {

  const navigate = useNavigate();
  const [colorMode, setMode] = useState<boolean>(user.darkMode || false)
  const [buttonText, setButtonText] = useState<string>('Enable dark mode');

  async function handlePrefChange(newMode: boolean) {
    if (!user._id) return;
    let submitObject = {
      darkMode: newMode
    };

    let response = await updateModePref(user._id, submitObject);
    if (response.status !== 200) {
        console.log(response);
        alert('Mode could not be changed');
    } 

    console.log("test");
  }
  
  function changeButtonText() {
    if (colorMode) {
      setButtonText('Enable dark mode')
    } else {
      setButtonText('Enable light mode')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('User');
    navigate('/');
  }

  return (
    <div className="settings-container">
      <h2 id="settings-header">Settings</h2>
      <button className="settings-button" aria-label="toggles light and dark mode" onClick={() => {
        changeColorScheme(!colorMode);
        handlePrefChange(!colorMode);
        setMode(!colorMode);
        console.log(`darkMode after settings change: ${user.darkMode}`)
        changeButtonText()}}>{buttonText}</button>
      <button className="settings-button" aria-label="Logs out user and redirects them to landing page" onClick={handleLogout}>Log Out</button>
    </div>
  )
}