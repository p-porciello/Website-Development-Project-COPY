import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import type { LostItem } from '../types';
import { CatalogueCard } from '@/components/item-cards/CatalogueCard';

export function LostAndFound() {
  const URL = 'http://localhost:8080';

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<LostItem[]>([]);

  useEffect(() => {

    async function loadAllItems() {
      const itemData = await getApprovedItems("true");
      if (!itemData) return;

      itemData.sort(
        (d1, d2) =>
          new Date(d2.dateUploaded).getTime() -
          new Date(d1.dateUploaded).getTime(),
      ); 

      setItems(itemData);
    }

    loadAllItems();

  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {

    setSearchTerm(e.target.value);
    let endpoint = `${URL}/lost-items/admin-approved/true`;
    if (e.target.value) {
      endpoint = `${URL}/lost-items/search/${e.target.value}`;
    }
    console.log(endpoint)

    const response = await fetch(endpoint);
    const itemData: LostItem[] = await response.json();

    itemData.sort(
      (d1, d2) =>
        new Date(d2.dateUploaded).getTime() -
        new Date(d1.dateUploaded).getTime(),
    ); 

    setItems(itemData);
  };

  return (
    <>
      <h1>All Lost Items</h1>

      <div className="search">
        <i className="fas fa-search"></i>
        <input id="searchBar" aria-label="Searches for items based on name"
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={handleSearch}
          style ={{ backgroundImage: 'src/assets/search-ui-icon.png.webp', backgroundPosition: 'right', width:'50%'}}
        />
      </div>

      <div className="homepageRecentlyLost">
        {items.map((item, index) => {
          return <CatalogueCard item={item} key={index}/>;
        })}
      </div>
      
    </>
  );
}
