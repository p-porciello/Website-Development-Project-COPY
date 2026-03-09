import { Navbar } from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from './Footer';

export function Layout() {
  const navigate = useNavigate();
  let user = sessionStorage.getItem('User');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
