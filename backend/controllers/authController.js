import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js'


// user registration
export const register = async(req, res) => {
    try {

        // hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: 'Successfully Created'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again.'
        })
    }
}

// user login
export const login = async(req, res) => {

    const email = req.body.email

    try {

        const user = await User.findOne({email})

        // if user doesn't exist
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        // if user exists then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        // if password is incorrect
        if(!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            })
        }

        const {password, role, ...rest} = user._doc

        // create jwt token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d'})

        // set token in the browser cookies and send the response to the client 
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            token,
            data: {
                ...rest
            },
            role
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to login'
        })
    }
    //test green
}

//send password reset ootp

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Invalid email' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      user.resetOtp = otp;
      user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await user.save();
  
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ success: true, message: 'OTP sent to your email' });
  
    } catch (error) {
      console.error('OTP sending error:', error); // ✅ log it
      return res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
  };
//reset user password

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success:false, message: 'Email,otp and Password require' });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success:false, message: 'User not found' });
        }

        if(user.resetOtp === "" || user.resetOtp !== otp) {
            return res.status(400).json({ success:false, message: 'Invalid OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = ""; // Clear the OTP after successful password reset
        user.resetOtpExpires = 0; // Clear the expiration time

        await user.save();

        return res.status(200).json({ success:true, message: 'Password reset successfully' });

    } catch (error) {
        
    }

}
