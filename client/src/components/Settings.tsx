import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Settings() {

  const navigate = useNavigate();
  const [colorMode, setMode] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Enable dark mode');

  function changeColorScheme(darkMode: boolean) {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--light-bg', "#140929");
      root.style.setProperty('--text-color', "#fcfdff");
      root.style.setProperty('--primary', "#1932A1");
      root.style.setProperty('--secondary', "#4D59FF");
      root.style.setProperty('--accent', "#2002BA");
    } else {
      root.style.setProperty('--text-color', "#020114");
      root.style.setProperty('--primary', "#001448");
      root.style.setProperty('--secondary', "#7e87ff");
      root.style.setProperty('--accent', "#5058de");
      root.style.setProperty('--light-bg', '#fcfdff');
    }

    setMode(darkMode);
  }

  function changeButtonText() {
    if (colorMode) {
      setButtonText('Enable light mode')
    } else {
      setButtonText('Enable dark mode')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('User');
    navigate('/');
  }

  return (
    <div className="settings-container">
      <button onClick={() => {
        changeColorScheme(!colorMode);
        changeButtonText()}}>{buttonText}</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}