import prisma from "../lib/prisma.js"






export const getChats = async (req, res) => {

    const tokenUserId = req.userId
    // console.log('tokenUserId: ', tokenUserId);

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })

        for (const chat of chats) {


            // console.log("Chat Data:", chat);

            // Check if userIDs exist
            if (!chat.userIDs || chat.userIDs.length === 0) {
                continue;
            }

            const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

            // console.log("receiverId:", receiverId); // Check the receiverId

            if (!receiverId) {
                console.log("Receiver ID is undefined for chat:", chat.id);
                continue;
            }

            // console.log('receiverId: ', receiverId)

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            })

            // console.log('receiver: ', receiver);
            chat.receiver = receiver
        }

        res.status(200).json(chats)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Failed to get chats!" })
    }
}


export const getChat = async (req, res) => {

    try {
        const tokenUserId = req.userId

        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }

            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where: {
                id: req.params.id
            },
            data: {
                seenBy: {
                    push: [tokenUserId]
                }
            }
        })

        res.status(200).json(chat)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong get chat" })
    }
}


// add chat with chat id 
export const addChat = async (req, res) => {

    try {

        const tokenUserId = req.userId
        const { receiverId } = req.body;


        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        // Check if a chat between these users already exists
        const existingChat = await prisma.chat.findFirst({
            where: {
                userIDs: {
                    hasEvery: [tokenUserId, receiverId]
                }
            }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);

        } else {
            
            const newChat = await prisma.chat.create({
                data: {
                    userIDs: [tokenUserId, receiverId],
                }
            })
            return res.status(200).json(newChat)
        }

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}






export const readChat = async (req, res) => {

    try {
        const tokenUserId = req.userId

        const chat = await prisma.user.update({

            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },

            data: {
                seenBy: {
                    push: tokenUserId
                }
            }

        })

        res.status(200).json(chat)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}




// export const getUsers = async (req, res) => {

//     try {


//         res.status(200).json(users)

//     } catch (error) {

//         console.log(error)
//         res.status(500).json({ message: "Something went wrong" })
//     }
// }