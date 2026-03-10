import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = (req, res, next) => {
  //const authHeader = req.headers.authorization || req.headers.token;
 // const authHeader = req.headers.token;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "No token provided" });
  // }

  //const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  const token  = req.headers.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.userRole === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Admins only" });
  }
};
