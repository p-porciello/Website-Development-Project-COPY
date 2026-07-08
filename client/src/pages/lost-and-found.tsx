import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import type { LostItem } from '../types';
import { CatalogueCard } from '@/components/item-cards/CatalogueCard';
import { MasonryLayout } from '@/components/MasonryLayout';

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
      <div id="catalogue-content">

        <div id="filter-bar">
          <h2 className="no-bg">Filters</h2>
          <div className="filter-menu">
            <button className="filter-header">Color</button>
            <div id="colors-menu" className="ops-menu">
              <label><input type="checkbox" className="filter-option"/> Red</label>
              <label><input type="checkbox" className="filter-option"/> Orange</label>
              <label><input type="checkbox" className="filter-option"/> Yellow</label>
              <label><input type="checkbox" className="filter-option"/> Green</label>
              <label><input type="checkbox" className="filter-option"/> Blue</label>
              <label><input type="checkbox" className="filter-option"/> Purple</label>
              <label><input type="checkbox" className="filter-option"/> Black</label>
              <label><input type="checkbox" className="filter-option"/> White</label>
              <label><input type="checkbox" className="filter-option"/> Gray</label>
              <label><input type="checkbox" className="filter-option"/> Beige/Tan</label>
            </div>
          </div>
          <div className="filter-menu">
            <button className="filter-header" >Type</button>
              <div id="types-menu" className="ops-menu">
                <label><input type="checkbox" className="filter-option"/> Water bottle</label>
                <label><input type="checkbox" className="filter-option"/> Clothing</label>
                <label><input type="checkbox" className="filter-option"/> Technology</label>
                <label><input type="checkbox" className="filter-option"/> Accessory</label>
                <label><input type="checkbox" className="filter-option"/> Pencil/Pen</label>
            </div>
          </div>
          <div className="filter-menu">
            <button className="filter-header">Brand</button>
          </div>
        </div>

        <div>
            <div id="search-container">
              <h1 className="no-bg">All Lost Items</h1>
            
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
              { searchTerm ? <p>Showing <b>{items.length}</b> results for <b>"{searchTerm}"</b></p> : <p></p>}
              <p><b>Applied Filters: </b></p>
            </div>
          
          <MasonryLayout>
            {items.map((item, index) => {
              return <CatalogueCard item={item} key={index}/>
            })}
          </MasonryLayout>
        </div>

      </div>
    </>
  );
}
