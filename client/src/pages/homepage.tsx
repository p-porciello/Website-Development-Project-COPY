// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from '../api';
import { changeColorScheme } from '@/components/changeColors';
import { useState, useEffect } from 'react';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { LostItem, User } from '../types';

export function Home() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [user, setUser] = useState<Partial<User>>({});

  useEffect(() => {
    async function loadAllItems() {
      const itemData = await getApprovedItems("true");
      if (!itemData) return;
      itemData.sort(
        (d1, d2) =>
          new Date(d2.dateUploaded).getTime() -
          new Date(d1.dateUploaded).getTime(),
      ); //Orders items by posting date
      const mostRecent = itemData.slice(0,5);
      setItems(mostRecent);
      console.log(mostRecent);

      const token = sessionStorage.getItem('User');
      if (!token) return;
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      console.log(`Homepage dark mode setting: ${decodedUser.darkMode}`)
      changeColorScheme(decodedUser.darkMode);
    }
    loadAllItems();
  }, []);

  return (
    <>
      <header>
        <h1>Hi, {user.firstName}!</h1>
      </header>
      <div className="homepage-header">
        <h2>
          Recently Lost
        </h2>
      </div>
        <div className="homepageRecentlyLost">
          {items.map((item, index) => {
            return <HomepageCard item={item} key={index}/>;
          })}
        </div>
      <div id="see-all-container">
        <Link to={'/lost-and-found'} id="seeAllButton">
          <button className="transparent-button" id="see-all">See all <i className="fas fa-chevron-right"></i></button>
        </Link>
      </div>
      <div className="homepage-header">
        <h2>Getting started?</h2>
      </div>
      <div id="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QOeb0_GFRLE?si=Ns3d3vbX2zkNNdL2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
