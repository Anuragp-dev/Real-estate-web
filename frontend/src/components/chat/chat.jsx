import React, { useContext } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js"

const Chat = ({ chats }) => {
    const [Chat, setChat] = React.useState(null)
    const { currentUser } = useContext(AuthContext);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chat/" + id)
            setChat(...res.data, receiver)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {

        const formData = new FormData(e.target);
        const text = formData.get("text");
        try {
            const res = await apiRequest.post("/messages/" + Chat.id, { text })
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
            e.target.reset()
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='chat'>
            <div className="messages">
                <h1>Message</h1>

                {chats.map((item) => (

                    <div className="message" key={item.id}
                        style={{
                            backgroundColor: item.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
                        }}
                        onClick={() => handleOpenChat(item.id, item.receiver)}
                    >
                        <img src={item.receiver.avatar || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
                        <span>{item.receiver.username}</span>
                        <p>
                            {item.message}
                        </p>
                    </div>

                ))}
            </div>
            {Chat && (<div className='chatBox'>
                <div className="top">
                    <div className="user">
                        <img src={Chat.receiver.avatar || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
                        <span>{Chat.receiver.username}</span>
                    </div>
                    <span className='close' onClick={() => setChat(null)}>x</span>
                </div>
                <div className="center">
                    {Chat.messages.map((message) => (

                        <div className="chatMessage"

                            style={{
                                alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                textAlign: message.userId === currentUser.id ? "right" : "left"
                            }}

                            key={message.id}
                        >
                            <p>{message.text}</p>
                            <span>1 hour ago</span>
                        </div>
                    ))

                    }

                    <div className="chatMessage"

                    >
                        <p>leojfjfd.kfjdskfjjdsfkdsjfkdjk</p>
                        <span>{format(message.createdAt)}</span>
                    </div>
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