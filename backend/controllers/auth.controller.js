import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        let { fullname, username, gender, password, confirmPassword } = req.body;

        // Input validation
        if (!fullname || !username || !gender || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Define profile picture URL
        let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        let girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        let newUser = await User.create({
            fullname,
            username,
            gender,
            password: hashedPassword,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        generateTokenAndCookie(newUser._id,res)
        await newUser.save()
        res.status(201).json(newUser);

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const login = async (req,res)=>{
    try {
        let {username,password} = req.body;

        let user = await User.findOne({username})

        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if (!user && !isPasswordCorrect) {
            return res.status(400).json({ error: "Username or password is incorrect" });
        }

        generateTokenAndCookie(user._id,res);
        await user.save()
        res.status(201).json(user);
    } catch (error) {
        console.error("Error in login controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie('jwt','')
        res.status(201).json({message:'logout successfully'})
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}