import { getSpecificItem, updateItem, getSpecificUser, updateInquiriesArray } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { SendClaimEmail } from '@/components/email';
import type { LostItem, User, Inquiry } from '../types';

export function ViewItem() {
  const [user, setUser] = useState<Partial<User>>({})

  const [item, setItem] = useState<Partial<LostItem>>({});
  const [body, setBody] = useState('');
  const [receiver, setReceiver] = useState<Partial<User>>({})
  const [itemInquiries, setInquiries] = useState<Inquiry[] | undefined>([])
  const [toId, setTo] = useState<string | undefined | Promise<string>>('');
  const [toName, setToName] = useState('');
  const [buttonText, setButtonText] = useState<string>('')
  const [placeholderText, setPlaceholder] = useState<string>('');

  const [update, setUpdate] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);

  let params = useParams();
  let id = params.id as string;
  const navigate = useNavigate();

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
      setTags([data.color, data.itemType, data.brand])

    }
    loadData();
  }, [update]); 

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
    //console.log(dateString)
    const newInquiry: Inquiry =  {
      inquirerId: `${user._id}`,
      inquirerName: `${user.firstName} ${user.lastName}`,
      //@ts-ignore
      receiverId: toId,
      receiverName: toName,
      dateSent: dateString,
      content: body
    }
    //console.log(`name being passed to updateInquiries(): ${toName}`)
    updateInquiriesArray(id, newInquiry)
    setBody('');
    //console.log(`inquiries = ${newInquiry.receiverName}`);
    setInquiries(item.inquiries);
    setTo('');
    setUpdate(update + 1);
  }


  return (
    <div id="view-specific-item">
    {/*console.log(`item.inquiries: ${item.inquiries}\nitemInquiries: ${itemInquiries}`)*/}
        <h1>{item.itemName}</h1>
        <div className="vsi-container">
          <img id="vsi-image" src={item.imgFileName}/>
          <div id="textInfo">
            <div className="vsi-info-box">
              <h3><b>Date Uploaded:</b> {item.dateUploaded?.substring(4, 15)}</h3>
            </div>
            <div className="vsi-info-box description">
              <h3><b>Description:</b></h3>
              <p>{item.description}</p>
            </div>
            <div className="vsi-info-box">
              <h3><b>Found At:</b> {item.schoolFoundIn}</h3>
            </div>
            <div className="vsi-info-box">
              <h3><b>Found By:</b> {`${receiver.firstName} ${receiver.lastName}`}</h3>
            </div>
            <div className="tagsContainer">
              {tags.map((tag, index) => {
                  if (tag && tag !== "N/A") {
                    return <div className="tag" key={index}>{tag}</div>
                  }
              })}
            </div>
          </div>
      </div>

        {(item.claimedBy) ? 
        (
        <div className="vsi-misc">
        <h2><i><b>This item has already been claimed.</b></i></h2>
        </div>)
        : 
        (<div className="buttonContainer">
        <button className="wide-button" onClick={(e) => {
          e.preventDefault();
          SendClaimEmail(user.email, user.firstName, item.itemName, item.currentLocation);
          handleClaim();
        }}>Claim this Item</button></div>)}

      <div className="vsi-misc">
        <h2>Ask for More Information</h2>
        <p>All additional information you ask from this item's original poster can be found below.  This information will only be visible to you and the poster.</p>
      </div>

      <div className="inquiriesContainer">
        {
        //@ts-ignore
        itemInquiries?.length > 0 ?
        (itemInquiries?.map((inquiry, index) => {
          if (user._id === inquiry.inquirerId || user._id === inquiry.receiverId) {
            return (
              <div className="inquiry" key={index}>
                <p><b>{inquiry.inquirerName}</b> <i>{inquiry.dateSent.substring(4)}</i></p>
                <p>to: {inquiry.receiverName}</p>
                <p>{inquiry.content}</p>

                <button className="replyButton" onClick={() => {
                  setTo(inquiry.inquirerId);
                  setToName(inquiry.inquirerName);
                  setPlaceholder(`Write your reply to ${inquiry.inquirerName} here.`);
                  setButtonText("Post Reply");
                }}>Reply</button>
              </div>
            );
        }})): <div className="vsi-misc no-inquiries-ms"><p>You haven't written any inquiries about this item.</p></div>}
      </div>
        {
          (toId !== '') ? 
            (<div className="submit-inquiries-container">
              <form onSubmit={(e) => {
                e.preventDefault();
                updateInquiries()}}>
                <textarea
                  name="inquiryForm"
                  placeholder={placeholderText}
                  onChange={(e) => setBody(e.target.value)}
                  maxLength={500}
                />
                <button type="submit">{buttonText}</button>
              </form>
            </div>)
          : (<div className="buttonContainer">
          <button className="wide-button" 
            onClick={() => {
              setTo(receiver._id);
              setToName(`${receiver.firstName} ${receiver.lastName}`)
              setPlaceholder("Write any questions or concerns regarding this item here.");
              setButtonText("Submit Inquiry")
            }}>Write an Inquiry</button></div>)
        }
    </div>
    
  );
}
