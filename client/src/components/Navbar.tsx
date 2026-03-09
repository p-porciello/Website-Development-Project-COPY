import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageData, adminPageData } from './pageData';
import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';

export function Navbar() {
  const [data, setData] = useState<{name: string, path: string}[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
      async function loadUserData() {
        const token = sessionStorage.getItem('User');
        if (!token) return;
        const decodedUser = jwtDecode<User>(token);
        if (decodedUser.role === "admin") {
          setData(adminPageData);
        } else {
          setData(pageData);
        }
      }
      loadUserData();
    }, []);

  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('User');
    navigate('/');
  }

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
  }

    return (
    <nav className="navbar">

      <div id="nav-buttons" className={clicked ? "#nav-buttons active": "#nav-buttons"
      }>
        {data.map((page) => {
          return (
            <Link to={page.path} className="navItem" key={page.name}>
              <button>{page.name}</button>
            </Link> 
          );
        })}
        <button onClick={handleLogout}>Log Out</button>
      </div>
    
      
      <div id="mobile" onClick={() => setClicked(!clicked)}>
        {clicked ? 
        <i className="fas fa-bars"></i>
        :
        <i className='fas fa-times'></i>
        }
      </div>
      
    
    </nav>
  );
}
