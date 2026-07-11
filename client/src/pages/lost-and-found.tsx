import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import type { LostItem } from '../types';
import { CatalogueCard } from '@/components/item-cards/CatalogueCard';
import { MasonryLayout } from '@/components/MasonryLayout';
import { Checkbox } from '@/components/checkbox';
import { itemTypes, itemColors, itemBrands } from '@/components/dropdownData';

export function LostAndFound() {
  const URL = 'http://localhost:8080';

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<LostItem[]>([]);
  const [colorMenuVisibility, setColorVisibility] = useState(false)
  const [typeMenuVisibility, setTypeVisibility] = useState(false)
  const [brandMenuVisibility, setBrandVisibility] = useState(false)


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
            <button className="filter-header" onClick={() => setColorVisibility(!colorMenuVisibility)}>Color {colorMenuVisibility ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}</button>
            {colorMenuVisibility ? 
              <div id="colors-menu" className="ops-menu">
                {itemColors.map((colorOption, index) => {
                  return (
                    <Checkbox label={colorOption} key={index}/>
                  )
                })}
              </div> 
              : <p></p>
            }
          </div>

          <div className="filter-menu">
            <button className="filter-header" onClick={() => setTypeVisibility(!typeMenuVisibility)}>Type {typeMenuVisibility ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}</button>
            {typeMenuVisibility ? 
              <div id="types-menu" className="ops-menu">
                {itemTypes.map((typeOption, index) => {
                  return (
                    <Checkbox label={typeOption} key={index}/>
                  )
                })}
              </div>
              : <p></p>
            }
          </div>

          <div className="filter-menu">
            <button className="filter-header" onClick={() => setBrandVisibility(!brandMenuVisibility)}>Brand {brandMenuVisibility ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}</button>
            {brandMenuVisibility ?
              <div id="types-menu" className="ops-menu">
                {itemBrands.map((brandOption, index) => {
                  return (
                    <Checkbox label={brandOption} key={index}/>
                  )
                })}
            </div>
            : <p></p>
            }
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
          
          <div id="catalogue-layout">
            <MasonryLayout>
              {items.map((item, index) => {
                return <CatalogueCard item={item} key={index}/>
              })}
            </MasonryLayout>
          </div>
        </div>

      </div>
    </>
  );
}
