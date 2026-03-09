import { Modal } from "./Modal";
import { getApprovedItems, updateItem, deleteSpecificItem, getSpecificUser } from '../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomepageCard } from '@/components/item-cards/HomepageCard';
import { jwtDecode } from 'jwt-decode';
import { SendAdminFeedbackEmail } from '@/components/email';
import type { LostItem, User } from '../types';

type buttonProps = {
    item: LostItem;
    click?: () => void;
}

export function ApprovalButton({ item, click }: buttonProps) {
    const [user, setUser] = useState<Partial<User>>({});
    const [items, setItems] = useState<LostItem[]>([]);
    const [modalVis, setModalVis] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [reason, setReason] = useState('');
    const [specificItem, setSpecificItem] = useState<Partial<LostItem>>({});
    const [update, setUpdate] = useState<number>(0);

    const navigate = useNavigate();

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

    return (
        <button onClick={() => {
            handleApproval(item)
            {click}}
        }>Approve</button>
    )
}