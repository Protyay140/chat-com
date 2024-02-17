const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('database is successfully connected ....'.blue.bold);
    } catch (e) {
        console.log(`failed to connect to database...`.red.bold);
    }
}

module.exports = connectDB;