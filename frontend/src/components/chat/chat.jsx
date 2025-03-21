import React, { useContext, useEffect, useRef } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js"
import { SocketContext } from '../../context/socketContext';
import { useNotificationStore } from '../../lib/notificationStore';

const Chat = ({ chats, isMessage, chatId, receiverId }) => {
    console.log('chatId: ', chatId);
    console.log('receiverId: ', receiverId);
    const [chat, setChat] = React.useState(null)
    console.log('chat: ', chat);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const decrease = useNotificationStore((state) => state.decrease);
    const formRef = useRef(); // Create a ref for the form


    const messageEndRef = useRef()

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat])

    useEffect(() => {
        if (!isMessage) {

            handleOpenChat(chatId, receiverId)
        }
    }, [chats,])

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest.get("/chats/" + id)
            console.log('res: ', res);
            if (!res?.data?.seenBy?.includes(currentUser.id)) {
                decrease()
            }
            setChat({ ...res?.data, receiver })
        } catch (error) {
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        if (!text) return;
        try {
            const res = await apiRequest.post("/messages/add-message/" + chat.id, { text })
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
            e.target.reset()

            console.log('res: ', res);
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data

            })
        } catch (error) {
            console.log('error: ', error);
        }

    }

    useEffect(() => {

        const read = async () => {
            try {
                await apiRequest.put("/chats/read/" + chat.id)
            } catch (error) {
                console.log(error)
            }
        }



        if ((chat && socket)) {
            socket.on("getMessage", (data) => {
                console.log('data: ', data);
                if (chat.id === data.chatId) {
                    setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }))
                    read()
                }
            })
        }
        return () => {
            socket.off("getMessage");
        };
    }, [socket, chat])


    return (
        <div className='chat'>
            {isMessage
                && (<div className="messages">
                    <h1>Message</h1>

                    {chats?.map((item) => (

                        <div className="message" key={item.id}
                            style={{
                                backgroundColor: item.seenBy.includes(currentUser.id) || chat?.id === item?.id ? "white" : "#fecd514e",
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
                )}
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
                    ))}

                    <div ref={messageEndRef}></div>

                </div>
                <form ref={formRef} onSubmit={handleSubmit} className="bottom">
                    <textarea
                        name="text"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // Prevents new line in textarea
                                formRef.current.requestSubmit(); // Properly submits the form
                            }
                        }}
                    ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
            )}
        </div>
    )
}

export default Chat