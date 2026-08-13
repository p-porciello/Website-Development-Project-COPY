import { useState, useEffect } from 'react';
import { createNewItem } from '../api';
import { Input } from '@/components/ui/input';
import { jwtDecode } from 'jwt-decode';
import { generateUploadDropzone } from '@uploadthing/react';
import { useNavigate } from 'react-router-dom';
import type { User, Inquiry } from '../types';
import { itemTypes, itemColors, itemBrands } from '@/components/dropdownData';
import { Checkbox } from '@/components/checkbox';

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

  const navigate = useNavigate();

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
      console.log('Item reported successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Failed to submit item:', error);
      alert('Failed to report item. Please try again.');
    }
  }

  return (
    <>

      <h1 className="mb-4">Report a Lost Item</h1>
      <form className="lostItemForm" onSubmit={handleSubmit}>

        <div className="itemImage">
          {
            image ? (
                    <div className="imgPreview">
                        <img id="preview" src={image}/>
                        <div className="previewText"><i className="fas fa-image"></i><p>Preview</p></div>
                    </div>
            ) : (
                <UploadDropzone className="upload-dz"
                endpoint="imageUploader" 
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const url = res?.[0]?.url;
                    setImage(url);
                    console.log("Completed upload of image with url ", image);
                  }
                }}/>
            )}
        </div>

        <div id="submission-form-text-info">

          <div className="itemName">
            <h2 className="no-bg">Item Name: </h2>
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

          <h2 className="no-bg" id="submission-tags-label">Tags</h2>
          <p><i>Adding tags based on physical properties of this item may make it easier for someone searching for it to find it on the main catalogue page.</i></p>

          <div className="tagsContent">

            <div className="tags-select-container">
              <select aria-label="Select a type that best describes this item"
                name="itemType"
                className="tags-select"
                value={type}
                onChange={(e) => setItemType(e.target.value)}>
                  <option value="" selected disabled hidden>Item Type</option>
                  {itemTypes.map((typeOption, index) => {
                    return (
                      <option value={typeOption} key={index}>{typeOption}</option>
                    )
                  })}
              </select>
            </div>

            <div className="tags-select-container">
              <select aria-label="Select a color that best describes this item's appearance"
                name="itemColor"
                className="tags-select"
                value={itemColor}
                onChange={(e) => setColor(e.target.value)}>
                  <option value="" selected disabled hidden>Color</option>
                  {itemColors.map((colorOption, index) => {
                    return (
                      <option value={colorOption} key={index}>{colorOption}</option>
                    )
                  })}
              </select>          
            </div>

            <div className="tags-select-container">
              <select aria-label="If this item is from a recognizable brand, select that brand below"
                name="itemBrand"
                className="tags-select"
                value={itemBrand}
                onChange={(e) => setBrand(e.target.value)}>
                  <option value="" selected disabled hidden>Brand</option>
                  {itemBrands.map((brandOption, index) => {
                    return (
                      <option value={brandOption} key={index}>{brandOption}</option>
                    )
                  })}
              </select>   
            </div>

          </div>

          <div className="locationInfo">
            <div className="location-info-box">
              <h2 className="no-bg">Building Found At: </h2>
              <Input
                name="schoolFoundIn"
                onChange={(e) => setSchoolIn(e.target.value)}
                required
              />
            </div>

            <div className="location-info-box">
              <h2 className="no-bg">Current Location: </h2>
              <Input
                name="currentLocation"
                onChange={(e) => setSchoolFound(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="description">
            <textarea
              name="description"
              placeholder="Be descriptive!"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
              required
            />
          </div>
          
          <div id="valuable-checkbox-container">
            <Checkbox 
            label="Valuable?"/>
          </div>

          <button type="submit" className="reportItem">
            Report Item
          </button>

        </div>

      </form>
    </>
  );
}
