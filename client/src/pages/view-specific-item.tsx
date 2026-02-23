import { getSpecificItem, updateItem, getSpecificUser, createNewInquiry } from '../api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { jwtDecode } from 'jwt-decode';
import type { LostItem, User } from '../types';

export function ViewItem() {
  const [user, setUser] = useState<Partial<User>>({})

  const [item, setItem] = useState<Partial<LostItem>>({});
  const [modalVis, setModalVis] = useState(false);
  const [body, setBody] = useState('');
  const [receiver, setReceiver] = useState<Partial<User>>({})

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    async function loadData() {
      let data = await getSpecificItem(id);
      if (!data) return;
      let date = new Date(data.dateUploaded);
      data.dateUploaded = date.toString();
      setItem(data);

      const token = sessionStorage.getItem('User');
      if (!token) return;
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);

      const finder = await getSpecificUser(item.postedBy);
      if (!finder) return;
      setReceiver(finder);

    }
    loadData();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let newInquiry = {
          inquirer: `${user.firstName} ${user.lastName}`,
          receiver: `${receiver.firstName} ${receiver.lastName}`,
          itemInquiring: item.itemName,
          dateUploaded: new Date(),
          content: body
      };
      let response = await createNewInquiry(newInquiry);
      if (response.status !== 200) {
          console.log(response);
          alert('Inquiry could not be created :(');
      }
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
        <button onClick={() => setModalVis(true)}>Request More Info</button>
      <Modal open={modalVis} onClose={() => setModalVis(false)}>
        <h2>Request More Information from Reporter</h2>
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <textarea
                        name="content"
                        placeholder="Write any questions or concerns regarding this item here."
                        onChange={(e) => setBody(e.target.value)}
                        maxLength={250}
                        required
                    />   
                </div>   
                <button type="submit">Send Inquiry</button>
            </form>      
      </Modal>

      {/*<form>
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
      </form> */}
    </>
  );
}
