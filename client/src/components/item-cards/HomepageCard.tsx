import { Link } from 'react-router-dom';
import type { LostItem } from '../../types';
import { getSpecificUser } from '@/api';
import { useState, useEffect } from 'react';

export function HomepageCard({ item }: { item: LostItem }) {
  let date = new Date(item.dateUploaded);
  let stringDate = date.toString();

  const [finderName, setFinderName] = useState('')

  useEffect(() => {
    async function loadFinder() {
      const finder = await getSpecificUser(item.postedBy);
      if (!finder) return;
      setFinderName(`${finder.firstName} ${finder.lastName}`);
      console.log(finderName);
    }
    loadFinder();
  }, []);

  return (
    <Link to={`/view-item/${item._id}`} className="item">
      <img src={item.imgFileName} alt={item.description}/>
      <h3 className="card-item-name"><b>{item.itemName}</b></h3>
      <div className="item-card-info">
        <p><i className="fas fa-user-circle"></i>
          <b> Found By: </b>
          {finderName}
        </p>
        <p><i className="fas fa-calendar"></i>
          <b> Date Found: </b>
          {stringDate.substring(4, 15)}
        </p>
        <p><i className="fas fa-map-marker-alt"></i>
          <b> Location Found: </b>
          {item.schoolFoundIn}
        </p>
      </div>
    </Link>
  );
}
