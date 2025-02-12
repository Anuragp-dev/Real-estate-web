import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = (req, res, next) => {

    const token = req.cookies.token

    if (!token){
        return res.status(401).json({ message: "Not Authenticated!" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {

        if (err){
            return res.status(403).json({ message: "Token is not valid!" })
        }

        res.status(200).json({ message: "Authenticated!" })
    })
}

export  const shouldBeAdmin = (req, res, next) => {

    const token = req.cookies.token

    if (!token){
        return res.status(401).json({ message: "Not Authenticated!" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {

        if (err){   
            return res.status(403).json({ message: "Token is not valid!" })
        }

        if (payload.isAdmin === false){
            return res.status(403).json({ message: "You are not an admin!" })
        }

    })
}