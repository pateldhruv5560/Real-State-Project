import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Viewuser() {
    const { detail} = useParams(); // Get viewId from the route
    const [imgSrc, setImgSrc] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [area, setArea] = useState('');
    const [floor, setFloor] = useState('');
    const [parking, setParking] = useState('');

    useEffect(() => {
       
        fetch(`http://localhost:5100/viewuser/${detail}`)
            .then((res) => res.json())
            .then((data) => {
            setPrice(data.price)
            setImgSrc(data.imgSrc)
            setCategory(data.category)
            setAddress(data.address)
            setBedrooms(data.bathrooms)
            setBathrooms(data.bathrooms)
            setArea(data.area)
            setFloor(data.floor)
            setParking(data.parking)
    })
           
    }, [detail]);

    return (
        <div>

            <h2>House Details</h2>
            <div>
                <h2>ID: {detail}</h2>
                <img 
                    src={window.location.origin + '/' + imgSrc} 
                    alt="Property"
                    style={{ width: '400px', height: '300px' }}
                    onError={(e) => (e.target.src = '/assets/images/default-image.jpg')} // Fallback
                />

                <h3>Category: {category}</h3>
                <p style={{color:'red',fontSize:'17px',fontFamily:'monospace'}}>Price: {price}</p>
                <p>Address: {address}</p>
                <p>Bedrooms: {bedrooms}</p>
                <p>Bathrooms: {bathrooms}</p>
                <p>Area: {area}</p>
                <p>Floor: {floor}</p>
                <p>Parking: {parking}</p>
            </div>
        </div>
    );
}

export default Viewuser;
