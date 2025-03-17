import React, { Suspense, useContext } from 'react'
import List from '../../components/list/list'
import './profilePage.scss'
import Chat from '../../components/chat/chat'
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
// import Card from '../../components/card/card';

const ProfilePage = () => {
    const data = useLoaderData();
    // console.log('data: ', data);
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
                            <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
                        </span>
                        <span>
                            Username: <b>{currentUser.username}</b>
                        </span>
                        <span>
                            E-mail: <b>{currentUser.email}</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/new-post">
                            <button>Create New Post</button>
                        </Link>
                    </div>

                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) => <List posts={postResponse.data.userPosts} />}
                        </Await>
                    </Suspense>

                    <div className="title">
                        <h1>Saved List </h1>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.chatResponse}
                            errorElement={<p>Error loading chats!</p>}
                            >
                            {(chatResponse) => <Chat chats={chatResponse.data} isMessage={true} />}
                        </Await>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage