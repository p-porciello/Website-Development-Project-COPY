import { getSpecificItem, updateItem, getSpecificUser, createNewInquiry, updateInquiriesArray } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { jwtDecode } from 'jwt-decode';
import { SendClaimEmail } from '@/components/email';
import type { LostItem, User, Inquiry } from '../types';
import { NewInquiry } from '@/CreateInquiry';

export function ViewItem() {
  const [user, setUser] = useState<Partial<User>>({})

  const [item, setItem] = useState<Partial<LostItem>>({});
  const [modalVis, setModalVis] = useState(false);
  const [body, setBody] = useState('');
  const [receiver, setReceiver] = useState<Partial<User>>({})
  const [itemInquiries, setInquiries] = useState<Inquiry[] | undefined>([])
  const [to, setTo] = useState('');

  let params = useParams();
  let id = params.id as string;
  const navigate = useNavigate();
  const testInquiries: Inquiry[] | undefined = item.inquiries

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

      const finder = await getSpecificUser(data?.postedBy);
      if (!finder) return;
      setReceiver(finder);
      setInquiries(data.inquiries)
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
      claimedBy: user._id,
      adminApproved: item.adminApproved,
      inquiries: item.inquiries
    };

    let response = await updateItem(id, submitObject);
    if (response.status !== 200) {
        console.log(response);
        alert('Item could not be claimed :(');
    } else {
      navigate('/map');
    }
  }

  async function updateInquiries() {
    const date: Date = new Date()
    const dateString: string = date.toDateString();
    console.log(dateString)
    const newInquiry: Inquiry =  {
      inquirerId: `${user._id}`,
      receiverId: `${receiver._id}`,
      dateSent: dateString,
      content: body
    }
    updateInquiriesArray(id, newInquiry)
    setBody('');
    console.log(`inquiries = ${item.inquiries}`);
    setInquiries(item.inquiries);
  }

  async function getName(id: string) {
    const targetUser = await getSpecificUser(id);
    return `${targetUser.firstName} ${targetUser.lastName}`
  }

  return (
    <>
    {console.log(`item.inquiries: ${item.inquiries}\nitemInquiries: ${itemInquiries}`)}
      <h1>{item.itemName}</h1>
      <img src={item.imgFileName}/>
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
        <p>{`${receiver.firstName} ${receiver.lastName}`}</p>
      </div>
      <div>
        {item.claimedBy != null && item.claimedBy !== 'N/A' && (
          <div>
            <h2>This item has already been claimed.</h2>
          </div>
        )}
      </div>
      
        <button onClick={(e) => {
          e.preventDefault();
          SendClaimEmail(user.email, user.firstName, item.itemName, item.currentLocation);
          handleClaim();
        }}>Claim this Item</button>

      <h2>Ask for More Information</h2>
      <p>All additional information you ask from this item's original poster can be found below.  This information will only be visible to you and the poster.</p>
      <div className="inquiriesContainer">
        {//@ts-ignore
        itemInquiries?.length > 0 ?
        (itemInquiries?.map((inquiry, index) => {
          if (user._id === inquiry.inquirerId || user._id === inquiry.receiverId) {
          return (
              <div className="inquiry" key={index}>
                <b>{inquiry.inquirerId}</b> <i>{inquiry.dateSent.substring(4)}</i>
                <p>to: {inquiry.receiverId}</p>
                <p>{inquiry.content}</p>
              </div>
            );
        }})): <p>You haven't written any inquiries about this item.</p>}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateInquiries()}}>
        {/*}
        {(user._id === receiver._id) ? (
          <select onChange={(e) => {setTo(e.target.value)}}>
            {itemInquiries?.map((inquiry, index) => {
            return (
                <option key={index}>{inquiry.inquirerId}</option>
              );
        })}
          </select>
        ): <p></p>}
        */}
        <textarea
          name="inquiryForm"
          placeholder="Write any questions or concerns regarding this item here."
          onChange={(e) => setBody(e.target.value)}
          maxLength={500}
        />
        <button type="submit">Submit Inquiry</button>
      </form>
    </>
  );
}
