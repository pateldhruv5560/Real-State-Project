import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add_Admin() {
    const [imgSrc, setImgSrc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [area, setArea] = useState("");
    const [floor, setFloor] = useState("");
    const [parking, setParking] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            imgSrc,
            price,
            category,
            address,
            bedrooms,
            bathrooms,
            area,
            floor,
            parking,
        };

        fetch("http://localhost:5100/viewuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        })
            .then((res) => {
                if (res.ok) {
                    alert("New record added successfully!");
                    navigate("/admin");
                }
            })
            .catch((err) => {
                console.error("Error adding property:", err);
            });
    };

    return (
        <div>
            <h2>Add New Property</h2>
            <form onSubmit={handleSubmit}>
                <label>Image URL:</label>
                <input
                    type="text"
                    value={imgSrc}
                    onChange={(e) => setImgSrc(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label>Bedrooms:</label>
                <input
                    type="text"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                />
                <label>Bathrooms:</label>
                <input
                    type="text"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                />
                <label>Area:</label>
                <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <label>Floor:</label>
                <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                />
                <label>Parking:</label>
                <input
                    type="text"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                />
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
}

export default Add_Admin;
