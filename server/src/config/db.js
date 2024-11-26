const mongoose=require('mongoose');

const connectionDB=async()=>{
    const MONGOOSE_URL=process.env.MONGOOSE_URL;
    try {
        await mongoose.connect(MONGOOSE_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to Mongoose",error);
        process.exit(1);
    }
}

module.exports=connectionDB