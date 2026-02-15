import Expenses from "../models/expense.js";

export const getExpenses = async(req,res)=>{
    const id = req.user.userId;
    const data = await Expenses.find({userId:id});
    const formattedData = data.map((details)=>(
        {
            id:details._id,
            userId:details.userId,
            category:details.category,
            amount:details.amount,
            date:details.date
        }
    ))
    res.json(formattedData);
}

export const postExpenses = async(req,res)=>{
    const userId = req.user.userId;
    try{
        const data = new Expenses({
            userId:userId,
            category:req.body.category,
            amount:req.body.amount,
            date:req.body.date
        })
        const updatedData = await data.save();
        res.status(201).json({
            userId:updatedData.userId,
            category:updatedData.category,
            amount:updatedData.amount,
            date:updatedData.date
        })
    }catch(err){
        res.status(401).json({message:`${err}`})
    }
}

export const deleteExpense = async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Expenses.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                message: "Expense not found or unauthorized"
            });
        }
        res.status(201).json({message:'Expense Successfully deleted'});
    }catch(err){
        res.status(401).json({message:`${err}`});
    }
}

export const updateExpense = async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Expenses.findByIdAndUpdate(id,{
            category:req.body.category,
            amount:req.body.amount,
            date:req.body.date
        },{
            returnDocument:'after'
        });
        if(!data){
            return res.status(401).json({message:'Unbale to find the expense'});
        }

        res.status(201).json({
            id:data.id,
            category:data.category,
            amount:data.amount,
            date:data.date
        });
    }catch(err){
        res.status(401).json({message:`${err}`});
    }
}