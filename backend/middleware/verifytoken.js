import jwt from 'jsonwebtoken';

export const  verifytoken=(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"No token recieved"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, 'Your_secret_key');
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message:'Invalid Token'});
    }
}