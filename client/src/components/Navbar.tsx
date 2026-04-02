import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageData, adminPageData } from './pageData';
import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { Settings } from './Settings';
import { Modal } from './Modal';

import { changeColorScheme } from './changeColors';

export function Navbar() {
  const [user, setUser] = useState<Partial<User>>({})
  const [data, setData] = useState<{name: string, path: string, aria: string}[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [modalVis, setModalVis] = useState(false);

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
        
        for (const [key, value] of Object.entries(decodedUser)) {
          console.log(`${key}: ${value}`);
        }

        console.log(decodedUser.firstName);
        console.log(`darkMode: ${decodedUser.darkMode}`)
        changeColorScheme(decodedUser.darkMode)

        setUser(decodedUser);

      }
      loadUserData();
    }, []);

    return (
    <>
    <nav className="navbar">

      <div id="nav-buttons" className={clicked ? "#nav-buttons active": "#nav-buttons"
      }>
        {data.map((page) => {
          return (
            <Link to={page.path} className="navItem" key={page.name}>
              <button className="navbar-button" aria-label={page.aria}>{page.name}</button>
            </Link> 
          );
        })}
        <button className="navbar-button" onClick={() => setModalVis(true)} aria-label="Settings button.  Opens settings modal where users can toggle light and dark mode or log out."><i className="fas fa-gear"></i></button>
      </div>
    
      
      <div id="mobile" aria-label="Opens navbar on mobile devices" onClick={() => setClicked(!clicked)}>
        {clicked ? 
        <i className="fas fa-times"></i>
        :
        <i className='fas fa-bars'></i>
        }
      </div>
      
    
    </nav>

    <Modal open={modalVis} onClose={() => setModalVis(false)}>
      <Settings user={user}/>
    </Modal>
    </>
  );
}
