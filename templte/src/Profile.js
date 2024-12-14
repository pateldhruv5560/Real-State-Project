import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './App.css';
import { table } from 'framer-motion/client';

function Profile() {
    const storageuser = JSON.parse(localStorage.getItem('user'))
    console.log(storageuser)

    const handlelogout = () => {
        localStorage.clear()
    }

    // for changing input

    const [edit, setEdit] = useState(true);

    const handleEdit = () => {
        setEdit(!edit);
    };



    // Edit Name,email,password


    const handlecompare = (e) => {

        fetch('http://localhost:3006/user')
            .then((response) => response.json())
            .then((Data) => {

                const user = Data.find(
                    (user) => user.id === storageuser.id
                );


            })

    };

    useEffect(() => {
        handlecompare();
    }, []);


    const [name, setname] = useState(storageuser.name);
    const [email, setemail] = useState(storageuser.email);
    const [password, setpassword] = useState(storageuser.password);

    const handleChange = (e) => {
        e.preventDefault();

        const updatedName = { ...storageuser, name, email, password };

        localStorage.setItem('user', JSON.stringify(updatedName));

        alert("Detailed Changed:");

        window.location.reload();
        setEdit(true);
    };


    return (
        <div className='profilcontainer'>
            <div className='leftprofile'>

            <img id='profileimg' src={storageuser.img} alt={"img not found"} 
            style={{ width: '20%', height: '36%' }} />

                <h1>Welcome {storageuser.name}</h1>
                <div className='leftemail'><h4>Email Address:-</h4><h5>{storageuser.email}</h5></div>
                <div className='leftpassword'><h4>Password:</h4><h4>{storageuser.password}</h4></div>




                {/* Logout Link */}
                <Link className='logout' to='/login' onClick={handlelogout}>LogOut</Link>

            </div>


            {/* Edit User */}

            <div className='rightprofile'>

            <h1>Edit User Profile</h1>

            <Button onClick={handleEdit}>
                {edit ? 'Edit' : 'Cancel'}</Button>

            <div>

                <form onSubmit={handleChange}>


                    {
                        !edit ? (
                            <>
                                <table align='center'>

                                    <tr>

                                        <td><label>Name:</label></td>
                                        <td> <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><label>Email:</label></td>
                                        <td> <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                                        </td> </tr>

                                    <tr>

                                        <td><label>Password:</label></td>
                                        <td><input type="text" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                        </td> </tr>

                                    <tr align='center'>

                                        <td></td>
                                        <td>
                                            <button type='submit'> Save</button>
                                        </td>

                                    </tr>

                                </table>
                            </>

                        ) : (

                            <table align='center'>


                                <tr >

                                    <td>Name:</td>

                                    <td>
                                        <h6 className='storename'>{storageuser.name}</h6>
                                    </td>

                                </tr>

                                <tr >

                                    <td>Email:</td>

                                    <td>
                                        <h6 className='storename'>{storageuser.email}</h6>
                                    </td>

                                </tr>

                                <tr >

                                    <td>Password:</td>

                                    <td>
                                        <h6 className='storename'>{storageuser.password}</h6>
                                    </td>

                                </tr>


                            </table>


                        )
                    }


                </form>

            </div>

            </div>

        </div>
    )
}

export default Profile;
