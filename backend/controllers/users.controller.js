import Users from '../models/users.js';
import jwt from 'jsonwebtoken';

export const getUsers = async(req,res)=>{
    try{
        const users = await Users.find();
        const formattedData = users.map((credentials)=>({
            username:credentials.username,
            password:credentials.password
        }))
        res.json(formattedData);
    }catch(err){
        res.status(404).json({message:'Unable to fetch users'});
    }
}

export const postUsers = async(req,res)=>{
    try{
        const users = new Users(
            {
                username:req.body.username,
                password:req.body.password
            }
        )
        const savedUsers = await users.save();
        res.status(201).json(
            {
                username:savedUsers.username,
                password:savedUsers.password,
            }
        );
    }catch(err){
        res.status(404).json({message:'Unable to post new user'});
    }
}

export const checkUser = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await Users.findOne({username});

        if(!user){
            return res.status(401).json({message:'User not found'});
        }

        if(user.password != password){
            return res.status(401).json({message:'Invalid Password'});
        }
        const token = jwt.sign(
            {username:user.username},
            'Your_secret_key',
            {expiresIn:'1h'}
        )
        
        return res.status(200).json({token});
    }catch(err){
        console.log(err);
        res.status(404).json({message:'no user found'});
    }
}

export const dashboardData = async(req,res)=>{
    const username = req.user.username;
    const data = await Users.findOne({username});
    if(!data){
        return res.status(401).json({message:'user not found'});
    }
    res.json({username:data.username});
}


    