import { Link } from 'react-router-dom';
import type { LostItem } from '../../types';
import { getSpecificUser } from '@/api';
import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';

type AdminCardProps = {
    item: LostItem;
}

export function AdminCard({ item }: AdminCardProps) {
  
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
      <img src={item.imgFileName} />
      <h3><b>{item.itemName}</b></h3>
      <p>
        <b>Date Found: </b>
        {stringDate.substring(4, 15)}
      </p>
      <p>
        <b>Location Found: </b>
        {item.schoolFoundIn}
      </p>
      <p>
        <b>Found By: </b>
        {finderName}
      </p>
      {/*may need e.stopPropagation() on buttons*/}
    </Link>
  );
}
