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
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadFinder() {
      const finder = await getSpecificUser(item.postedBy);
      if (!finder) return;
      setFinderName(`${finder.firstName} ${finder.lastName}`);
      //console.log(finderName);
      setTags([item.color, item.itemType, item.brand])
    }
    loadFinder();
  }, []);

{/*          {items.map((item) => {
            return <HomepageCard item={item} />;
          })} */}

          //console.log(recentUpload)
  return (
    <Link to={`/view-item/${item._id}`} className="item">
      {(recentUpload == true) ? 
        <div className="recentUpload"><i className="fas fa-hourglass-start"></i><p>Recently Reported</p></div>: ""
      }
      <img src={item.imgFileName} alt={item.description}/>
      <h3 className="card-item-name"><b>{item.itemName}</b></h3>
      <div className="tagsContainer">
        {tags.map((tag, index) => {
            if (tag && tag !== "N/A") {
              return <div className="tag" key={index}>{tag}</div>
            }
        })}
      </div>
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