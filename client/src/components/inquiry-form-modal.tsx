import { createNewInquiry } from '../api';
import { useState } from 'react';

export function InquiryForm(visibility: string, userId: string, postedBy: string, itemName: string) {
    const[body, setBody] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let newInquiry = {
        inquirer: userId,
        receiver: postedBy,
        itemInquiring: itemName,
        dateUploaded: new Date(),
        content: body
        };
        let response = await createNewInquiry(newInquiry);
        if (response.status !== 200) {
        console.log(response);
        alert('Inquiry could not be created :(');
        }
    }

    return (
        <div className={`modal ${visibility}`}>
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <textarea
                        name="content"
                        placeholder="Write any questions or concerns regarding this item here"
                        onChange={(e) => setBody(e.target.value)}
                        maxLength={250}
                        required
                    />   
                </div>   
                <button type="submit">Send Inquiry</button>
            </form>
        </div>
    )
}