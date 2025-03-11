import prisma from "../lib/prisma.js"






export const getChats = async (req, res) => {

    const tokenUserId = req.userId

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })

        for (const chat of chats) {

            const receiverId = chat.userIDs.find((id) => id !== tokenUserId)

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            })

            chat.recever = receiver
        }

        res.status(200).json(chats)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong getChats" })
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



export const addChat = async (req, res) => {

    try {

        const tokenUserId = req.userId

        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.userId]
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