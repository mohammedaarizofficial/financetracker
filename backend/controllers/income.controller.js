import Income from '../models/income.js';

export const getIncome = async(req,res)=>{
    try{
        const id = req.user.userId;
        const data = await Income.find({userId:id});
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

export const postIncome = async(req,res)=>{
    const userId = req.user.userId;
    try{
        const data = new Income({
            userId:userId,
            source:req.body.source,
            amount:req.body.amount,
            date:req.body.date,
        })
        const savedIncome = await data.save();
        res.status(201).json(
            {   
                userId:savedIncome.userId,
                source:savedIncome.source,
                amount:savedIncome.amount,
                date:savedIncome.date,
            }
        )
    }catch(err){
        res.status(401).json({message:'unable to post income'});
    }
}

export const deleteIncome = async(req,res)=>{
    const id = req.params._id
    try{
        const data = await Income.findByIdAndDelete(id);
        if(!data){
            res.status(401).json({message:"Unable to find income"});
        }
        res.json({message:"message deleted successfully"});
    }catch(err){
        console.log(err);
    }
}

export const updateIncome = async(req,res)=>{
    const id = req.params._id;
    try{
        const data = await Income.findByIdAndUpdate(id,
            {
                source:req.body.source,
                amount:req.body.amount,
                date:req.body.date
            },
            {returnDocument:'after'}
        );
        if(!data){
            return res.status(401).json({message:'Unable to update income'});
        }
        res.json({
            _id:data._id,
            source:data.source,
            amount:data.amount,
            date:data.date
        })
    }catch(err){
        res.status(401).json({message:`${err}`});
    }
}

