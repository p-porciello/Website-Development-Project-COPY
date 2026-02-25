import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { useState, useEffect } from 'react';
import { getAllItems } from '@/api';
import { jwtDecode } from 'jwt-decode';
import type { LostItem, User } from '@/types';

export function Profile() {
  const [postedItems, setPostedItems] = useState<LostItem[]>([]);
  const [user, setUser] = useState<Partial<User>>({});

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

  return (
    <>
      <div style={{backgroundColor: '#11adc5'}}>
      <h1>User Profile Page</h1>
      </div>
      <div style={{ textAlign: 'left', padding: '10px', width: '50%', float: 'left' }}>
        <img 
          src={'/goose.jpg'} 
          style={{ height: '150px', width: '150px', borderRadius: '50%', border: '2px solid #001524', objectFit: 'cover' }}
          />
      </div>
      <div style={{ textAlign: 'right', padding: '10px', width: '50%', float: 'right' }}>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      </div>

      <h3 style = {{textAlign: 'center'}}>Your Reported Items</h3>
      {postedItems.map((item) => {
        return <HomepageCard item={item} />;
      })}
    </>
  );
}
