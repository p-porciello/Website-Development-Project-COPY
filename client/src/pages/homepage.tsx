// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import { LostItemCard } from '../components/lostItemCard';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import type { LostItem } from '../types';

export function Home() {
  const [items, setItems] = useState<LostItem[]>([]);

  useEffect(() => {
    async function loadAllItems() {
      const itemData = await getApprovedItems();
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
      <header className="barofcolor">
        <h1> UCVTS Lost and Found </h1>
      </header>
      <div>
        <h2
          style={{
            backgroundColor: '#11adc5',
            marginRight: '200px',
            marginLeft: '200px',
          }}
        >
          Recently Lost
        </h2>
        <div className="homepageRecentlyLost">
          {items.map((item) => {
            /*
                            let date = new Date(item.dateUploaded);
                            let stringDate = date.toString();
                            */
            return <LostItemCard item={item} />;
          })}
        </div>
        <Link to={'/lost-and-found'} id="seeAllButton">
          <button>See all</button>
        </Link>
      </div>
      <div>
        <h2>Getting started?</h2>
        <p>[Youtube Video embed here]</p>
      </div>
    </>
  );
}
