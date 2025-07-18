const mongoose = require('mongoose')

const connectDB = async ()=>{

    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected Successfully")
    } catch (error) {
        console.error('Error Connecting', error.message)
        process.exit(1);
    }
}

module.exports = connectDB;