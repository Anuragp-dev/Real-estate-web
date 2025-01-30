import React from 'react'
import List from '../../components/list/list'

const ProfilePage = () => {
    return (
        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update Profile</button>
                        <div className="info">
                            <span>
                                Avatar:
                                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                            </span>
                            <span>Username: John Doe</span>
                            <span>Email: 2p8yM@example.com</span>
                        </div>
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

                </div>
            </div>

        </div>
    )
}

export default ProfilePage