import { LostItemCard } from '@/components/lostItemCard';
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
      <h1 className="barofcolor">User Profile Page</h1>
      <h2>
        {user.firstName} {user.lastName}
      </h2>

      <h3>Your Reported Items</h3>
      {postedItems.map((item) => {
        return <LostItemCard item={item} />;
      })}
    </>
  );
}
