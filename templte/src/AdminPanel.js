import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminPanel() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch data from the backend on component mount
    useEffect(() => {
        fetch('http://localhost:5100/viewuser')
            .then((res) => res.json())
            .then((fetchedData) => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    // Navigate to the edit page with the selected record
    const handleEdit = (id) => {
        navigate(`/admin/edit/${id}`);
    };

    // Delete record
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            fetch(`http://localhost:5100/viewuser/${id}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    if (res.ok) {
                        setData(data.filter(item => item.id !== id));
                        alert("Record deleted successfully!");
                    }
                })
                .catch((err) => {
                    console.error("Error deleting record:", err);
                });
        }
    };

    // Navigate to the homepage
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div className="admin-panel">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center">Admin Panel</h2>
                <button className="btn btn-success" onClick={goToHomePage}>
                    Go to Homepage
                </button>
                <Link to="/Admin_Add">
                    <button className="btn btn-info">Add New Data</button>
                </Link>
            </div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : data.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Bedrooms</th>
                            <th>Bathrooms</th>
                            <th>Area</th>
                            <th>Floor</th>
                            <th>Parking</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={item.imgSrc ? `${process.env.PUBLIC_URL}/${item.imgSrc}` : ''}
                                        alt="Listing"
                                        style={{ width: '100px' }}
                                    />
                                </td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.address}</td>
                                <td>{item.bedrooms}</td>
                                <td>{item.bathrooms}</td>
                                <td>{item.area}</td>
                                <td>{item.floor}</td>
                                <td>{item.parking}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No records found.</p>
            )}
        </div>
    );
}

export default AdminPanel;
