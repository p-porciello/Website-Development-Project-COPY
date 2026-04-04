// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from '../api';
import { changeColorScheme } from '@/components/changeColors';
import { useState, useEffect } from 'react';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { MasonryLayout } from '@/components/MasonryLayout';
import type { LostItem, User } from '../types';

export function Home() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [user, setUser] = useState<Partial<User>>({});
  const [displayNum, setDisplayNum] = useState<number>(Math.floor(window.innerWidth/305));

  const initialWidth = window.innerWidth;

  const navigate = useNavigate();

  useEffect(() => {
    //async function loadAllItems() {
      if (window.innerWidth == initialWidth) {
        async function loadAllItems() {
          console.log(window.innerWidth)
          const itemData = await getApprovedItems("true");
          if (!itemData) return;
          itemData.sort(
            (d1, d2) =>
              new Date(d2.dateUploaded).getTime() -
              new Date(d1.dateUploaded).getTime(),
          ); //Orders items by posting date
          const mostRecent = itemData.slice(0,Math.floor(window.innerWidth/305));
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

      } else {
        function displayItems(itemList: LostItem[]) {
          console.log(window.innerWidth)
          if (!itemList) return;
          itemList.sort(
            (d1, d2) =>
              new Date(d2.dateUploaded).getTime() -
              new Date(d1.dateUploaded).getTime(),
          ); //Orders items by posting date
          const mostRecent = itemList.slice(0, Math.floor(window.innerWidth/305));
          setItems(mostRecent);
        }

        displayItems(items);
      }
    }, [window.innerWidth]);

  /*useEffect(() => {
      async function displayItems(itemList: LostItem[]) {
        console.log(window.innerWidth)
        const itemData = await getApprovedItems("true");
        if (!itemData) return;
        itemData.sort(
          (d1, d2) =>
            new Date(d2.dateUploaded).getTime() -
            new Date(d1.dateUploaded).getTime(),
        ); //Orders items by posting date
        const mostRecent = itemList.slice(0,Math.floor(window.innerWidth/325));
        setItems(mostRecent);

      }
      displayItems(items);
  }, [window.innerWidth])*/

  return (
    <>
      <header className="image-header">
        <h1>Hi, {user.firstName}!</h1>
      </header>
      
      <h2 className="homepage-header">
          Recently Lost
      </h2>

      <MasonryLayout>
          {items.map((item, index) => {
            return <HomepageCard item={item} key={index}/>;
          })}
      </MasonryLayout>

      <div id="see-all-container">
        <Link to={'/lost-and-found'} id="seeAllButton">
          <button className="transparent-button" id="see-all">See all <i className="fas fa-chevron-right"></i></button>
        </Link>
      </div>

      <div className="actions-container">
          <div className="action-box">
            <h3>Getting Started?</h3>
            <p>Start by checking out your profile page!  There, you can customize your personal info, write a short bio to introduce yourself to other students, and view approval statuses of your reported items.</p>
            <button>See Your Profile</button>
          </div>

          <div className="action-box">
            <h3>Found an Item?</h3>
            <p>UCVTS lost and found exists to reunite owners with their lost items.  If you find anything, please take it to a school’s lost and found and submit it using the form here.</p>
            <button>Report an Item</button>
          </div>

          <div className="action-box">
            <h3>Need Help?</h3>
            <p>To learn more about this website and get guidance, visit the FAQ page or watch a <strong>YouTube tutorial video</strong> by Caitlin Sayah, one of the devs!</p>
            <button>Watch Video</button>
          </div>
      </div>

      {/*
      <div className="homepage-header">
        <h2>Getting started?</h2>
      </div>
      <div id="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QOeb0_GFRLE?si=Ns3d3vbX2zkNNdL2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      */}
    </>
  );
}
