import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Admin_pannel_Edit() {
    const { detail } = useParams();
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [area, setArea] = useState('');
    const [floor, setFloor] = useState('');
    const [parking, setParking] = useState('');

    const styles = {
        adminPanel: {
            margin: '0px auto',
            Width: '100%',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: '20px 0',
        },
        th: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            fontSize: '16px',
        },
        td: {
            padding: '15px',
            textAlign: 'left',
            verticalAlign: 'middle',
            borderBottom: '1px solid #ddd',
        },
        img: {
            display: 'block',
            maxWidth: '80%',
            height: 'auto',
            borderRadius: '10px',
            margin: '0 auto',
        },
        input: {
            width: 'calc(100% - 20px)',
            padding: '10px',
            margin: '5px 0 15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            boxSizing: 'border-box',
        },
        label: {
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px',
            color: '#555',
        },
        button: {
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    useEffect(() => {
        if (!detail) {
            console.error("No ID provided in the URL");
            return;
        }
        fetch(`http://localhost:5100/viewuser`)
            .then((res) => res.json())
            .then((data) => {
                const property = data.find(item => item.id === detail);
                if (property) {
                    setPrice(property.price || '');
                    setImgSrc(property.imgSrc || '');
                    setCategory(property.category || '');
                    setAddress(property.address || '');
                    setBedrooms(property.bedrooms || '');
                    setBathrooms(property.bathrooms || '');
                    setArea(property.area || '');
                    setFloor(property.floor || '');
                    setParking(property.parking || '');
                } else {
                    console.error('Property not found');
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [detail]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { imgSrc, price, category, address, bedrooms, bathrooms, area, floor, parking };

        fetch(`http://localhost:5100/viewuser/${detail}`, {
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Record updated successfully!");
                    navigate('/admin');
                }
            })
            .catch((err) => {
                console.error("Error updating property:", err);
            });
    };

    return (
        <div style={styles.adminPanel}>
            <h2 style={styles.header}>Edit Property</h2>
            <form onSubmit={handleSubmit}>
                <table style={styles.table} align="center">
                    <thead>
                        <tr>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Details</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {imgSrc ? (
                                    <img src={`${process.env.PUBLIC_URL}/${imgSrc}`} alt="Property" style={styles.img} />
                                ) : (
                                    <p>No Image Available</p>
                                )}
                            </td>
                            <td>
                                <div>
                                    <label style={styles.label}>Price: </label>
                                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Category: </label>
                                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Address: </label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Bedrooms: </label>
                                    <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Bedrooms" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Bathrooms: </label>
                                    <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Bathrooms" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Area: </label>
                                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Floor: </label>
                                    <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Floor" style={styles.input} />
                                </div>
                                <div>
                                    <label style={styles.label}>Parking: </label>
                                    <input type="text" value={parking} onChange={(e) => setParking(e.target.value)} placeholder="Parking" style={styles.input} />
                                </div>
                            </td>
                            <td>
                                <button type="submit" style={styles.button}>Update</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Admin_pannel_Edit;
