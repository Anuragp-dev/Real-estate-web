export const getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany()

        res.status(200).json(users)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}