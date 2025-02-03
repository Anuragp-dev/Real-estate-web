import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"

export const register = async (req, res) => {

    try {
        const { username, email, password, avatar } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                avatar
            }
        })


        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

}

// login

const login = async (res, req) => {

    const { email, password } = req.body


    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    // check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })


    if (!user) {
        res.status(401).json({ message: "Invalid credentials" })

    }
}