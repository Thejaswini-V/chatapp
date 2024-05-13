const userModel= require("../Models/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const validator=require('validator')
const createToken=(_id)=>{
    const jwtkey=process.env.JWT_SECRET_KEY
    return jwt.sign({_id},jwtkey)
}
const registerUser=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email })
        if (user) return res.status(400).json("User Already exists")
        if (!name || !email || !password) return res.status(400).json("All fields are required")
        if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email")
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        user = new userModel({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        user.save()
        const token = createToken(user._id)
        res.status(200).json({ _id: user.id, name, email })
    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        let user = await userModel.findOne({ email })
        if (!user) return res.status(400).json("Invalid Email or password")
        const isValidPassword=await bcrypt.compare(password,user.password)
        if (!isValidPassword) return res.status(400).json("Invalid Email or password")
        const token = createToken(user._id)
        res.status(200).json({ _id: user.id, name:user.name, email })
    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
const findUser=async(req,res)=>{
    const userId=req.params.userId;
    try{
        const user=await userModel.findById(userId)
        res.status(200).json(user);


    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
const getUsers=async(req,res)=>{
    
    try{
        const users=await userModel.find()
        res.status(200).json(users);


    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
module.exports={registerUser,loginUser,findUser,getUsers}