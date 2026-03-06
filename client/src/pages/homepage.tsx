// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import type { LostItem } from '../types';

export function Home() {
  const [items, setItems] = useState<LostItem[]>([]);

  useEffect(() => {
    async function loadAllItems() {
      const itemData = await getApprovedItems("true");
      if (!itemData) return;
      itemData.sort(
        (d1, d2) =>
          new Date(d2.dateUploaded).getTime() -
          new Date(d1.dateUploaded).getTime(),
      ); //Orders items by posting date
      setItems(itemData);
      console.log(itemData);
    }
    loadAllItems();
  }, []);

  return (
    <>
    <body>
      <header>
        <h1> UCVTS Lost and Found </h1>
      </header>
      <div>
        <h2>
          Recently Lost
        </h2>
      </div>
      </body>
      <body>
        <div className="homepageRecentlyLost">
          {items.map((item) => {
            return <HomepageCard item={item} key={item.itemName}/>;
          })}
        </div>
        <Link to={'/lost-and-found'} id="seeAllButton">
          <button>See all</button>
        </Link>
      <div>
        <h2>Getting started?</h2>
        <p>[Youtube Video embed here]</p>
      </div>
      </body>
    </>
  );
}
