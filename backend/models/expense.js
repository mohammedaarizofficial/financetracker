import mongoose from 'mongoose';

const expense = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Users'
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        amount:{
            type:Number,
            required:true,
            min:0,
        },
        date:{
            type:Date,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

const Expenses = mongoose.model("Expenses", expense);

export default Expenses;