import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { useState, useEffect } from 'react';
import { getAllItems, updateUser } from '@/api';
import { jwtDecode } from 'jwt-decode';
import type { LostItem, User } from '@/types';
import { generateUploadDropzone } from '@uploadthing/react';



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
      <h1>User Profile Page</h1>
      <body>
      <div style={{ textAlign: 'left', padding: '10px', width: '50%', float: 'left' }}>
        <img src={'src/assets/defaultProfilePicture.png'}
          style={{ height: '150px', width: '150px', borderRadius: '50%', border: '2px solid #001524', objectFit: 'cover' }}
          />
       
      </div>

      <div style={{ textAlign: 'left', padding: '10px', width: '50%', float: 'right' }}>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.email}</p>
        <p>{user.school}</p>
        <p>{user.grade}</p>
        <p>{user.bio}</p>
      </div>

      <h3 style = {{textAlign: 'center'}}>Your Reported Items</h3>
      <div className="homepageRecentlyLost">
        {postedItems.map((item) => {
          return <HomepageCard item={item} />;
        })}
      </div>
      <h1>User Settings</h1>
      <div className="profileImage" style={{width: '50%', float: 'left' }}>
        <form onSubmit={handleProfileUpdate}>
          <UploadDropzone 
            endpoint="imageUploader" 
            onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const url = res?.[0]?.url;
              setImage(url);
              console.log("Completed upload of image with url ", image);
            }
            }}/>
          <button type="submit" className="handleProfileUpdate">
            Change Profile Picture
          </button>
        </form>
      </div>
      </body>
    </>
  );
}
