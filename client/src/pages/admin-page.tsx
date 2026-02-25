// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from '../api';
import { useState, useEffect } from 'react';
import { AdminCard } from '@/components/item-cards/AdminCard';
import { Modal } from '@/components/Modal'; //to use for denial feedback
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import type { LostItem } from '../types';

export function Admin() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [modalVis, setModalVis] = useState(false);
  const [body, setBody] = useState('');

  useEffect(() => {
    async function loadAllItems() {
      const itemData = await getApprovedItems("false");
      if (!itemData) return;
      itemData.sort(
        (d1, d2) =>
          new Date(d2.dateUploaded).getTime() -
          new Date(d1.dateUploaded).getTime(),
      ); //Orders items by posting date
      setItems(itemData);
      console.log(itemData);
    }
    loadAllItems();
  }, []);

  function handleApproval() {

  }

  function handleDenial() {
    setModalVis(true);
  }

  function handleFeedbackSubmit() {

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
            return <AdminCard item={item} ifApproved={() => handleApproval()} ifDenied={handleDenial}/>;
          })}
      </div>

      <Modal open={modalVis} onClose={() => setModalVis(false)}>
        <h2>Send Feedback to Original Poster</h2>
            <form onSubmit={handleFeedbackSubmit}>
                <div className="content">
                    <textarea
                        name="content"
                        placeholder="Write any questions or concerns regarding this item here."
                        onChange={(e) => setBody(e.target.value)}
                        maxLength={250}
                        required
                    />   
                </div>   
                <button type="submit">Send Feedback</button>
            </form>      
      </Modal>
    </>
  );
}
