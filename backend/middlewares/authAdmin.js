import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authAdmin = async (req, res, next) => {
    try {
        const { aToken } = req.headers;

        if (!aToken) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }
        
        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET_KEY);
        
        if (token_decode !== process.env.Admin_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Not authorized. Login again" });
        }
        
        next();  // Proceed if token is valid

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default authAdmin;
