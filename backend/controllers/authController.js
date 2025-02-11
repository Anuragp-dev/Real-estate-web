import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

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

export const login = async (req, res) => {

    const { email, password } = req.body
    // console.log('email: ', email)


    try {

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

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Password" })
        }


        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: age
        })

        const {password:userPassword, ...userInfo} = user

        res
            .cookie("token", token, {
                httpOnly: true,
                // secure:true
                maxAge: age
            })
            .status(200)
            .json({ message: "Login successful" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "faild to login" })

    }
}

// logout
export const logout = (req, res) => {

    res.clearCookie("token")
        .status(200)
        .json({ message: "Logout successful" })
}