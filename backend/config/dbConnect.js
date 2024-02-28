const mongoose = require("mongoose")

const dbConnect = () => {
    console.log(process.env.MONGO_URL)
    try {
        mongoose.connect("mongodb+srv://ibrahim:ibrahim@cluster0.zehppp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected successfully!")
        
    } catch (error) {
        console.log("MongoDB error!")
        throw new Error(error.message)
    }
}

module.exports = dbConnect