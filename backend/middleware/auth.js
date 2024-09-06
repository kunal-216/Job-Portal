import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  const token = authHeader.split(' ')[1];

  try { 
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired, please login again', tokenExpired: true });
    } else {
      console.log(error);
      return res.status(403).json({ success: false, message: 'Token verification failed' });
    }
  }
};

export default authMiddleware;
