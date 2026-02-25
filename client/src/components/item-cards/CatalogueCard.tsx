import { Link } from 'react-router-dom';
import type { LostItem } from '../../types';
import { getSpecificUser } from '@/api';
import { useState, useEffect } from 'react';

export function CatalogueCard({ item }: { item: LostItem }) {
  let uploadDate = new Date(item.dateUploaded);
  let currentDate = new Date(Date.now());
  const _WEEKMILLISEC = 604800000;
  let recentUpload: boolean = false;
  if (currentDate.getTime() - uploadDate.getTime() <= _WEEKMILLISEC) {
    recentUpload = true;
  }
  let stringDate = uploadDate.toString();  

  const [finderName, setFinderName] = useState('')
  const [tags, setTags] = useState<String[]>([]);

  useEffect(() => {
    async function loadFinder() {
      const finder = await getSpecificUser(item.postedBy);
      if (!finder) return;
      setFinderName(`${finder.firstName} ${finder.lastName}`);
      console.log(finderName);
      setTags([item.color, item.itemType, item.brand])
    }
    loadFinder();
  }, []);

{/*          {items.map((item) => {
            return <HomepageCard item={item} />;
          })} */}

          console.log(recentUpload)
  return (
    <Link to={`/view-item/${item._id}`} className="item">
      <img src={item.imgFileName} />
      {(recentUpload == true) ? <div className="recentUpload"><i>STAR ICON HERE</i> Recently Uploaded</div>: ""}
      <h3><b>{item.itemName}</b></h3>
      <div className="tagsContainer">
        {tags.map((tag) => {
            return <div className="tag">{tag}</div>
        })}
      </div>
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
    </Link>
  );
}