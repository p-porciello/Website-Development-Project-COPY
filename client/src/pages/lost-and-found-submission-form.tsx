import { useState, useEffect } from 'react';
import { createNewItem } from '../api';
import { Input } from '@/components/ui/input';
import { jwtDecode } from 'jwt-decode';
import { generateUploadDropzone } from '@uploadthing/react';
import type { User, Inquiry } from '../types';
const UploadDropzone = generateUploadDropzone({
  url: 'http://localhost:8080/api/uploadthing',
});

export function SubmitLostItem() {
  const [user, setUser] = useState<Partial<User>>({});

  const [image, setImage] = useState<string | undefined>('');
  const [lostItemName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [schoolFound, setSchoolFound] = useState('');
  const [schoolIn, setSchoolIn] = useState('');
  const [type, setItemType] = useState('');
  const [itemColor, setColor] = useState('');
  const [itemBrand, setBrand] = useState('');
  const [itemInquiries, setInquiries] = useState<Inquiry[]>([])

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem('User');
      if (!token) return;
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(itemInquiries);
    let submitObject = {
      itemName: lostItemName,
      description: description,
      imgFileName: image,
      dateUploaded: new Date(),
      itemType: type,
      color: itemColor,
      brand: itemBrand,
      schoolFoundIn: schoolFound,
      currentLocation: schoolIn,
      postedBy: user._id, //null --> temp value
      claimedBy: null,
      adminApproved: false,
      inquiries: itemInquiries
    };
    console.log(submitObject);
    try {
      await createNewItem(submitObject);
      alert('Item reported successfully!');
    } catch (error) {
      console.error('Failed to submit item:', error);
      alert('Failed to report item. Please try again.');
    }
  }

  return (
    <>
      {/* <head> <link href="filepond.css" rel="stylesheet" /></head> */}
      {/* <body className="containerBlue vertical"> */}
      <h1 className="mb-4">Report a Lost Item</h1>
      <form className="lostItemForm" onSubmit={handleSubmit}>
        {/*<h1>Report a Lost Item</h1>*/}
        {/*<h2>Details</h2>*/}
        <div className="itemImage">
          <UploadDropzone 
          endpoint="imageUploader" 
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const url = res?.[0]?.url;
              setImage(url);
              console.log("Completed upload of image with url ", image);
            }
          }}/>
        </div>
        <div className="itemName">
          <label>Item Name: </label>
          <Input
            name="itemName"
            onChange={(e) => {
              setName(e.target.value);
              console.log(lostItemName);
            }}
            maxLength={50}
            required
          />
        </div>
        <div className="description">
          <textarea
            name="description"
            placeholder="Write a description"
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
            required
          />
        </div>
        <button className="generateText">Generate Description</button>
        <div className="locationInfo">
          <div className="buildingFound">
            <label>Building Item was Found In: </label>
            <Input
              name="schoolFoundIn"
              onChange={(e) => setSchoolIn(e.target.value)}
              required
            />
          </div>
          <div className="currentLocation">
            <label>Current Building Item is In: </label>
            <Input
              name="currentLocation"
              onChange={(e) => setSchoolFound(e.target.value)}
              required
            />
          </div>
        </div>
        <h2 className="tags"> Add Tags</h2>
        <div className="tagsContent">
          <div>
            <label>Item Type: </label>
            <Input
              name="itemType"
              onChange={(e) => setItemType(e.target.value)}
            />
          </div>
          <div>
            <label>Color: </label>
            <Input name="color" onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <label>Brand: </label>
            <Input
              name="brand"
              onChange={(e) => setBrand(e.target.value)}
              maxLength={25}
            />
          </div>
        </div>
        <button type="submit" className="reportItem">
          Report Item
        </button>
      </form>
      {/* </body> */}
    </>
  );
}
