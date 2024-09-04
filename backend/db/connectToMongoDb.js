import mongoose from "mongoose";


const connectToMongoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('mongodb connected')
    } catch (error) {
        console.log('something went wrong in connecting mongodb',error.message)
    }
}

export default connectToMongoDb;