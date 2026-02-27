import { getQueriedItems, getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
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
      ); //Orders items by posting date
      setItems(itemData);
    }
    loadAllItems();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    let endpoint = `${URL}/lost-items/admin-approved`;
    if (e.target.value) {
      endpoint = `${URL}/lost-items/search/${e.target.value}`;
    }

    const response = await fetch(endpoint);
    const itemData: LostItem[] = await response.json();
    itemData.sort(
      (d1, d2) =>
        new Date(d2.dateUploaded).getTime() -
        new Date(d1.dateUploaded).getTime(),
    ); //Orders items by posting date

    setItems(itemData);
  };

  /*useEffect(() => {
        async function loadAllItems() {
            const defaultQuery = { query: "" };
            const itemData = await getQueriedItems(defaultQuery);
            itemData.sort((d1, d2) => new Date(d2.dateUploaded).getTime() - new Date(d1.dateUploaded).getTime());  //Orders items by posting date
            setItems(itemData)
        }
        loadAllItems()
    }, [])
    */

  return (
    <>
      <h1 className="barofcolor">Lost items catalog page</h1>
      <input
        type="text"
        placeholder="Search for an item..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="homepageRecentlyLost">
        {items.map((item) => {
          /*
                    let date = new Date(item.dateUploaded);
                    let stringDate = date.toString();
                    */
          return <CatalogueCard item={item} key={item.itemName}/>;
        })}
      </div>
    </>
  );
}
