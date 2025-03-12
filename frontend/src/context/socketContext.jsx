import { createContext, useEffect, useState } from "react";
import {io} from "socket.io-client"

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));

    }, [currentUser]);

    return (
        <SocketContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </SocketContext.Provider>
    )
}