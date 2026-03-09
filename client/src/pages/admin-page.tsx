// import { Navbar } from '../components/Navbar'
import { getApprovedItems, updateItem, deleteSpecificItem, getSpecificUser } from '../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { Modal } from '@/components/Modal'; //to use for denial feedback
import { jwtDecode } from 'jwt-decode';
import { SendAdminFeedbackEmail } from '@/components/email';
import type { LostItem, User } from '../types';

import { ApprovalButton } from '@/components/AdminButtons';

export function Admin() {
  const [user, setUser] = useState<Partial<User>>({});
  const [items, setItems] = useState<LostItem[]>([]);
  const [modalVis, setModalVis] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [reason, setReason] = useState('');
  const [specificItem, setSpecificItem] = useState<Partial<LostItem>>({});
  const [update, setUpdate] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const itemData = await getApprovedItems("false");
      if (!itemData) return;
      itemData.sort(
        (d1, d2) =>
          new Date(d2.dateUploaded).getTime() -
          new Date(d1.dateUploaded).getTime(),
      ); //Orders items by posting date
      setItems(itemData);
      console.log(itemData);

      const token = sessionStorage.getItem('User');
      if (!token) return;
      const decodedUser = jwtDecode<User>(token);
      let role = decodedUser.role;
      if (role !== "admin") {
        navigate("/home")
      }
    }
    loadData();
  }, [update]);

  async function handleApproval(item: LostItem) {
    const id = item._id;
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
      claimedBy: item.claimedBy,
      adminApproved: true,
    };

    let response = await updateItem(id, submitObject);
    if (response.status !== 200) {
        console.log(response);
        alert("Item approval didn't go through :(");
    } else {
      setUpdate(update + 1); //reloads items seen on admin's end
    }
  }

  async function handleDenial(item: Partial<LostItem>, rejReason: string, feedback: string) {
    //console.log(item._id)
    let originalPoster:User = await getSpecificUser(item.postedBy);
    SendAdminFeedbackEmail(originalPoster.email, originalPoster.firstName, item.itemName, rejReason, feedback)
    deleteSpecificItem(item._id); //test other stuff before putting this back in
    setModalVis(false);
    window.location.reload();
  }

  return (
    <>
      <div style={{backgroundColor: '#11adc5'}}>
        <header>
          <h1>To Be Reviewed</h1>
        </header>
        </div>
        <div className="homepageRecentlyLost">
          {items.map((item) => {
            return (
            <div className="itemBox" key={item._id}>
              <HomepageCard item={item}/>
              <button onClick={() => handleApproval(item)}>Approve</button>
              <button onClick={() => {
                setFeedback('');
                setSpecificItem(item);
                setModalVis(true);}}>Deny</button>
            </div>
            )
          })}
      </div>

      <Modal open={modalVis} onClose={() => setModalVis(false)}>
        <h2>Send Feedback to Original Poster</h2>
            {/*<form onSubmit={handleFeedbackSubmit}>*/}
                <h3>Rejection Reason:</h3>
                <div className="rejectionReason">
                    <select 
                      name="reason"
                      id="reason-select"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required>
                        <option value="Poor quality/mismatched photo">Poor Quality/Mismatched Photo</option>
                        <option value="Inappropriate/mismatched name">Inappropriate/Mismatched Name</option>
                        <option value="Inappropriate/unhelpful description">Inappropriate/unhelpful description</option>
                        <option value="Item already found">Item was already found</option>
                    </select>
                </div>
                <h3>Feedback for Original Reporter</h3>
                <div className="feedbackContainer">
                    <textarea id="feedback-box"
                        name="feedback"
                        value={feedback}
                        placeholder="Write any questions or concerns regarding this item here."
                        onChange={(e) => setFeedback(e.target.value)}
                        maxLength={250}
                        required
                    />   
                </div>   
                <button onClick={() => handleDenial(specificItem, reason, feedback)}>Send Feedback</button>
            {/*</form>*/}   
      </Modal>
    </>
  );
}
