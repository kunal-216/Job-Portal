import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req,res,next) => {
  const {token} = req.headers
  if(!token){
      return res.json({success:false,message:"Not Authorised Login Again"})
  }
  try {
      const token_decode = jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId = token_decode.id
      next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired, please login again', tokenExpired: true });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Malformed token, please login again' });
    } else {
      console.log(error);
      return res.status(403).json({ success: false, message: 'Token verification failed' });
    }
  }
};

export default authMiddleware;
