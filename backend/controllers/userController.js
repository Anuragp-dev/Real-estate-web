import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"

export const getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany()

        res.status(200).json(users)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const getUser = async (req, res) => {

    const id = req.params.id

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json(user)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


// update user info

export const updateUser = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId
    const { password, avatar, ...intputs } = req.body


    if (id !== tokenUserId) {
        return res.status(403).json({ message: "You can only update your own account" })
    }

    let updatedPassword = null

    // const {
    //     username,
    //     email,
    //     password,
    //     avatar
    // } = req.body

    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }

        const UpdateUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...intputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }

        })

        const { password: userPassword, ...rest } = UpdateUser

        res.status(200).json(rest)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

// delete user

export const deleteUser = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId


    if (id !== tokenUserId) {
        return res.status(403).json({ message: "You can only delete your own account" })
    }

    try {

        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })

        res.status(200).json(user)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


//save later
export const savePost = async (req, res) => {

    const postId = req.body.postId
    const tokenUserId = req.userId

    try {

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId
                }
            }
        })


        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    // userId_postId: {
                    id: savedPost.id,

                    // }
                }
            })

            return res.status(200).json({ message: "Post unsaved successfully" })

        } else {
            await prisma.savedPost.create({
                data: {

                    userId: tokenUserId,
                    postId,
                }
            })
            return res.status(200).json({ message: "Post  saved successfully" })
        }
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }



}


export const ProfilePosts = async (req, res) => {

    const tokenUserId = req.params.userId

    try {

        const userPosts = await prisma.post.findMany({
            where: {
                userId: tokenUserId
            }
        })

        const saved = await prisma.savedPost.findMany({
            where: {
                userId: tokenUserId
            },
            include: {
                post: true
            }
        })

        const savedPosts = saved.map((item) => item.post)

        res.status(200).json({ userPosts, savedPosts });

        // console.log(savedPosts)
        // console.log(userPosts)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}



// notification

export const getNotificationNumber = async (req, res) => {

    const tokenUserId = req.userId

    try {

        const number = await prisma.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId]
                    }
                }
            }

        })

        res.status(200).json(number)
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

}

