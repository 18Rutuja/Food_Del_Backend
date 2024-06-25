import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

  // Extract the token from the Authorization header
  const {token}= req.headers;
  
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Please login again." });
  }

  try {
   
    const token_decode  = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; 
    next(); 
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid token. Please login again." });
  }
};

export default authMiddleware;