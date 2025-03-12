import React, { useContext } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js"

const Chat = ({ chats }) => {
    const [chat, setChat] = React.useState(null)
    console.log('Chat: ', chat);
    const { currentUser } = useContext(AuthContext);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest.get("/chats/" + id)
            console.log('res: ', res);
            setChat({ ...res?.data, receiver })
        } catch (error) {
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        try {
            const res = await apiRequest.post("/messages/add-message/" + chat.id, { text })
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
            e.target.reset()
        } catch (error) {
        console.log('error: ', error);
        }

    }


    return (
        <div className='chat'>
            <div className="messages">
                <h1>Message</h1>

                {chats?.map((item) => (

                    <div className="message" key={item.id}
                        style={{
                            backgroundColor: item.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
                        }}
                        onClick={() => handleOpenChat(item.id, item.receiver)}
                    >
                        <img src={item?.receiver?.avatar || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
                        <span>{item?.receiver?.username}</span>
                        <p>
                            {item.lastMessage}
                        </p>
                    </div>

                ))}
            </div>
            {chat && (<div className='chatBox'>
                <div className="top">
                    <div className="user">
                        <img src={chat?.receiver?.avatar || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
                        <span>{chat?.receiver?.username}</span>
                    </div>
                    <span className='close' onClick={() => setChat(null)}>x</span>
                </div>
                <div className="center">
                    {chat.messages.map((message) => (

                        <div className="chatMessage"

                            style={{
                                alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                textAlign: message.userId === currentUser.id ? "right" : "left"
                            }}

                            key={message.id}
                        >
                            <p>{message.text}</p>
                            <span>{format(message.createdAt)}</span>
                        </div>
                    ))

                    }

                </div>
                <form onSubmit={handleSubmit} className="bottom">
                    <textarea name='text' ></textarea>
                    <button>Send</button>
                </form>
            </div>
            )}
        </div>
    )
}

export default Chat