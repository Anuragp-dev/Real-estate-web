import prisma from "../lib/prisma.js"






export const getChats = async (req, res) => {

    const tokenUserId = req.userId
    console.log('tokenUserId: ', tokenUserId);

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })

        for (const chat of chats) {


            console.log("Chat Data:", chat);

            // Check if userIDs exist
            if (!chat.userIDs || chat.userIDs.length === 0) {
                console.log("No userIDs found in chat:", chat.id);
                continue;
            }

            const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
            console.log('receiverId: ', receiverId);

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



export const addChat = async (req, res) => {

    try {

        const tokenUserId = req.userId

        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId]
            }
        })

        res.status(200).json(newChat)


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