import mongoose from 'mongoose';

const income = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users',
            required:true,
        },
        source:{
            type:String,
            required:true,
            trim:true,
        },
        amount:{
            type:Number,
            required:true,
            min:0,
        },
        date:{
            type:Date,
            required:true,
        },
    },
    {
        timestamps:true
    }
)

const Income = mongoose.model("Income", income);

export default Income;