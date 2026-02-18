import { Link } from "react-router-dom";

export function LostItemCard({item}) {
        
    let date = new Date(item.dateUploaded);
        let stringDate = date.toString();

        return (
            <Link to={`/view-item/${item._id}`} className="item">
                <img src={item.imgFileName}/>
                <h3>{item.itemName}</h3>
                <p><b>Date Found: </b>{stringDate.substring(4,15)}</p>
                <p><b>Location Found: </b>{item.schoolFoundIn}</p>
                <p><b>Found By: </b>{item.postedBy}</p>
            </Link>
        )
}