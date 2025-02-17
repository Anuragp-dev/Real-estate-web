import React, { useContext } from 'react'
import List from '../../components/list/list'
import './profilePage.scss'
import Chat from '../../components/chat/chat'
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
    const Navigate = useNavigate()
    const { updateUser, currentUser } = useContext(AuthContext);

    const handleLogout = async () => {

        try {

            const response = await apiRequest.post("/auth/logout")
            localStorage.removeItem("user")
            updateUser(null);
            Navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </span>
                        <span>Username: <b>John Doe</b></span>
                        <span>Email: <b> johnDoe@.com</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="title">
                        <h1>My List</h1>
                        <button>Create New List</button>
                    </div>
                    <List />

                    <div className="title">
                        <h1>Saved List </h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>

        </div>
    )
}

export default ProfilePage