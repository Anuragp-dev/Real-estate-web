import prisma from "../lib/prisma.js"



export const getPosts = async (req, res) => {

    try {
        const posts = await prisma.post.findMany()

        res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

// get post by id 

export const getPost = async (req, res) => {

    try {

        const id = req.params.id

        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                PostDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        })

        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const addPost = async (req, res) => {


    try {

        const body = req.body
        const tokenUserId = req.userId

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,

                PostDetail: {
                    create: body.PostDetail,
                }
            },
        })

        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const updatePost = async (req, res) => {

    try {

        const id = req.params.id
        const tokenUserId = req.userId
        const body = req.body


        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "You can only update your own post" })
        }

        const updatedPost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                ...body
            }
        })

        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const deletePost = async (req, res) => {

    try {

        const id = req.params.id
        const tokenUserId = req.userId


        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "You can only update your own post" })
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id,
            }
        })

        res.status(200).json(deletedPost)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}