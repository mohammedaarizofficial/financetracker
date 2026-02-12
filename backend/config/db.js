import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectdb = async() => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected`);
    }catch(err){
        console.log(`Unable to connect to DB`);
    }
}

export default connectdb;



