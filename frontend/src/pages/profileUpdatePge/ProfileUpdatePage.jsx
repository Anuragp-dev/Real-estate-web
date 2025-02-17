import React, { useState } from 'react'
import "./profileUpdatePage.scss"
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const ProfileUpdatePage = () => {
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState([]);
    const Navigate = useNavigate();

    const { updateUser, currentUser } = React.useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const response = await apiRequest.put(`/users/update_user/${currentUser.id}`, {
                username,
                email,
                password
            })
            updateUser(response.data);
            Navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit} >
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>error</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src="/noavatar.png" alt="" className="avatar" />
                {/* avatar[0] || currentUser?.avatar || */}
                {/* <UploadWidget
                    uwConfig={{
                        cloudName: "lamadev",
                        uploadPreset: "estate",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars",
                    }}
                    setState={setAvatar}
                /> */}
            </div>
        </div>
    );
}

export default ProfileUpdatePage