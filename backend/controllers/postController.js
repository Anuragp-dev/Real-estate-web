import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"



// export const getPosts = async (req, res) => {

//     try {
//         const query = req.query
//         const posts = await prisma.post.findMany(
//             {
//                 where: {
//                     city: query.city || "",
//                     type: query.type || undefined,
//                     property: query.property || undefined,
//                     bedroom: parseInt(query.bedroom) || undefined,
//                     price: {
//                         gte: parseInt(query.minPrice) || undefined,
//                         lte: parseInt(query.maxPrice) || undefined,
//                     },
//                 },
//             }
//         )

//         const token = req.cookies?.token;
//         let isSaved = false;

//         if (token) {
//             try {
//                 const payload = jwt.verify(token, process.env.JWT_SECRET);
//                 const saved = await prisma.savedPost.findUnique({
//                     where: {
//                         userId_postId: {
//                             postId: id,
//                             userId: payload.id,
//                         },
//                     },
//                 });
//                 isSaved = saved ? true : false;
//             } catch (err) {
//                 console.error("JWT verification failed:", err);
//             }
//         }



//         res.status(200).json(posts)

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Something went wrong" })
//     }
// }

// get post by id 

export const getPosts = async (req, res) => {
    try {
        const query = req.query;
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || "",
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                },
            },
        });

        const token = req.cookies?.token;
        let userId = null;

        if (token) {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                userId = payload.id;
            } catch (err) {
                console.error("JWT verification failed:", err);
            }
        }

        // If the user is logged in, check if each post is saved
        if (userId) {
            const postsWithSaveStatus = await Promise.all(
                posts.map(async (post) => {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                postId: post.id,
                                userId: userId,
                            },
                        },
                    });

                    return {
                        ...post,
                        isSaved: saved ? true : false,
                    };
                })
            );

            return res.status(200).json(postsWithSaveStatus);
        }

        // If user is not logged in, return posts with isSaved: false
        res.status(200).json(posts.map(post => ({ ...post, isSaved: false })));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


// get post by id

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                PostDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const token = req.cookies?.token;
        let isSaved = false;

        if (token) {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id,
                        },
                    },
                });
                isSaved = saved ? true : false;
            } catch (err) {
                console.error("JWT verification failed:", err);
            }
        }

        return res.status(200).json({ ...post, isSaved });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


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