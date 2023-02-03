const User = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
    // console.log(req.user);

            const users = await User.find({isDeleted : false}); 
            res.json({message:"success" , users});

};


const signUp = async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        const user =await User.findOne({email});
        if(!user){
            const newUser =await new User({name,email,password, role});
            newUser.save();
            res.status(StatusCodes.CREATED).json({message:"signup is success"})
        }else{
            res.json({message:"email is already exist"})
        }
    } catch (error) {
        res.json({message:"error" , error})
    }
}

const signIn = async (req, res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({ email});
        if(!user){
            res.status(StatusCodes.BAD_REQUEST).json({message:"email not found" }); 
        }else{
            // nt check 3al password
            const match = await bcrypt.compare(password, user.password);
            if(match){
                                   // bta5od al data
                 var token = jwt.sign({ _id: user._id, role: user.role}, 'shhhhh');
                // payload yo2sod beha al data 
                //var decoded = jwt.verify(token, 'shhhhh');
                res.status(StatusCodes.OK).json({
                    token,
                    user :{ 
                        id:user._id,
                        name:user.name,
                        email:user.email,
                    }
                });
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"password not correct" });
            }
        } 
    } catch (errors) {
        res.json({message:"errors" , ...errors});
        res.send("hello")
    }

}

const getUser = async (req, res) => {
    let{id} = req.params;
    try {
        const user = await User.findOne({_id : id})
        res.json({message:"success" , user})
    } catch (error) {
        res.json({message:"error" , error})
    }
}

const deleteUser = async (req,res)=>{
    const {_id}=req.params;
    try {
        await User.updateOne({_id},{isDeleted:true})
        res.json({message:"deleted success"});
    } catch (error) {
        res.json({message:"error" , error})
    }
}

const updateUser = async (req, res) => {
    let {id} = req.params;
    let {name} = req.body;
    try {
        const user = await User.updateOne({_id:id} , {name:name});
        res.json({message:"updated success",user});
    } catch (error) {
        res.json({message:"updated error"});
    }
}



module.exports = {
    getAllUsers,
    signUp,
    getUser,
    deleteUser,
    updateUser,
    signIn
}