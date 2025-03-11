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
    const userId = req.userId

    try {

        const savedPost = await prisma.savedPost.create({
            where: {
                userId_postId: {
                    userId: userId,
                    postId
                }  
            }
        })


        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                }
            })
        } else {
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId
                }
            })
        }
        res.status(200).json({ message: "Post  saved successfully" })
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }



}