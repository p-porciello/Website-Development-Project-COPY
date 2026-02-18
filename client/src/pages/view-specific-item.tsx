import { getSpecificItem, updateItem } from '../api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { LostItem } from '../types';

export function ViewItem() {
  const [item, setItem] = useState<Partial<LostItem>>({});
  const [moreInfo, setMoreInfo] = useState('');

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    async function loadItem() {
      let data = await getSpecificItem(id);
      if (!data) return;
      let date = new Date(data.dateUploaded);
      data.dateUploaded = date.toString();
      setItem(data);
    }
    loadItem();
  }, []);

  async function handleClaim() {
    if (!id) return;
    let submitObject = {
      itemName: item.itemName,
      description: item.description,
      imgFileName: item.imgFileName,
      dateUploaded: item.dateUploaded,
      itemType: item.itemType,
      color: item.color,
      brand: item.brand,
      schoolFoundIn: item.schoolFoundIn,
      currentLocation: item.currentLocation,
      postedBy: item.postedBy,
      claimedBy: 'tempUser',
      adminApproved: item.adminApproved,
    };

    await updateItem(id, submitObject);
  }

  return (
    <>
      <h1>{item.itemName}</h1>
      <div id="dateUploadedBox">
        <h3>Date Uploaded:</h3>
        <p>{item.dateUploaded?.substring(4, 15)}</p>
      </div>
      <div id="descriptionBox">
        <h3>Description:</h3>
        <p>{item.description}</p>
      </div>
      <div id="itemTypeBox">
        <h3>Item Type:</h3>
        <p>{item.itemType}</p>
      </div>
      <div id="itemColorBox">
        <h3>Color:</h3>
        <p>{item.color}</p>
      </div>
      <div id="foundAtBox">
        <h3>Found At:</h3>
        <p>{item.schoolFoundIn}</p>
      </div>
      <div id="postedByBox">
        <h3>Found by:</h3>
        <p>{item.postedBy}</p>
      </div>
      <div>
        {item.claimedBy != null && item.claimedBy !== 'N/A' && (
          <div>
            <h2>This item has already been claimed.</h2>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClaim();
        }}
      >
        <button type="submit">Claim this Item</button>
      </form>

      <form>
        <div>
          <label>Ask any questions here: </label>
          <textarea
            name="more info"
            onChange={(e) => setMoreInfo(e.target.value)}
            maxLength={250}
            required
          />
        </div>
        <button type="submit">Request More Info Submit</button>
      </form>
    </>
  );
}
