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

    return (
    <div className="navbar">
      {data.map((page) => {
        return (
          <Link to={page.path} className="navItem" key={page.name}>
            <button>{page.name}</button>
          </Link> 
        );
      })}
      <button onClick={handleLogout}>Log Out</button>

    {/*
    <div id="mobile" onClick={() => setClicked(!clicked)}>
      {clicked ? 
      <i className="fas fa-bars"></i>
      :
      <i className='fas fa-times'></i>
      }
    </div>
    */}
    </div>
  );
}
