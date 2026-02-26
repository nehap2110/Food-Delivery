import jwt from 'jsonwebtoken'

export const checkAuth = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({ success: false, message: "Invalid Token" })
    }
   
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = token_decode.id; 
        next()
    } catch (error) {
        console.log("error in checkauth ", error);
        res.status(400).json({ success: false, message: error.message });
    }

}
