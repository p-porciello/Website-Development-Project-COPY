import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { useState, useEffect } from 'react';
import { getAllItems, updateUser } from '@/api';
import { jwtDecode } from 'jwt-decode';
import type { LostItem, User } from '@/types';
import { generateUploadDropzone } from '@uploadthing/react';
import { MasonryLayout } from '@/components/MasonryLayout';



export function Profile() {
  const UploadDropzone = generateUploadDropzone({
  url: 'http://localhost:8080/api/uploadthing',
});
  const [postedItems, setPostedItems] = useState<LostItem[]>([]);
  const [user, setUser] = useState<Partial<User>>({});
  const [image, setImage] = useState<string | undefined>('');

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem('User');
      if (!token) return;
      const decodedUser = jwtDecode<User>(token);
      const allItems = await getAllItems();
      if (!allItems) return;
      const filteredItems = allItems.filter(
        (item) => item.postedBy == decodedUser._id,
      );
      setPostedItems(filteredItems);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);


  async function handleProfileUpdate() {
    const id = user._id;
    if (!id) return;
    let submitObject = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      school: user.school,
      grade: user.grade,
      bio: user.bio,
      role: user.role,
      joinDate: user.joinDate,
      postedItems: user.postedItems,
      profileImageName: image,
    };

    let response = await updateUser(id, submitObject);
      if (response.status !== 200) {
          console.log(response);
          alert("Profile Picture Update Failed");
      } 
      else {
        window.location.reload();
    }
  }


  return (
    <>
      <h1 className="image-header"></h1>
      
      <div id="user-info-container">
        <img src={user.profileImageName} alt="Profile Image" id="profile-img"/>

        <div id="user-text-info">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p><i className="fa-solid fa-location-dot"></i> {user.school} • {user.grade}</p>
        </div>
      </div>

      <div id="profile-details">
        <div className="details-box" id="about-box">
          <h3>About {user.firstName}</h3>
          <p>{user.bio || "Paige is a UCVTS Lost & Found user."}</p>
        </div>

        <div className="details-box" id="stats-box">
          <div id="stats-nums">
            <h3>##</h3>
            <h3>##</h3>
            <h3>##</h3>
          </div>

          <div id="stats-text">
            <p>Item<br></br>Reports</p>
            <p>Reports Leading<br></br>to a Claim</p>
            <p>Items<br></br>Claimed</p>
          </div>
        </div>
      </div>

      <h2 className="homepage-header">Report Statuses</h2>
      <MasonryLayout>
        {postedItems.map((item) => {
          return <HomepageCard item={item} />;
        })}
      </MasonryLayout>
     





     {/*
     <h1 style={{padding:'2%', marginTop:'2%', marginBottom:'2%'}}>User Settings</h1>
      <div className="profileImage" style={{width: '50%', float: 'left' }}>
      <form onSubmit={handleProfileUpdate}>
           {
            image ? (
                    <div className="imgPreview">
                        <img id="preview" src={image}/>
                        <h4><i>Preview of your uploaded image</i></h4>
                    </div>
            ) : (
                <UploadDropzone className="upload-dz"
                endpoint="imageUploader" 
                //dropzone={{uploadAfterDrop: true}}
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const url = res?.[0]?.url;
                    setImage(url);
                    console.log("Completed upload of image with url ", image);
                  }
                }}/>
            )}
          <button type="submit" className="handleProfileUpdate">
            Change Profile Picture
          </button>
        </form>
      </div>
      */}
    </>
  );
}
