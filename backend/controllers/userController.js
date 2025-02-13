import prisma from "../lib/prisma"

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

    const { 
        username,
        email,
        password,
        avatar
    } = req.body

    try {

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username,
                email,
                password,
                avatar
            }
        })

        res.status(200).json(user)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

// delete user

export const deleteUser = async (req, res) => {

    const id = req.params.id

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