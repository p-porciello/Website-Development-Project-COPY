import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageData, adminPageData } from './pageData';
import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { Settings } from './Settings';
import { Modal } from './Modal';

export function Navbar() {
  const [data, setData] = useState<{name: string, path: string}[]>([]);
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
              <button className="navbar-button">{page.name}</button>
            </Link> 
          );
        })}
        <button className="navbar-button" onClick={() => setModalVis(true)}><i className="fas fa-gear"></i></button>
      </div>
    
      
      <div id="mobile" onClick={() => setClicked(!clicked)}>
        {clicked ? 
        <i className="fas fa-times"></i>
        :
        <i className='fas fa-bars'></i>
        }
      </div>
      
    
    </nav>

    <Modal open={modalVis} onClose={() => setModalVis(false)}>
      <Settings/>
    </Modal>
    </>
  );
}
