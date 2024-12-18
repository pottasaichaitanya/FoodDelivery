import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


//Log In User
const loginUser = async (req, res) => {
    const {email,password}=req.body
    const user = await userModel.findOne({ email });
    try {
        if (!user) {
            return res.json({ success: false, message:"User Doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (! isMatch) {
            return res.json({ success: false, message:"InCorrect Password" })
        }
        const token=createToken(user._id)
        res.json({success:true,token})
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }
}
// create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {

        //checking user already exist or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })

    }
}

export { loginUser, registerUser }